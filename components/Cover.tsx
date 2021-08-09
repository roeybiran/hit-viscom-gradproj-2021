import styled, { CSSProperties } from "styled-components";

interface WrapperProps {
  centeredSelector?: string;
}

type Props = WrapperProps & {
  children: React.ReactNode;
  minHeight?: string;
  pad?: boolean;
  space?: string;
  overrides?: CSSProperties;
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

  > :first-child:not(${(props) => props.centeredSelector}) {
    margin-top: 0;
  }

  > :last-child:not(${(props) => props.centeredSelector}) {
    margin-bottom: 0;
  }

  > ${(props) => props.centeredSelector} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const Cover = (props: Props) => (
  <Wrapper
    centeredSelector={props.centeredSelector ?? "h1"}
    style={{
      // @ts-ignore
      "--min-height": props.minHeight ?? "100vh",
      "--padding": props.pad ? "1rem" : 0,
      "--space": props.space ?? "var(--s1)",
      ...props.overrides,
    }}
  >
    {props.children}
  </Wrapper>
);

export default Cover;
