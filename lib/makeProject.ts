import hitPlaceholder from "./hitPlaceholder";
import makeImages from "./makeImages";
import makeVideos from "./makeVideos";

export default async function makeProject(
  record: RawRecord
): Promise<Project | undefined> {
  // student info
  const firstNameHe = record.fields["שם פרטי עברית"];
  const lastNameHe = record.fields["שם משפחה עברית"];
  const mail = record.fields.מייל;
  const phone = record.fields.טלפון;
  const portfolioUrl = record.fields["עמוד פורטפוליו"];
  const instagramUrl = record.fields["עמוד אינסטגרם"];
  const firstNameEn = record.fields["שם פרטי אנגלית"];
  const lastNameEn = record.fields["שם משפחה אנגלית"];

  // project info
  const projNameHe = record.fields["שם פרויקט עברית"];
  const projSummaryHe = record.fields["תקציר פרויקט עברית"];
  const projectUrl = record.fields["לינק לעמוד הפרויקט"] ?? null;
  const category = record.fields["מדיה ופורמט"] ?? null;
  const floor = record.fields.קומה ?? null;
  const room = record.fields.חדר ?? null;

  let featuredImages = await makeImages(record.fields["תמונה מייצגת"] ?? []);
  if (featuredImages.length === 0) {
    featuredImages.push({
      blurDataUrl: hitPlaceholder,
      width: 1017,
      height: 1017,
      type: "image/jpg",
      url: "/hit.jpg",
    });
  }

  const otherImages = await makeImages(record.fields["תמונות נוספות"] ?? []);
  const videos = await makeVideos(record.fields.סרטונים ?? "");

  const projNameEn = record.fields["שם פרויקט אנגלית"];
  const projSummaryEn = record.fields["תקציר פרויקט אנגלית"];

  if (
    !projNameHe ||
    !projSummaryHe ||
    !firstNameHe ||
    !lastNameHe ||
    !mail ||
    !phone
  ) {
    return;
  }

  const fullNameHe = firstNameHe + " " + lastNameHe;
  const id = `${fullNameHe}_-_${projNameHe}`.replace(/\s/g, "_");
  const imageAlt = `${fullNameHe} – ${projNameHe}`;

  const student: Student = {
    firstName: firstNameHe,
    lastName: lastNameHe,
    fullName: fullNameHe,
    phone,
    mail: `mailto:${mail}`,
    portfolio: portfolioUrl ?? null,
    instagram: instagramUrl ?? null,
  };

  return {
    id,
    name: projNameHe,
    summary: projSummaryHe,
    featuredImage: featuredImages[0],
    imageAlt,
    otherImages,
    videos,
    projectUrl,
    student,
    category,
    room,
    floor,
  };
}
