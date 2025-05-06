import { Plugin } from "vite";

interface ImmersiveOptions {
  selector?: string;
  lang?: string;
  autoStart?: boolean;
}

export default function pageTranslate(options: ImmersiveOptions = {}): Plugin {
  const selector = options.selector || ".translate-zone";
  const lang = options.lang || "zh-CN";
  const autoStart = options.autoStart ?? true;

  return {
    name: "vite-plugin-page-translate",

    enforce: "post",

    transformIndexHtml(html) {
      const injectScript = `
        <script type="module">
          import "./runtime.js";
          window.__pageTranslate?.init({
            selector: "${selector}",
            lang: "${lang}",
            autoStart: ${autoStart}
          });
        </script>
      `;
      return html.replace("</body>", `${injectScript}</body>`);
    },
  };
}
