import makeProject from "./makeProject";

export default async function fetchData(): Promise<Project[]> {
  try {
    const baseName = process.env.AIRTABLE_BASE;
    const tableName = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME!);
    const endpoint = `https://api.airtable.com/v0/${baseName}/${tableName}?maxRecords=100&view=Grid%20view`;
    const rawData = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });
    const rawDataJson = await rawData.json();
    const rawRecords: RawRecord[] = rawDataJson.records ?? [];
    const projects = await Promise.all(rawRecords.map(makeProject));

    // @ts-ignore
    return projects.filter((x) => x);
  } catch (error) {
    console.error(error);
    return [];
  }
}
