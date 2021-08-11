import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  space?: string;
}

const Wrapper = styled.div<{ space?: string }>`
  > * + * {
    margin-top: ${(props) => props.space ?? "var(--s0)"};
  }
`;

export default function Stack(props: Props) {
  return (
    // @ts-ignore
    <Wrapper space={props.space}>{props.children}</Wrapper>
  );
}
