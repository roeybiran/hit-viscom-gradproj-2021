import { CSSProperties } from "react";
import styled from "styled-components";

// https://every-layout.dev/layouts/center/

const Wrapper = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;

  &.flexbox {
    display: flex;
  }
`;

interface Props {
  max?: number | string;
  centerText?: boolean;
  gutters?: number | string;
  intristic?: boolean;
  overrides?: CSSProperties;
  children: React.ReactNode;
}

const Center = ({
  max = "var(--measure)",
  centerText = false,
  gutters = 0,
  intristic = false,
  overrides,
  children,
}: Props) => (
  <Wrapper
    className={intristic ? "flexbox" : ""}
    style={{
      maxWidth: max,
      textAlign: centerText ? "center" : "initial",
      paddingLeft: gutters,
      paddingRight: gutters,
      ...overrides,
    }}
  >
    {children}
  </Wrapper>
);

export default Center;
