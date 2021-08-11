import Link from "next/link";
import strings from "@/lib/strings";
import Image from "next/image";
import styled from "styled-components";
import Center from "./Center";
import SearchBar from "./SearchBar";

const MastheadWrapper = styled.div`
  gap: var(--s0);
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
  > * {
    flex-grow: 1;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid currentColor;
  margin-block-end: var(--s0);
`;

interface Props {
  onInput?: (arg: string) => void;
}

const style = { color: "var(--stdblue)", fontSize: "var(--s1)" };

export default function Nav(props: Props) {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(96px)",
          WebkitBackdropFilter: "blur(96px)",
          zIndex: 2,
          ...style,
        }}
      >
        <Home />
        <Divider />
      </header>
      <div style={{ ...style, marginBlockEnd: "var(--s2)" }}>
        <Center max="none" gutters="var(--s1)">
          <MastheadWrapper>
            <HitInfo />
            <div>
              <Details />
              {props.onInput && <SearchBar onInput={props.onInput} />}
            </div>
          </MastheadWrapper>
        </Center>
      </div>
    </>
  );
}

const Home = () => (
  <Center max="none" gutters="var(--s1)">
    <Link href="/">
      <a
        style={{
          fontWeight: 700,
          display: "block",
          paddingBlockStart: "var(--s1)",
          paddingBlockEnd: "var(--s1)",
        }}
      >
        {strings.he.exhibitionName}
      </a>
    </Link>
  </Center>
);

const Details = () => (
  <>
    <p>{strings.he.exhibitionDescription}</p>
    <p style={{ fontWeight: 700 }}>{strings.he.exhibitionDept}</p>
    <p>{new Date().getFullYear()}</p>
    <p
      style={{
        display: "inline-block",
        fontSize: "var(--s0)",
        paddingLeft: "var(--s-2)",
        paddingRight: "var(--s-2)",
        backgroundColor: "var(--stdblue)",
        color: "var(--stdyellow)",
        borderRadius: "5px",
      }}
    >
      בטא
    </p>
  </>
);

const HitInfo = () => (
  <div
    style={{
      fontSize: "initial",
      textAlign: "left",
    }}
  >
    <a
      href="https://www.hit.ac.il/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        letterSpacing: "1px",
        fontWeight: 700,
      }}
    >
      HIT
    </a>
    <p style={{ maxWidth: "none" }}>{strings.he.hitFullName}</p>
    <p style={{ maxWidth: "none" }}>{strings.he.facultyName}</p>
  </div>
);
