import { FormEvent, useEffect, useMemo } from "react";
import styled from "styled-components";
import debounce from "@/lib/debounce";
import strings from "@/lib/strings";
import { Center } from "@roeybiran/every-layout-styled-components";

const Form = styled.form`
  input {
    width: 100%;
    display: block;
    border-bottom: 2px solid var(--stdblue);
    outline: none;
    background-color: rgba(1, 1, 1, 0);
    appearance: none;
    color: var(--stdblue);
  }

  /* @media (min-width: 576px) {
    input {
      font-size: var(--s2);
    }
  } */

  input:active,
  input:focus {
    border-bottom-style: dashed;
  }
`;

interface Props {
  onInput: (s: string) => void;
}

export default function SearchBar(props: Props) {
  const debouncer = debounce();
  const handler = useMemo(
    () =>
      debouncer.schedule((e: FormEvent<HTMLInputElement>) => {
        props.onInput((e.target as HTMLInputElement).value);
      }),
    [props, debouncer]
  );
  useEffect(() => debouncer.clear(), [debouncer]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <label className="sr-only" htmlFor="query-field">
        {strings.searchLabel}
      </label>
      <Center>
        <input
          type="text"
          id="query-field"
          onInput={handler}
          placeholder={strings.searchPlaceholder}
        />
      </Center>
    </Form>
  );
}
