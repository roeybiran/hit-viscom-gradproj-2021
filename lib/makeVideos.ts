export default async function makeVideos(list: string): Promise<string[]> {
  const videoPromises = list.split("\n").map((link) => {
    if (!link) return;
    let url: string;
    try {
      url = new URL(link).href;
    } catch (error) {
      console.error(`${error.code}:`, link);
      return;
    }

    if (url.includes("youtu")) {
      const id = url
        .replace(/^.+\.\w+\/(watch\?v=)?/, "")
        .replace(/(&|\/).+/, "");
      const embed = {
        html: `
        <div style="position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;">
          <iframe style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;" type="text/html" frameborder="0" src="https://www.youtube.com/embed/${id}"></iframe>
        </div>`,
      };
      return id ? embed : null;
    } else if (url.includes("vimeo")) {
      return fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
          url
        )}&responsive=true`
      )
        .then((value) => value.json())
        .catch((err) => {
          console.error("JSON error from Vimeo url:", url);
        });
    }
  });

  const promises = await Promise.all(videoPromises);
  const resolved = promises.filter((x) => x).map((x) => x["html"]);
  return resolved;
}
