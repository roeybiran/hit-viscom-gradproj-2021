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

const ProjectLabel = styled.div`
  color: var(--textcolor);
  padding: var(--s0);
  /* padding-block-start: var(--s0);
  padding-inline-start: var(--s0);
  padding-inline-start: var(--s0); */
  font-size: var(--s0);
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
  room: string | null;
  floor: string | null;
}

export default function ProjectCard(props: Props) {
  const { slug, featuredImage, imageAlt, projectName, student, room, floor } =
    props;
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
          <ProjectLabel style={{ height: "100%" }}>
            <p style={{ fontSize: "var(--s1)", fontWeight: 700 }}>
              {student.firstName} {student.lastName}
            </p>
            <p>{projectName}</p>

            <div
              style={{
                marginTop: "var(--s-1)",
                opacity: room && floor ? 1 : 0,
              }}
            >
              <p>
                {strings.he.floor}: {floor}
              </p>
              <p>
                {strings.he.room}: {room}
              </p>
            </div>
          </ProjectLabel>
        </a>
      </Link>
    </article>
  );
}
