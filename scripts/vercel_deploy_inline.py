import base64
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


def api(method, path, payload=None):
    url = "https://api.vercel.com" + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + TOKEN)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            body = r.read().decode()
            return r.status, (json.loads(body) if body else {})
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read().decode()[:600])
        raise


def collect():
    files = []
    for base, dirs, names in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for n in names:
            rel = os.path.relpath(os.path.join(base, n), ROOT)
            if n in (".npmrc",):
                continue
            files.append(rel.replace(os.sep, "/"))
    return sorted(files)


def main():
    files = collect()
    print("files:", len(files))
    entries = []
    for rel in files:
        raw = open(os.path.join(ROOT, rel), "rb").read()
        entries.append(
            {
                "file": rel,
                "data": base64.b64encode(raw).decode(),
                "encoding": "base64",
            }
        )
        print("  packed", rel, len(raw))

    payload = {
        "name": PROJECT_NAME,
        "project": PROJECT_ID,
        "target": "production",
        "files": entries,
        "projectSettings": {"framework": "vite"},
    }
    status, dep = api("POST", "/v13/deployments", payload)
    dep_id = dep.get("id")
    print("deployment:", dep_id, dep.get("url"), dep.get("readyState"))

    for _ in range(150):
        time.sleep(5)
        st, d = api("GET", "/v13/deployments/" + dep_id)
        state = d.get("readyState")
        print("state:", state)
        if state in ("READY", "ERROR", "CANCELED"):
            if state == "ERROR":
                for ev in d.get("events", [])[-12:]:
                    print("  event:", ev.get("type"), str(ev.get("payload", {}).get("text"))[:400])
            print(json.dumps({"url": d.get("url"), "state": state, "alias": d.get("alias")}, ensure_ascii=False))
            return 0 if state == "READY" else 1
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
