import { FormEvent, useEffect, useMemo } from "react";
import styled from "styled-components";
import debounce from "@/lib/debounce";
import strings from "@/lib/strings";

const Form = styled.form`
  font-size: initial;
  margin-block-start: var(--s1);

  input {
    display: block;
    border-bottom: 2px solid var(--stdblue);
    outline: none;
    background-color: rgba(1, 1, 1, 0);
    appearance: none;
  }

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
    <Form
      method="get"
      action="/api/search/"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="sr-only" htmlFor="query">
        {strings.he.searchLabel}
      </label>
      {/* TODO: progressively enhance */}
      <input
        style={{
          width: "100%",
          fontSize: "var(--s2)",
          display: "block",
        }}
        type="text"
        id="query"
        name="q"
        onInput={handler}
        placeholder={strings.he.searchPlaceholder}
      />
    </Form>
  );
}
