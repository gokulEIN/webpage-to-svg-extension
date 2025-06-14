document.getElementById("convertBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject html-to-image library if not already present
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["html-to-image.min.js"]
  });

  // Inject converter logic
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      (async () => {
        const inlineImages = async (root) => {
          const images = root.querySelectorAll("img");
          await Promise.all([...images].map(async img => {
            try {
              const response = await fetch(img.src, { mode: "cors" });
              const blob = await response.blob();
              const reader = new FileReader();
              const dataUrl = await new Promise(resolve => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              });
              img.src = dataUrl;
            } catch (e) {
              console.warn("Image inline failed for", img.src, e);
            }
          }));
        };

        try {
          const target = document.querySelector("main") || document.body;

          // Inline all images
          await inlineImages(target);

          // Try SVG
          let dataUrl;
          try {
            dataUrl = await window.htmlToImage.toSvg(target);
          } catch (svgError) {
            console.warn("SVG generation failed:", svgError);
            // Fallback to PNG
            dataUrl = await window.htmlToImage.toPng(target);
          }

          // Create and click download link
          const link = document.createElement("a");
          const ext = dataUrl.startsWith("data:image/svg+xml") ? "svg" : "png";
          link.download = "webpage-export." + ext;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (err) {
          console.error("Final error:", err);
          alert("Conversion failed: " + (err.message || "Unknown error"));
        }
      })();
    }
  });
});
