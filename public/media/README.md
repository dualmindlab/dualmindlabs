# Project media

Screenshots are connected in `src/components/Work.tsx`. The portrait is used in
`src/components/About.tsx`. The dedicated sharing image is configured in
`src/app/layout.tsx`.

| Asset | Used for |
|---|---|
| `ashwin.jpg` | About portrait |
| `og-image.jpg` | Open Graph and Twitter sharing preview (1200×630) |
| `smart-shaadi.jpg` | Smart Shaadi (featured) |
| `spaceautotech.jpg` | WebSCADA / SpaceAutoTech (featured) |
| `pmstore.jpg` | PMStore (featured) |
| `taptifs.jpg` | TaptiFS |
| `colonels-pickle.jpg` | Colonel's Pickle |
| `pulselogic.jpg` | Pulse Logic |
| `marksmanspro.jpg` | Marksman |
| `gulaabi-clean.jpg` | Gulaabi Clean |
| `deployment-corner.jpg` | Deployment Corner |

## Dedicated sharing image

`og-image.jpg` is the 1200×630 landscape card used for both Open Graph and
Twitter link previews. If replacing it, retain the filename and dimensions.
The About section continues to use `ashwin.jpg`.

## Screenshots

The display frames are 16:10 and normally crop images to fill. Smart Shaadi
uses the complete original landing capture with `contain` and a link to open
the full-resolution screenshot, preserving the text at the image edges.
For future replacements, use JPEG quality 80–85 and preserve meaningful content. Images are served without automatic
optimization because this site uses Next.js static export.
