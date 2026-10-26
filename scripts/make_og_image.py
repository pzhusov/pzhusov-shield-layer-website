"""Generate the Open Graph preview image (1200x630) for the Shield Layer Capital site."""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, "public", "Logo.jpg")
OUT = os.path.join(ROOT, "public", "og-image.jpg")

FONT_DIRS = [
    "/usr/share/fonts/truetype/liberation",
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/truetype/freefont",
]


def find_font(names, size):
    for d in FONT_DIRS:
        for n in names:
            p = os.path.join(d, n)
            if os.path.exists(p):
                return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def font_bold(size):
    return find_font(
        ["LiberationSans-Bold.ttf", "DejaVuSans-Bold.ttf", "FreeSansBold.ttf"], size
    )


def font_regular(size):
    return find_font(
        ["LiberationSans-Regular.ttf", "DejaVuSans.ttf", "FreeSans.ttf"], size
    )


# --- background: deep dark with subtle blue glow ---
bg = Image.new("RGB", (W, H), (5, 5, 7))
glow = Image.new("RGB", (W, H), (5, 5, 7))
gd = ImageDraw.Draw(glow)
gd.ellipse([-350, -420, 900, 620], fill=(18, 46, 92))
gd.ellipse([520, 120, 1600, 900], fill=(10, 60, 90))
glow = glow.filter(ImageFilter.GaussianBlur(220))
bg = Image.blend(bg, glow, 0.75)

# subtle grid
grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdr = ImageDraw.Draw(grid)
for x in range(0, W, 60):
    gdr.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
for y in range(0, H, 60):
    gdr.line([(0, y), (W, y)], fill=(255, 255, 255, 8))
bg = Image.alpha_composite(bg.convert("RGBA"), grid).convert("RGB")

draw = ImageDraw.Draw(bg)

CYAN = (34, 211, 238)
BLUE = (59, 130, 246)
WHITE = (248, 250, 252)
GREY = (148, 163, 184)

# --- logo panel ---
logo = Image.open(LOGO).convert("RGB")
target_w = 560
ratio = target_w / logo.width
logo = logo.resize((target_w, int(logo.height * ratio)), Image.LANCZOS)
lx = (W - logo.width) // 2
ly = 74

panel = Image.new("RGBA", (logo.width + 56, logo.height + 56), (18, 20, 26, 255))
mask = Image.new("L", panel.size, 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, panel.width - 1, panel.height - 1], 24, fill=255)
panel = Image.composite(panel, Image.new("RGBA", panel.size, (0, 0, 0, 0)), mask)

bg.paste(panel, (lx - 28, ly - 28), panel)
bg.paste(logo, (lx, ly))

# --- text block ---
y = ly + logo.height + 58
title_font = font_bold(58)
sub_font = font_regular(26)
domain_font = font_regular(24)

title = "Investment & Technology Enterprise"
tw = draw.textlength(title, font=title_font)
draw.text(((W - tw) / 2, y), title, font=title_font, fill=WHITE)

y += 74
sub = "Dubai-based investment consulting & enterprise management"
sw = draw.textlength(sub, font=sub_font)
draw.text(((W - sw) / 2, y), sub, font=sub_font, fill=GREY)

# accent line
y += 56
lw = 220
draw.rectangle([(W - lw) / 2, y, (W + lw) / 2, y + 4], fill=CYAN)
draw.rectangle([(W - lw) / 2 - 60, y + 1, (W - lw) / 2, y + 3], fill=BLUE)
draw.rectangle([(W + lw) / 2, y + 1, (W + lw) / 2 + 60, y + 3], fill=BLUE)

y += 30
dom = "www.shieldlayer.net"
dw = draw.textlength(dom, font=domain_font)
draw.text(((W - dw) / 2, y), dom, font=domain_font, fill=CYAN)

bg.save(OUT, "JPEG", quality=92, optimize=True)
print("saved", OUT, bg.size, os.path.getsize(OUT), "bytes")
