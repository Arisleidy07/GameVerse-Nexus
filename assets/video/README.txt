Place your background video file here and name it exactly:

  hero.mp4

Recommended:
- Resolution: 1920x1080 (1080p) or 1280x720 (720p) to keep size reasonable
- Codec: H.264 (MP4)
- Length: 10–30 seconds looping
- Keep the bitrate moderate (<10–20 Mbps) for quick start

The page already references this path in index.html:

  <video id="bg-video" class="bg-video" playsinline muted loop autoplay preload="auto">
    <source src="assets/video/hero.mp4" type="video/mp4" />
  </video>

Optional: add a poster image next to this README and update index.html to include poster="assets/video/poster.jpg" for a nicer first frame before the video starts.
