import debounce from "@/lib/debounce";
import strings from "@/lib/strings";
import { FormEvent, useEffect, useMemo } from "react";
import styled from "styled-components";

const Form = styled.form`
  font-size: initial;
  background-color: var(--stdblue);
  max-width: 100%;
  padding-block-start: var(--s1);
  padding-block-end: var(--s1);

  input {
    display: block;
    background-color: var(--stdblue);
    border-bottom: 2px solid white;
    width: 80%;
    text-align: left;
    margin-inline-start: auto;
    /* margin-inline-end: auto; */
    color: var(--textcolor);
    outline: none;
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
    <Form method="get" action="/api/search/">
      <label className="sr-only" htmlFor="query">
        {strings.he.searchLabel}
      </label>
      <input
        type="text"
        id="query"
        name="q"
        onInput={handler}
        placeholder={strings.he.searchPlaceholder}
      />
      {/* <input type="hidden" name="json" value="1" /> */}
      {/* <button type="submit">{searchLabel}</button> */}
    </Form>
  );
}
