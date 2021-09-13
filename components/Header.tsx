import Link from "next/link";
import strings from "@/lib/strings";
import styled from "styled-components";
import { Center } from "@roeybiran/every-layout-styled-components";

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(96px);
  -webkit-backdrop-filter: blur(96px);
  z-index: 2;
  padding-block-start: var(--s-2);
  margin-block-end: var(--s1);

  .divider {
    border-bottom: 1px solid currentColor;
    margin-block-start: var(--s-2);
  }

  a:not(.home-link),
  a > span:not(.beta-badge) {
    text-decoration: underline;
  }

  span.beta-badge {
    vertical-align: super;
    font-size: 75%;
    font-weight: initial;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--s-2);
    /* column-gap: var(--s-2); */
    align-items: baseline;

    > *:nth-child(odd) {
      font-weight: 700;
    }

    > *:nth-last-child(2) {
      margin-inline-start: auto;
    }
  }

  .hit-link {
    letter-spacing: "1px";
  }
`;

export default function Nav() {
  return (
    <Header>
      <Center max="none" gutters="var(--s1)">
        <div className="content">
          <Link href="/">
            <a className="home-link">
              <span>{strings.exhibitionName}</span>
              <span className="beta-badge">בטא</span>
            </a>
          </Link>
          <p>{strings.exhibitionDescription}</p>
          <p>2021</p>
          <p>{strings.departmentName}</p>
          <a
            href="https://www.hit.ac.il/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <abbr title="Holon Institute of Technology">HIT</abbr>
          </a>
        </div>
      </Center>
      <div className="divider" />
    </Header>
  );
}
