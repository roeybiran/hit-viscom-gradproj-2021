import styled, { CSSProperties } from "styled-components";

interface Props {
  style?: CSSProperties;
  as?: string;
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: var(--s1);
`;

export default function Grid(props: Props) {
  return (
    // @ts-ignore
    <Wrapper
      // @ts-ignore
      as={props.as ?? "div"}
      style={props.style}
    >
      {props.children}
    </Wrapper>
  );
}
