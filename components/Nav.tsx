import Link from "next/link";
import { GetStaticProps } from "next";
import strings from "../lib/strings";
import styled from "styled-components";

interface Props {
  lang: "he" | "en";
}

const Switcher = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: var(--s1);
  overflow: auto;
  /* font-size: var(--s3); */
`;

export default function Nav({ lang }: Props) {
  const homeLabel = strings.home[lang];
  const projectsLabel = strings.gallery[lang];
  const list = strings.index[lang];
  return (
    <nav>
      <Switcher as="ul">
        <li>
          <Link href="/">
            <a>{homeLabel}</a>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <a>{projectsLabel}</a>
          </Link>
        </li>
        <li>
          <Link href="/locations">
            <a>{list}</a>
          </Link>
        </li>
      </Switcher>
    </nav>
  );
}
