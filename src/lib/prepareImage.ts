import { AirtableImageAttachment } from 'src/airtable-api/airtableClient';
import hitPlaceholderBlurDataUrl from './placeholderBlurDataUrl';

async function prepareBlurDataUrl(url: string, type: string) {
	try {
		if (!url) throw new Error();
		const resp = await fetch(url);
		// @ts-ignore
		const blob = await resp.buffer();
		const base64 = blob.toString('base64');
		const dataurl = `data:${type};base64,${base64}`;
		return dataurl;
	} catch (error) {
		return;
	}
}

export default async function prepareImage(image: AirtableImageAttachment) {
	let blurDataUrl = '';
	if (image.thumbnails?.small.url) {
		blurDataUrl =
			(await prepareBlurDataUrl(image.thumbnails.small.url, image.type)) ??
			hitPlaceholderBlurDataUrl;
	}
	return {
		height: image.height,
		width: image.width,
		url: image.url,
		blurDataUrl,
		type: image.type,
	};
}
