import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Head from "next/head";
import styled from "styled-components";

import fetchFullProject from "@/lib/fetchFullProject";
import strings from "@/lib/strings";

import Center from "@/components/Center";
import Nav from "@/components/Nav";
import Stack from "@/components/Stack";
import fetchAirtableData from "@/lib/fetchAirtableData";
import Custom404 from "pages/404";

const Contact = styled.div`
  text-decoration: underline;
`;

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const project = props.project;
  if (!project) {
    return <Custom404 />;
  }
  // TODO: i18
  const mailLabel = strings.he.mail;
  const portfolioLabel = strings.he.portfolio;
  const instagramLabel = strings.he.instagram;
  const fullName = project.student.firstName + " " + project.student.lastName;

  return (
    <>
      <Head>
        <title>
          {fullName} - {project.name} | {strings.he.suffix}
        </title>
        <meta name="description" content={project.summary} />
      </Head>
      <Nav />
      <Center>
        <Stack>
          <header style={{ marginTop: "var(--s1)" }}>
            <h1>{project.name}</h1>
            <p>{fullName}</p>
          </header>
          <main>
            <Stack>
              <p>{project.summary}</p>
              <Contact>
                {project.student.mail && (
                  <p>
                    <a href={project.student.mail}>{mailLabel}</a>
                  </p>
                )}
                {project.student.portfolio && (
                  <p>
                    <a href={project.student.portfolio}>{portfolioLabel}</a>
                  </p>
                )}
                {project.student.instagram && (
                  <p>
                    <a href={project.student.instagram}>{instagramLabel}</a>
                  </p>
                )}
              </Contact>
            </Stack>
            <div>
              {project.videos.map((vid) => (
                <div key={vid} dangerouslySetInnerHTML={{ __html: vid }} />
              ))}
            </div>
            <Center>
              <Stack>
                {project.otherImages.map((img) => {
                  return (
                    <div key={img.url}>
                      <Image
                        src={img.url}
                        width={img.width}
                        height={img.height}
                        alt={project.imageAlt}
                        placeholder="blur"
                        objectFit="contain"
                        blurDataURL={img.blurDataUrl}
                      />
                    </div>
                  );
                })}
              </Stack>
            </Center>
          </main>
        </Stack>
      </Center>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let project;
  if (context.params?.slug && typeof context.params.slug === "string") {
    project = await fetchFullProject(context.params.slug);
  }

  return {
    notFound: project === undefined,
    props: {
      project,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await fetchAirtableData()).map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: true };
};
