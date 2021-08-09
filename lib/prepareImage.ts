import hitPlaceholderBlurDataUrl from "./hitPlaceholder";

async function prepareBlurDataUrl(url: string | undefined, type: string) {
  try {
    if (!url) throw new Error();
    const resp = await fetch(url);
    // @ts-ignore
    const blob = await resp.buffer();
    const base64 = blob.toString("base64");
    const dataurl = `data:${type};base64,${base64}`;
    return dataurl;
  } catch (error) {
    return hitPlaceholderBlurDataUrl;
  }
}

export default async function prepareImage(image: Attachment) {
  return {
    height: image.height,
    width: image.width,
    url: image.url,
    blurDataUrl: await prepareBlurDataUrl(
      image.thumbnails?.small.url,
      image.type
    ),
    type: image.type,
  };
}
