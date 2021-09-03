import strings from "@/lib/strings";

interface Props {
  mail: string;
  projectUrl: string | null;
  portfolio: string | null;
  instagram: string | null;
}

export default function Social({
  projectUrl,
  mail,
  portfolio,
  instagram,
}: Props) {
  const social = [
    { address: projectUrl, label: strings.projectUrl },
    { address: mail, label: strings.mail },
    { address: portfolio, label: strings.portfolio },
    { address: instagram, label: strings.instagram },
  ]
    .filter((x) => x.address)
    .map((x) => {
      const prettyUrl = x
        .address!.toLowerCase()
        .replace(/^http(s?):\/\//, "")
        .replace(/^www\./, "")
        .replace(/^mailto:/, "")
        .split("/")
        .filter((x) => x)
        .slice(0, 2)
        .join("/");
      return (
        <li key={x.label}>
          {x.label}:{" "}
          <a
            style={{ textDecoration: "underline" }}
            href={
              x.address!.startsWith("http")
                ? x.address!
                : `http://${x.address!}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {prettyUrl}
          </a>
        </li>
      );
    });
  return social.length > 0 ? <ul>{social}</ul> : null;
}
