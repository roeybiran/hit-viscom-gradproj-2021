import strings from "@/lib/strings";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Stack from "./Stack";
import hitLogo from "/public/hitLogo.svg";
import Image from "next/image";
import Center from "./Center";

const projectsSlug = "/projects";

const scrolling = keyframes`
 to {
   transform: translateX(0%)
 }
`;

const Wrapper = styled.div`
  margin-block-start: var(--s2);
  margin-block-end: var(--s0);
  text-decoration: none;

  .colophon a {
    text-decoration: underline;
  }

  .scroller {
    overflow-x: hidden;
    position: relative;
    display: flex;
    /* gap: var(--s0); */

    ul {
      transform: translateX(100%);
      display: inline-block;
      white-space: nowrap;
      will-change: transform;
      animation: 120s linear 0s infinite normal none running ${scrolling};
    }

    li {
      display: inline-block;
    }
  }
`;

interface Props {
  list: { first: string; last: string; slug: string }[];
}

export default function Footer(prop: Props) {
  const divider = (
    <div
      style={{
        borderBottom: "1px solid currentcolor",
      }}
    />
  );

  const mySlug = `${projectsSlug}/${
    prop.list.find((p) => ["Biran", "בירן"].includes(p.last))!.slug
  }`;

  return (
    <Wrapper>
      <Stack>
        {divider}
        <div className="scroller">
          <NameList list={prop.list} />
          <NameList list={prop.list} hidden />
        </div>
        {divider}
        <div style={{ fontSize: "var(--s-1)" }}>
          <Center intristic max="none" gutters="var(--s1)">
            <a
              href="https://www.hit.ac.il/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                gap: "var(--s-1)",
              }}
            >
              <div>
                <Image
                  aria-hidden
                  src={hitLogo}
                  width={30}
                  height={30}
                  alt={strings.he.hitFullName}
                />
              </div>
              <div>
                <p style={{ fontWeight: 700 }}>{strings.he.hitFullName}</p>
                <address>{strings.he.hitAddress}</address>
              </div>
            </a>
            <p className="colophon">
              {strings.he.credits.dev}:{" "}
              <Link href={mySlug}>
                <a>{strings.he.credits.me}</a>
              </Link>
            </p>
            <p className="colophon">
              {strings.he.builtWith}{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>
              . {strings.he.hostedOn}{" "}
              <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel
              </a>
              .
            </p>
          </Center>
        </div>
      </Stack>
    </Wrapper>
  );
}

const NameList = (props: Props & { hidden?: boolean }) => (
  <ul aria-hidden={props.hidden}>
    {props.list.map(({ first, last, slug }) => (
      <li key={`${slug}`}>
        <Link href={`${projectsSlug}/${slug}`}>
          <a>
            {first} {last}
          </a>
        </Link>
        <span aria-hidden> ·&nbsp;</span>
      </li>
    ))}
  </ul>
);
