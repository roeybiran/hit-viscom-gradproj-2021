interface RawRecord {
  id: string;
  fields: {
    "שם פרטי עברית"?: string;
    "שם משפחה עברית"?: string;
    "שם פרויקט עברית"?: string;
    "תקציר פרויקט עברית"?: string;
    מייל?: string;
    טלפון?: string;
    "שם פרטי אנגלית"?: string;
    "שם משפחה אנגלית"?: string;
    "עמוד פורטפוליו"?: string;
    "עמוד אינסטגרם"?: string;
    "שם פרויקט אנגלית"?: string;
    "מדיה ופורמט"?: string;
    "תקציר פרויקט אנגלית"?: string;
    "לינק לעמוד הפרויקט"?: string;
    "תמונה מייצגת"?: Attachment[];
    "תמונות נוספות"?: Attachment[];
    סרטונים?: string;
    חדר?: string;
    קומה?: string;
  };
}

interface Attachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width: number;
  height: number;
  thumbnails?: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface Project {
  id: string;
  name: string;
  summary: string;
  imageAlt: string;
  featuredImage: ImageAttachment;
  otherImages: ImageAttachment[];
  videos: string[];
  student: Student;
  projectUrl: string | null;
  category: string | null;
  room: string | null;
  floor: string | null;
}

interface Student {
  firstName: string;
  lastName: string;
  fullName: string;
  mail: string;
  portfolio: string | null;
  instagram: string | null;
  phone: string;
}

interface ImageAttachment {
  url: string;
  width: number;
  height: number;
  blurDataUrl: string;
  type: string;
}
