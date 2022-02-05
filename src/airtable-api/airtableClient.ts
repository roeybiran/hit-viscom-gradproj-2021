import Airtable, { Attachment } from 'airtable';

const airtableBaseName = 'app76v8CXX0JPHUKP';
const tableName = 'פרויקטים';

export type AirtableImageAttachment = Attachment & {
	width: number;
	height: number;
};

const airtableClient = new Airtable({
	apiKey: process.env.AIRTABLE_API_KEY,
}).base(airtableBaseName)(tableName);

export default airtableClient;
