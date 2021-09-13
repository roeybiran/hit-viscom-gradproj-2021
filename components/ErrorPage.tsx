import styled from "styled-components";
import { Cover, Center } from "@roeybiran/every-layout-styled-components";
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
            <a>{strings.backToHome}</a>
          </Link>
        </Center>
      </Cover>
    </Wrapper>
  );
}
