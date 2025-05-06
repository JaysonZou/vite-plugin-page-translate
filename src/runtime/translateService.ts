export async function translateText(
  text: string,
  lang: string
): Promise<string> {
  if (!text.trim()) return text;

  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: lang,
      format: "text",
    }),
  });

  if (!res.ok) return text;

  const json = await res.json();
  return json.translatedText;
}
