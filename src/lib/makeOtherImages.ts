import { AirtableImageAttachment } from 'src/airtable-api/airtableClient';
import prepareImage from './prepareImage';

export default async function makeOtherImages(list: AirtableImageAttachment[]) {
	return await Promise.all(
		list
			.filter((attachment) => attachment.type.match(/image\/(jpe?g|png)/))
			.map(prepareImage)
	);
}
