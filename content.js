(async () => {
  const target = document.querySelector("main") || document.body;
  let filename = document.title || location.hostname;
  filename = filename.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 60);

  try {
    const svgUrl = await window.htmlToImage.toSvg(target);
    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = `${filename || "webpage"}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("SVG export failed:", err);
    try {
      const pngUrl = await window.htmlToImage.toPng(target);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${filename || "webpage"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error("PNG fallback also failed", e);
    }
  }
})();
