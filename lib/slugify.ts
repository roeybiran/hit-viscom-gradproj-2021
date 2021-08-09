export default function slugify(
  firstName: string,
  lastName: string,
  projName: string
) {
  return `${firstName}_${lastName}_-_${projName}`.replace(/\s/g, "_");
}
