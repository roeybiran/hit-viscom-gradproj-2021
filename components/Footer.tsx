import strings from "@/lib/strings";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import hitLogo from "/public/hitLogo.svg";
import Image from "next/image";
import { Stack, Center } from "@roeybiran/every-layout-styled-components";

const scrolling = keyframes`
 to {
   transform: translateX(0%)
 }
`;

const Wrapper = styled.div`
  margin-block-start: var(--s2);
  margin-block-end: var(--s0);
  text-decoration: none;

  .hit-full-name {
    font-weight: 700;
  }

  .hit-link {
    display: flex;
    gap: var(--s-1);
  }

  .center-wrapper {
    font-size: var(--s-1);
  }

  .colophon a {
    text-decoration: underline;
  }

  .scroller {
    overflow: hidden;
    position: relative;
    display: flex;
  }

  .scroller:hover ul {
    animation-play-state: paused;
  }

  .scroller ul {
    transform: translateX(100%);
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    animation: 120s linear 0s infinite normal none running ${scrolling};
  }

  .scroller li {
    display: inline-block;
  }

  .scroller a:hover {
    text-decoration: underline;
  }

  @media (prefers-reduced-motion) {
    ul {
      overflow-x: auto;
    }

    .scroller:last-child {
      display: none;
    }
  }
`;

interface Props {
  list: { first: string; last: string; slug: string }[];
}

export default function Footer(prop: Props) {
  const mySlug = `/${
    prop.list.find((p) => ["Biran", "בירן"].includes(p.last))!.slug
  }`;

  return (
    <Wrapper>
      <Stack>
        <Divider />
        <div className="scroller">
          <NameList list={prop.list} />
          <NameList list={prop.list} ariaHidden />
        </div>
        <Divider />
        <div className="center-wrapper">
          <Center intrinsic max="none" gutters="var(--s1)">
            <a href="https://www.hit.ac.il/" className="hit-link">
              <div>
                <Image
                  aria-hidden
                  src={hitLogo}
                  width={30}
                  height={30}
                  alt={strings.hitFullName}
                />
              </div>
              <div>
                <p className="hit-full-name">{strings.hitFullName}</p>
                <address>{strings.hitAddress}</address>
              </div>
            </a>
            <p className="colophon">
              {strings.credits.dev}:{" "}
              <Link href={mySlug}>
                <a>{strings.credits.me}</a>
              </Link>
            </p>
            <p className="colophon" dir="ltr">
              Built with <a href="https://nextjs.org">Next.js</a>
            </p>
            <p className="colophon" dir="ltr">
              <a href="https://github.com/roeybiran/hitviscom-graduates-2021">
                Source
              </a>
            </p>
          </Center>
        </div>
      </Stack>
    </Wrapper>
  );
}

const NameList = (props: Props & { ariaHidden?: boolean }) => (
  <ul aria-hidden={props.ariaHidden}>
    {props.list.map(({ first, last, slug }) => (
      <li key={slug}>
        <Link href={"/" + slug}>
          <a tabIndex={-1}>
            {first} {last}
          </a>
        </Link>
        <span aria-hidden> ·&nbsp;</span>
      </li>
    ))}
  </ul>
);

const Divider = styled.div`
  border-bottom: 1px solid currentcolor;
`;
