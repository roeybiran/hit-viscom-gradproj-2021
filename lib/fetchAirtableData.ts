import slugify from "./slugify";

/*
שם פרטי עברית
שם משפחה עברית
שם פרטי אנגלית
שם משפחה אנגלית
עמוד פורטפוליו
עמוד אינסטגרם
מייל
טלפון
שם פרויקט עברית
שם פרויקט אנגלית
מדיה ופורמט
תקציר פרויקט עברית
תקציר פרויקט אנגלית
לינק לעמוד הפרויקט
תמונה מייצגת
תמונות נוספות
סרטונים
קומה
חדר
*/

interface RawRecord {
  id: string;
  fields: {
    "שם פרטי עברית"?: string;
    "שם משפחה עברית"?: string;
    "שם פרטי אנגלית"?: string;
    "שם משפחה אנגלית"?: string;
    "עמוד פורטפוליו"?: string;
    "עמוד אינסטגרם"?: string;
    מייל?: string;
    טלפון?: string;
    "שם פרויקט עברית"?: string;
    "שם פרויקט אנגלית"?: string;
    "מדיה ופורמט"?: string;
    "תקציר פרויקט עברית"?: string;
    "תקציר פרויקט אנגלית"?: string;
    "לינק לעמוד הפרויקט"?: string;
    "תמונה מייצגת"?: Attachment[];
    "תמונות נוספות"?: Attachment[];
    סרטונים?: string;
    קומה?: string;
    חדר?: string;
  };
}

export default async function fetchAirtableData(): Promise<FormattedRecord[]> {
  const baseName = process.env.AIRTABLE_BASE;
  const tableName = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME!);
  const endpoint = `https://api.airtable.com/v0/${baseName}/${tableName}?maxRecords=100&view=Grid%20view`;
  let rawDataJson: RawRecord[] = [];
  try {
    const rawData = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });
    rawDataJson = (await rawData.json()).records as RawRecord[];
  } catch (error) {
    console.error(error);
  }

  return rawDataJson
    .filter((rec) => {
      return (
        rec.fields["שם פרטי עברית"] &&
        rec.fields["שם משפחה עברית"] &&
        rec.fields["שם פרויקט עברית"] &&
        rec.fields["תקציר פרויקט עברית"] &&
        rec.fields["מייל"]
      );
    })
    .map((rec) => ({
      id: rec.id,
      slug: slugify(
        rec.fields["שם פרטי עברית"]!,
        rec.fields["שם משפחה עברית"]!,
        rec.fields["שם פרויקט עברית"]!
      ),
      firstNameHe: rec.fields["שם פרטי עברית"]!,
      lastNameHe: rec.fields["שם משפחה עברית"]!,
      projectNameHe: rec.fields["שם פרויקט עברית"]!,
      projectSummaryHe: rec.fields["תקציר פרויקט עברית"]!,
      mail: rec.fields.מייל!,
      phone: rec.fields.טלפון,
      firstNameEn: rec.fields["שם פרטי אנגלית"],
      lastNameEn: rec.fields["שם משפחה אנגלית"],
      portfolioUrl: rec.fields["עמוד פורטפוליו"],
      instagramUrl: rec.fields["עמוד אינסטגרם"],
      projectNameEn: rec.fields["שם פרויקט אנגלית"],
      projectSummaryEn: rec.fields["תקציר פרויקט אנגלית"],
      genre: rec.fields["מדיה ופורמט"],
      projectUrl: rec.fields["לינק לעמוד הפרויקט"],
      featuredImage: rec.fields["תמונה מייצגת"] ?? [],
      otherImages: rec.fields["תמונות נוספות"] ?? [],
      videos: rec.fields.סרטונים,
      floor: rec.fields.קומה,
      room: rec.fields.חדר,
      imagesAltText: `${rec.fields["שם פרטי עברית"]} ${rec.fields["שם משפחה עברית"]} — ${rec.fields["שם פרויקט עברית"]}`,
    }));
}
