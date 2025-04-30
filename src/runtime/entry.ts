import { translateZone, revertTranslation } from "./translateDOM";
import { useMutationTranslate } from "./useMutationTranslate";

interface TranslateOptions {
  selector: string;
  lang: string;
  autoStart: boolean;
}

let observer: MutationObserver | null = null;
let targetEl: HTMLElement | null = null;

async function start(selector: string, lang: string) {
  targetEl = document.querySelector(selector);
  if (!targetEl) return;

  await translateZone(targetEl, lang);
  observer = useMutationTranslate(targetEl, lang);
}

function stop() {
  if (targetEl) {
    revertTranslation(targetEl);
  }
  observer?.disconnect();
}

export const __immersiveTranslate = {
  init(opts: TranslateOptions) {
    if (opts.autoStart) {
      start(opts.selector, opts.lang);
    }
    window.__immersiveTranslate = {
      start: () => start(opts.selector, opts.lang),
      stop,
    };
  },
};

declare global {
  interface Window {
    __immersiveTranslate?: {
      start: () => void;
      stop: () => void;
      init?: (opts: TranslateOptions) => void;
    };
  }
}
