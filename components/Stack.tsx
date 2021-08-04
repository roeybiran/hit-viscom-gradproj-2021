import styled, { CSSProperties } from "styled-components";

interface Props {
  children: React.ReactNode;
  margin?: string;
  as?: string;
  style?: CSSProperties;
}

const Wrapper = styled.div<{ margin?: string }>`
  > * + * {
    margin-top: ${(props) => props.margin ?? "var(--s0)"};
  }
`;

export default function Stack(props: Props) {
  return (
    // @ts-ignore
    <Wrapper style={props.style} as={props.as ?? "div"} margin={props.margin}>
      {props.children}
    </Wrapper>
  );
}
