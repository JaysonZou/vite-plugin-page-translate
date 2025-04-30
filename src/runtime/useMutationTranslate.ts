import { translateText } from "./translateService";

export function useMutationTranslate(el: HTMLElement, lang: string) {
  const observer = new MutationObserver(async (mutations) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
          const n = node as Text;
          const translated = await translateText(n.textContent || "", lang);
          n.textContent = translated;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const n = walker.currentNode as Text;
            const translated = await translateText(n.textContent || "", lang);
            n.textContent = translated;
          }
        }
      }
    }
  });

  observer.observe(el, { childList: true, subtree: true });
  return observer;
}
