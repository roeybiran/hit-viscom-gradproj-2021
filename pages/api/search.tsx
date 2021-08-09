import ProjectCard from "@/components/ProjectCard";
import fetchAirtableData from "@/lib/fetchAirtableData";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDOMServer from "react-dom/server";

let cache: FormattedRecord[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, json } = req.query;

  if (!q || req.method !== "GET") {
    res.redirect(404, "/404");
    return;
  }

  if (!cache) {
    cache = await fetchAirtableData();
  }

  const p = JSON.stringify(cache);

  // TODO
  const result = ReactDOMServer.renderToStaticMarkup(
    <html>
      <head></head>
      <body>{p}</body>
    </html>
  );

  res.status(200).send(result);
}
