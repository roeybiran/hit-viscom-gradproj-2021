import strings from "@/lib/strings";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Stack from "./Stack";

const ImageContainer = styled.div`
  position: relative;
  min-width: 250px;
  min-height: 250px;
`;

const ProjectLabel = styled.p`
  color: var(--textcolor);
  padding-block-end: var(--s0);
  padding-block-start: var(--s0);
  padding-inline-start: var(--s0);
  font-size: var(--s0);

  > span {
    font-weight: 700;
  }
`;

const LocationInfo = styled.div`
  /* font-size: var(--s1); */
`;

const SearchResult = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding-inline-end: var(--s2);
  gap: var(--s1);
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

type SearchResultProps = Props & {
  room: string | null;
  floor: string | null;
};

export function ProjectSearchResult(props: SearchResultProps) {
  const { slug, featuredImage, imageAlt, projectName, student } = props;
  return (
    <article>
      <Link href={`/projects/${encodeURIComponent(slug)}`}>
        <a
          style={{
            textDecoration: "none",
            color: "unset",
            display: "block",
            backgroundColor: "var(--stdblue)",
          }}
        >
          <SearchResult>
            <ImageContainer>
              <Image
                src={featuredImage.url}
                layout="fill"
                // className="next-image"
                // width={featuredImage.width}
                // height={featuredImage.height}
                objectFit="cover"
                objectPosition="center"
                alt={imageAlt}
                placeholder="blur"
                blurDataURL={featuredImage.blurDataUrl}
              />
            </ImageContainer>
            <div style={{ height: "100%" }}>
              <ProjectLabel>
                <span>{projectName}</span> | {student.firstName}{" "}
                {student.lastName}
                {props.floor && props.room && (
                  <LocationInfo>
                    <p>
                      {strings.he.floor}: {props.floor}{" "}
                    </p>
                    <p>
                      {strings.he.room}: {props.room}
                    </p>
                  </LocationInfo>
                )}
              </ProjectLabel>
            </div>
          </SearchResult>
        </a>
      </Link>
    </article>
  );
}

export default function ProjectCard(props: Props) {
  const { slug, featuredImage, imageAlt, projectName, student } = props;
  return (
    <article>
      <Link href={`/projects/${encodeURIComponent(slug)}`}>
        <a
          style={{
            textDecoration: "none",
            color: "unset",
            display: "block",
            backgroundColor: "var(--stdblue)",
          }}
        >
          <ImageContainer>
            <Image
              src={featuredImage.url}
              layout="fill"
              // className="next-image"
              // width={featuredImage.width}
              // height={featuredImage.height}
              objectFit="cover"
              objectPosition="center"
              alt={imageAlt}
              placeholder="blur"
              blurDataURL={featuredImage.blurDataUrl}
            />
          </ImageContainer>
          <div style={{ height: "100%" }}>
            <ProjectLabel>
              <span>{projectName}</span> | {student.firstName}{" "}
              {student.lastName}
            </ProjectLabel>
          </div>
        </a>
      </Link>
    </article>
  );
}
