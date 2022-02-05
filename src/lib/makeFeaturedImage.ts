import { AirtableImageAttachment } from 'src/airtable-api/airtableClient';
import placeholderBlurDataUrl from './placeholderBlurDataUrl';
import prepareImage from './prepareImage';

export default async function makeFeaturedImage(
	list: AirtableImageAttachment[]
) {
	const _list = list
		.filter((attachment) => attachment.type.match(/image\/(jpe?g|png)/))
		.slice(0, 1);
	if (_list.length) {
		return await prepareImage(_list[0]);
	}
	return {
		blurDataUrl: placeholderBlurDataUrl,
		width: 1,
		height: 1,
		type: 'image/jpeg',
		url: '/placeholder.jpg',
	};
}
