import hitPlaceholderBlurDataUrl from "./hitPlaceholder";
import prepareImage from "./prepareImage";

export default async function makeFeaturedImage(
  list: Attachment[]
): Promise<ImageAttachment> {
  const _list = list
    .filter((attachment) => attachment.type.match(/image\/(jpe?g|png)/))
    .slice(0, 1);
  if (_list.length > 0) {
    return await prepareImage(_list[0]);
  } else {
    return {
      blurDataUrl: hitPlaceholderBlurDataUrl,
      width: 1017,
      height: 1017,
      type: "image/jpg",
      url: "/hit.jpg",
    };
  }
}
