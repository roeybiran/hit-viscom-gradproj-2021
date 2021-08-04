import styled from "styled-components";

// https://every-layout.dev/layouts/center/

const Wrapper = styled.div`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
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
    style={{
      maxWidth: maxWidth,
      display: intristic ? "flex" : "unset",
      paddingLeft: gutters,
      paddingRight: gutters,
      textAlign: centerText ? "center" : "unset",
    }}
  >
    {children}
  </Wrapper>
);

export default Center;
