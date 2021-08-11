import { CSSProperties } from "react";
import styled from "styled-components";

// https://every-layout.dev/layouts/center/

const Wrapper = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;

  &.flexbox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

interface Props {
  max?: number | string;
  centerText?: boolean;
  gutters?: number | string;
  intristic?: boolean;
  style?: CSSProperties;
  asElement?: string;
  children: React.ReactNode;
}

const Center = ({
  max = "var(--measure)",
  centerText = false,
  gutters = 0,
  intristic = false,
  children,
}: Props) => (
  <Wrapper
    className={intristic ? "flexbox" : undefined}
    style={{
      maxWidth: max,
      textAlign: centerText ? "center" : "initial",
      paddingLeft: gutters,
      paddingRight: gutters,
    }}
  >
    {children}
  </Wrapper>
);

export default Center;
