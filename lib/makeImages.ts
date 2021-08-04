import hitPlaceholder from "./hitPlaceholder";

export default async function makeImages(
  list: Attachment[]
): Promise<ImageAttachment[]> {
  const _list = list
    .filter((attachment) => attachment.type.match(/image\/(jpe?g|png)/))
    .map((attachment) => {
      return {
        height: attachment.height,
        width: attachment.width,
        url: attachment.url,
        blurDataUrl: attachment.thumbnails?.small.url,
        type: attachment.type,
      };
    });

  // prepare blurred placeholders bae64 dataurls
  const promises = _list.map(async (attachment) => {
    try {
      if (!attachment.blurDataUrl) return;
      const resp = await fetch(attachment.blurDataUrl);
      // @ts-ignore
      const blob = await resp.buffer();
      const base64 = blob.toString("base64");
      const url = `data:${attachment.type};base64,${base64}`;
      return url;
    } catch (error) {
      return;
    }
  });

  const resolved = await Promise.all(promises);

  return _list.map((attachment, index) => {
    const blob = resolved[index];
    const item = {
      ...attachment,
      blurDataUrl: blob ?? hitPlaceholder,
    };

    return item;
  });
}
