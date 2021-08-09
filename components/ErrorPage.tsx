import Center from "../components/Center";
import Cover from "../components/Cover";
import Nav from "../components/Nav";

interface Props {
  errorMessage: string;
}

export default function ErrorPage(props: Props) {
  return (
    <>
      <Center>
        <Cover>
          <Nav />
          <h1>{props.errorMessage}</h1>
        </Cover>
      </Center>
    </>
  );
}
