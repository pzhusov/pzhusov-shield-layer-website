"""Deploy the project to Vercel via REST API (source upload -> Vercel builds it)."""
import base64
import hashlib
import json
import os
import time
import urllib.request
import urllib.error

TOKEN = os.environ["VERCEL_TOKEN"]
PROJECT_ID = "prj_nABThFZ10oeREfwUiJrRqRSakOiY"
PROJECT_NAME = "pzhusov-shield-layer-website"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SKIP_DIRS = {".git", "node_modules", "dist", "dist-preview", ".vercel", "scripts"}
SKIP_FILES = {".npmrc"}


def api(method, path, payload=None):
    url = "https://api.vercel.com" + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + TOKEN)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = r.read().decode()
            return r.status, (json.loads(body) if body else {})
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read().decode()[:800])
        raise


def collect():
    files = []
    for base, dirs, names in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for n in names:
            rel = os.path.relpath(os.path.join(base, n), ROOT)
            if n in SKIP_FILES:
                continue
            files.append(rel.replace(os.sep, "/"))
    return sorted(files)


def main():
    files = collect()
    print("files:", len(files))
    entries = []
    for rel in files:
        raw = open(os.path.join(ROOT, rel), "rb").read()
        b64 = base64.b64encode(raw).decode()
        digest = hashlib.sha256(raw).hexdigest()
        status, res = api(
            "POST",
            "/v2/files",
            {"file": rel, "sha": digest, "size": len(raw), "data": b64, "encoding": "base64"},
        )
        if status not in (200, 201):
            raise SystemExit("upload failed for " + rel)
        entries.append({"file": rel, "sha": res["sha"], "size": len(raw)})
        print("  uploaded", rel, len(raw))

    payload = {
        "name": PROJECT_NAME,
        "project": PROJECT_ID,
        "target": "production",
        "files": entries,
        "projectSettings": {"framework": "vite"},
    }
    status, dep = api("POST", "/v13/deployments", payload)
    print("deployment:", dep.get("id"), dep.get("url"), dep.get("readyState"))
    dep_id = dep.get("id")

    for _ in range(120):
        time.sleep(5)
        st, d = api("GET", f"/v13/deployments/{dep_id}")
        state = d.get("readyState")
        print("state:", state)
        if state in ("READY", "ERROR", "CANCELED"):
            if state == "ERROR":
                for ev in d.get("events", [])[-10:]:
                    print("  event:", ev.get("type"), str(ev.get("payload", {}).get("text"))[:300])
            print(json.dumps({"url": d.get("url"), "state": state,
                              "aliases": d.get("alias")}, ensure_ascii=False))
            return 0 if state == "READY" else 1
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
