interface FormattedRecord {
	id: string;
	//
	firstNameHe: string;
	lastNameHe: string;
	firstNameEn?: string;
	lastNameEn?: string;
	portfolioUrl?: string;
	instagramUrl?: string;
	mail: string;
	phone?: string;
	projectNameHe: string;
	projectNameEn?: string;
	genre?: string;
	projectSummaryHe: string;
	projectSummaryEn?: string;
	projectUrl?: string;
	featuredImage: Attachment[];
	otherImages: Attachment[];
	videos?: string;
	floor?: string;
	room?: string;
	//
	slug: string;
	imagesAltText: string;
}

// type Attachment = {
// 	id: string;
// 	url: string;
// 	filename: string;
// 	size: number;
// 	type: string;
// 	width: number;
// 	height: number;
// 	thumbnails?: {
// 		small: {
// 			url: string;
// 			width: number;
// 			height: number;
// 		};
// 		large: {
// 			url: string;
// 			width: number;
// 			height: number;
// 		};
// 		full?: {
// 			url: string;
// 			width: number;
// 			height: number;
// 		};
// 	};
// };

type ProjectPreview = {
	name: string;
	imageAlt: string;
	featuredImage: ImageAttachment;
	id: string;
	slug: string;
	student: StudentPreview;
	room: string | null;
	floor: string | null;
};

type StudentPreview = {
	firstName: string;
	lastName: string;
};

interface ProjectDetails {
	name: string;
	imageAlt: string;
	id: string;
	slug: string;
	room: string | null;
	floor: string | null;
	summary: string;
	otherImages: ImageAttachment[];
	videos: string[];
	student: Student;
	projectUrl: string | null;
	category: string | null;
	featuredImageSrc: string;
}

type Student = StudentPreview & StudentDetails;

interface StudentDetails {
	mail: string;
	portfolio: string | null;
	instagram: string | null;
	phone: string | null;
}
