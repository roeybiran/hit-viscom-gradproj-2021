import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.li`
  background-color: var(--stdblue);
  position: relative;

  &:hover {
    box-shadow: 0 0 0 0.25rem black;
  }

  a {
    font-size: var(--s1);
    font-weight: 700;
    text-decoration: none;
    color: unset;
  }

  a:focus {
    text-decoration: underline;
    outline-color: white;
  }

  &:focus-within {
    box-shadow: 0 0 0 0.25rem black;
    outline: 2px solid transparent;
  }

  &:focus-within a:focus {
    text-decoration: none;
  }

  a::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .image-container {
    position: relative;
    min-width: 250px;
    min-height: 250px;
  }

  .project-label {
    color: var(--stdwhite);
    padding: var(--s0);
    font-size: var(--s0);
    height: 100%;
  }
`;

interface Props {
  slug: string;
  featuredImage: ImageAttachment;
  imageAlt: string;
  projectName: string;
  student: {
    firstName: string;
    lastName: string;
  };
}

export default function ProjectCard(props: Props) {
  const { slug, featuredImage, imageAlt, projectName, student } = props;
  return (
    <Wrapper>
      <div className="image-container">
        <Image
          src={featuredImage.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={imageAlt}
          placeholder="blur"
          blurDataURL={featuredImage.blurDataUrl}
        />
      </div>
      <div className="project-label">
        <Link href={"/" + encodeURIComponent(slug)}>
          <a>
            {student.firstName} {student.lastName}
          </a>
        </Link>
        <p>{projectName}</p>
      </div>
    </Wrapper>
  );
}
