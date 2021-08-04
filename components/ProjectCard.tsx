import Image from "next/image";
import styled from "styled-components";
import Stack from "./Stack";

const ImageContainer = styled.div`
  position: relative;
  min-width: 250px;
  min-height: 250px;
`;

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Stack margin="var(--s-1)">
      <ImageContainer>
        <Image
          src={project.featuredImage.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={project.imageAlt}
          placeholder="blur"
          blurDataURL={project.featuredImage.blurDataUrl}
        />
      </ImageContainer>
      <div>
        <p
          style={{
            fontWeight: 700,
          }}
        >
          {project.name}
        </p>
        <p>{project.student.fullName}</p>
      </div>
    </Stack>
  );
}
