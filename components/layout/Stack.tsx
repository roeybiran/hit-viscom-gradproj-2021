import { AriaRole } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  space?: string;
  as?: string;
  role?: AriaRole;
}

const Wrapper = styled.div<{ space?: string }>`
  > * + * {
    margin-top: ${(props) => props.space ?? '1rem'};
  }
`;

export default function Stack(props: Props) {
  return (
    // @ts-ignore
    <Wrapper as={props.as ?? 'div'} space={props.space} role={props.role}>
      {props.children}
    </Wrapper>
  );
}
