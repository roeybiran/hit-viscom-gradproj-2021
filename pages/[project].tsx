import Footer from "@/components/Footer";
import Social from "@/components/Social";
import fetchAirtableData from "@/lib/fetchAirtableData";
import fetchFullProject from "@/lib/fetchFullProject";
import strings from "@/lib/strings";
import { Center, Stack } from "@roeybiran/every-layout-styled-components";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const project = props.project!;
  const fullName = `${project.student.firstName} ${project.student.lastName}`;
  const title = `${fullName} - ${project.name} | ${strings.suffix}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={project.featuredImageSrc} />
        <meta property="og:description" content={project.summary} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:image" content={project.featuredImageSrc} />
        <meta property="twitter:description" content={project.summary} />
      </Head>
      <Wrapper>
        <Stack as="main">
          <Center gutters="var(--s0)">
            <Stack>
              <header>
                <Link href="/">
                  <a className="back">
                    {strings.backArrow} <span>{strings.back}</span>
                  </a>
                </Link>
                <h1>{fullName}</h1>
                <p>{project.name}</p>
              </header>
              <p>{project.summary}</p>
              <Social
                projectUrl={project.projectUrl}
                mail={project.student.mail}
                portfolio={project.student.portfolio}
                instagram={project.student.instagram}
              />
            </Stack>
          </Center>

          <Center intrinsic max="none">
            <Stack>
              {project.videos.map((vid) => (
                <div key={vid} dangerouslySetInnerHTML={{ __html: vid }} />
              ))}
              {project.otherImages.map((img) => (
                <div className="image-container" key={img.url}>
                  <Image
                    src={img.url}
                    alt={project.imageAlt}
                    layout="fill"
                    // width={img.width}
                    // height={img.height}
                    placeholder="blur"
                    objectFit="contain"
                    blurDataURL={img.blurDataUrl}
                  />
                </div>
              ))}
            </Stack>
          </Center>
        </Stack>
      </Wrapper>

      <Footer list={props.allProjects} />
    </>
  );
}

const Wrapper = styled.div`
  .back {
    display: block;
    margin-block-end: var(--s1);
  }

  .back > span {
    text-decoration: underline;
  }

  header h1 {
    font-weight: 700;
  }

  header p {
    font-size: var(--s1);
  }

  .image-container {
    position: relative;
    width: 85vw;
    height: 90vh;
  }
`;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  let project;
  if (params?.project && typeof params.project === "string") {
    project = await fetchFullProject(params.project);
  }

  const allProjects = (await fetchAirtableData()).map(
    ({ firstNameHe, lastNameHe, slug }) => ({
      first: firstNameHe,
      last: lastNameHe,
      slug,
    })
  );

  return {
    notFound: !project,
    props: {
      project,
      allProjects,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await fetchAirtableData()).map(({ slug }) => ({
    params: { project: slug },
  }));

  return { paths, fallback: false };
};
