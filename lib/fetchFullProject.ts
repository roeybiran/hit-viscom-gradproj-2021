import fetchAirtableData from "./fetchAirtableData";
import makeFeaturedImage from "./makeFeaturedImage";
import makeOtherImages from "./makeOtherImages";
import makeVideos from "./makeVideos";

export default async function fetchSingleProject(slug: string) {
  const projectRecord = (await fetchAirtableData()).find((rec) => {
    return rec.slug === slug;
  });

  if (!projectRecord) return;
  return await makeFullProject(projectRecord);
}

async function makeFullProject(
  record: FormattedRecord
): Promise<ProjectDetails> {
  const name = record.projectNameHe;
  const summary = record.projectSummaryHe;
  const firstName = record.firstNameHe;
  const lastName = record.lastNameHe;

  const mail = `mailto:${record.mail}`;
  const phone = record.phone ?? null;
  const portfolio = record.portfolioUrl ?? null;
  const instagram = record.instagramUrl ?? null;

  const id = record.id;
  const slug = record.slug;
  const featuredImageSrc = (await makeFeaturedImage(record.featuredImage)).url;
  const imageAlt = record.imagesAltText;
  const room = record.room ?? null;
  const floor = record.floor ?? null;
  const otherImages = await makeOtherImages(record.otherImages);

  let videos: string[] = [];
  if (record.videos) {
    videos = await makeVideos(record.videos);
  }

  const projectUrl = record.projectUrl ?? null;
  const category = record.genre ?? null;

  const student: Student = {
    firstName,
    lastName,
    mail,
    phone,
    portfolio,
    instagram,
  };

  return {
    name,
    imageAlt,
    id,
    slug,
    room,
    floor,
    summary,
    otherImages,
    videos,
    projectUrl,
    student,
    category,
    featuredImageSrc,
  };
}
