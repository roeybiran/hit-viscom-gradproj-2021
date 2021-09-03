import styled, { CSSProperties } from "styled-components";

interface WrapperProps {
  centered?: string;
}

type Props = WrapperProps & {
  children: React.ReactNode;
  minHeight?: string;
  noPad?: boolean;
  space?: string;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  min-height: var(--min-height);
  padding: var(--padding);

  > * {
    margin-top: var(--space);
    margin-bottom: var(--space);
  }

  > :first-child:not(${(props) => props.centered}) {
    margin-top: 0;
  }

  > :last-child:not(${(props) => props.centered}) {
    margin-bottom: 0;
  }

  > ${(props) => props.centered} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const Cover = (props: Props) => (
  <Wrapper
    centered={props.centered ?? "h1"}
    style={{
      // @ts-ignore
      "--space": props.space ?? "var(--s1)",
      "--min-height": props.minHeight ?? "100vh",
      "--padding": props.noPad ? 0 : "1rem",
    }}
  >
    {props.children}
  </Wrapper>
);

export default Cover;
