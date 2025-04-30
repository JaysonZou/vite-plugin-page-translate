import { Plugin } from "vite";
import fs from "fs";
import path from "path";

interface ImmersiveOptions {
  selector?: string;
  lang?: string;
  autoStart?: boolean;
}

export default function immersiveTranslate(
  options: ImmersiveOptions = {}
): Plugin {
  const selector = options.selector || ".translate-zone";
  const lang = options.lang || "zh-CN";
  const autoStart = options.autoStart ?? true;

  return {
    name: "vite-plugin-immersive-translate",

    enforce: "post",

    transformIndexHtml(html) {
      const injectScript = `
        <script type="module">
          import "/@immersive-translate-runtime";
          window.__immersiveTranslate?.init({
            selector: "${selector}",
            lang: "${lang}",
            autoStart: ${autoStart}
          });
        </script>
      `;
      return html.replace("</body>", `${injectScript}</body>`);
    },

    resolveId(id) {
      if (id === "/@immersive-translate-runtime") {
        return id;
      }
    },

    load(id) {
      if (id === "/@immersive-translate-runtime") {
        const entryPath = path.resolve(__dirname, "runtime/entry.ts");
        return fs.readFileSync(entryPath, "utf-8");
      }
    },
  };
}
