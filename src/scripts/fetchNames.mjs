import FIELDS from '../airtable-api/fields';
import airtableClient from '../airtable-api/airtableClient';
import fs from 'fs';

const records = await airtableClient
	.select({
		fields: [FIELDS.fullNameHe, FIELDS.slug],
	})
	.firstPage()
	.map(({ fields }) => {
		return {
			name: fields[FIELDS.fullNameHe],
			slug: fields[FIELDS.slug],
		};
	});

fs.writeFileSync(process.cwd() + '/names.json', JSON.stringify(records), {
	encoding: 'utf-8',
});
