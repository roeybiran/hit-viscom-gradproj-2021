import Link from "next/link";
import strings from "@/lib/strings";
import Switcher from "@/components/Switcher";
import Image from "next/image";
import styled from "styled-components";
import Center from "./Center";
import SearchBar from "./SearchBar";

// TODO
const routes = {
  home: { path: "/", label: strings.he.home },
  search: { path: "/search", label: strings.he.index },
};

const Wrapper = styled.nav`
  gap: var(--s2);
  background-color: var(--stdblue);
  color: var(--textcolor);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: var(--s1);
  font-size: var(--s1);

  > * {
    flex-grow: 1;
  }
`;

const HomeButton = styled.a`
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
`;

interface Props {
  searchModeCallback?: (arg: string) => void;
}

export default function Nav(props: Props) {
  return (
    <Center maxWidth="1024px">
      <Wrapper>
        <Link href="/">
          <a>
            <HomeButton>
              <Image
                className="hit-logo"
                src="/hitLogo.svg"
                alt="Holon Institute of Technology Logo"
                width={48}
                height={48}
              />
              <div>
                <p>{strings.he.navTitle}</p>
                <p style={{ fontWeight: 700 }}>{strings.he.navSubtitle}</p>
              </div>
            </HomeButton>
          </a>
        </Link>
        {props.searchModeCallback ? (
          <SearchBar onInput={props.searchModeCallback} />
        ) : (
          <Link href={routes.search.path}>
            <a style={{ fontSize: "initial", textAlign: "left" }}>
              {routes.search.label}
            </a>
          </Link>
        )}
      </Wrapper>
    </Center>
  );
}
