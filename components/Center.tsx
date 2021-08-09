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
  maxWidth?: string;
  centerText?: boolean;
  gutters?: string;
  intristic?: boolean;
  children: React.ReactNode;
}

const Center = ({
  maxWidth = "var(--measure)",
  centerText = false,
  gutters = "var(--s1)",
  intristic = true,
  children,
}: Props) => (
  <Wrapper
    className={intristic ? "flexbox" : ""}
    style={{
      maxWidth: maxWidth,
      textAlign: centerText ? "center" : "initial",
      paddingLeft: gutters,
      paddingRight: gutters,
    }}
  >
    {children}
  </Wrapper>
);

export default Center;
