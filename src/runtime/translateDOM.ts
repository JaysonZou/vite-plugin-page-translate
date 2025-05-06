import { translateText } from "./translateService";

const originalMap = new WeakMap<Text, string>();

function isTextNode(node: Node): node is Text {
  return Boolean(node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
}

export async function translateZone(el: HTMLElement, lang: string) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const promises: Promise<void>[] = [];

  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    const original = textNode.textContent!;
    if (!originalMap.has(textNode)) originalMap.set(textNode, original);

    promises.push(
      translateText(original, lang).then((translated) => {
        textNode.textContent = translated;
      })
    );
  }

  await Promise.all(promises);
}

export function revertTranslation(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (originalMap.has(node)) {
      node.textContent = originalMap.get(node)!;
    }
  }
}
