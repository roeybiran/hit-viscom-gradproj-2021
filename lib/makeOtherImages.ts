import prepareImage from "./prepareImage";

export default async function makeOtherImages(
  list: Attachment[]
): Promise<ImageAttachment[]> {
  return await Promise.all(
    list
      .filter((attachment) => attachment.type.match(/image\/(jpe?g|png)/))
      .map(prepareImage)
  );
}
