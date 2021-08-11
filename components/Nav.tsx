import Link from "next/link";
import strings from "@/lib/strings";
import Image from "next/image";
import styled from "styled-components";
import Center from "./Center";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
  gap: var(--s2);
  color: var(--stdblue);
  width: 100%;
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
  padding-block-start: var(--s1);
  padding-block-end: var(--s1);
  font-size: var(--s1);
  > * {
    flex-grow: 1;
  }
`;

interface Props {
  onInput?: (arg: string) => void;
}

export default function Nav(props: Props) {
  return (
    <nav
      aria-labelledby="primary-navigation"
      style={{
        position: "sticky",
        top: "0",
        // backgroundColor: "white",
        backdropFilter: "blur(96px)",
        WebkitBackdropFilter: "blur(96px)",
        zIndex: 2,
      }}
    >
      <Center max="none" gutters="var(--s1)">
        <Wrapper>
          <HitInfo />
          <div>
            <Masthead />
            {props.onInput && <SearchBar onInput={props.onInput} />}
          </div>
        </Wrapper>
      </Center>
      <div
        style={{
          borderBottom: "1px solid var(--stdblue)",
          marginBlockEnd: "var(--s2)",
        }}
      />
    </nav>
  );
}

const Masthead = () => (
  <>
    <Link href="/">
      <a style={{ fontWeight: 700 }}>{strings.he.exhibitionName}</a>
    </Link>
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
