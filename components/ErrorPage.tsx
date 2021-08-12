import styled from "styled-components";
import Center from "../components/Center";
import Cover from "../components/Cover";
import Link from "next/link";
import strings from "@/lib/strings";

interface Props {
  errorMessage: string;
}

const Wrapper = styled.div`
  h1 {
    font-weight: 700;
  }
`;
export default function ErrorPage(props: Props) {
  return (
    <Wrapper>
      <Cover centered="div">
        <Center intristic>
          <h1>{props.errorMessage}</h1>
          <Link href="/">
            <a>{strings.he.backToHome}</a>
          </Link>
        </Center>
      </Cover>
    </Wrapper>
  );
}
