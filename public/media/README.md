# Project Media

Drop your project images and videos here. Files are referenced by the `id` field in `src/components/Work.tsx`.

## Expected Files

| Project | Video (preferred) | Image fallback |
|---|---|---|
| PulseLogic | `pulselogic.mp4` | `pulselogic.jpg` |
| Smart Shaadi | `smart-shaadi.mp4` | `smart-shaadi.jpg` |
| MarksmansPro | `marksmanspro.mp4` | `marksmanspro.jpg` |
| SpaceAutoTech | `spaceautotech.mp4` | `spaceautotech.jpg` |
| TAPTIFS | `taptifs.mp4` | `taptifs.jpg` |

## Recommendations

**Videos (`.mp4`):**
- Resolution: 1280×800 or 1600×1000 (16:10 aspect ratio)
- Duration: 8–15 seconds, loopable
- Encoding: H.264, 2–4 Mbps bitrate
- Size target: ≤ 3 MB per clip
- **Must be muted** — they autoplay
- No sound, no intro frames, no captions

**Images (`.jpg` or `.png`):**
- Resolution: 1600×1000 at minimum
- JPEG quality 80–85 for small files
- Also serves as video poster (same filename, `.jpg` extension)

## Posters

For every video, include a matching `.jpg` of the first frame with the same basename — it shows while the video loads.

## No Files?

If a project has no media, the `ProjectMedia` component renders a branded gradient placeholder with the project category label. Nothing breaks.
