(async () => {
    const target = document.querySelector("main") || document.body;
    try {
      const svgUrl = await window.htmlToImage.toSvg(target);
      const link = document.createElement("a");
      link.href = svgUrl;
      link.download = "exported-page.svg";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("SVG export failed:", err);
      try {
        const pngUrl = await window.htmlToImage.toPng(target);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "exported-page.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (e) {
        console.error("PNG fallback also failed", e);
      }
    }
  })();
  