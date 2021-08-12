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
import Nav from "@/components/Header";
import Stack from "@/components/Stack";
import fetchAirtableData from "@/lib/fetchAirtableData";
import Custom404 from "pages/404";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const project = props.project;
  if (!project) {
    return <Custom404 />;
  }

  const fullName = `${project.student.firstName} ${project.student.lastName}`;
  const social = [
    { address: project.projectUrl, label: strings.he.projectUrl },
    { address: project.student.mail, label: strings.he.mail },
    { address: project.student.portfolio, label: strings.he.portfolio },
    { address: project.student.instagram, label: strings.he.instagram },
  ]
    .filter((x) => x.address)
    .map((x) => {
      const prettyUrl = x
        .address!.toLowerCase()
        .replace(/^http(s?):\/\//, "")
        .replace(/^www\./, "")
        .replace(/^mailto:/, "")
        .split("/")
        .filter((x) => x)
        .slice(0, 2)
        .join("/");

      return (
        <li key={x.label}>
          {x.label}:{" "}
          <a
            style={{ textDecoration: "underline" }}
            href={x.address!}
            target="_blank"
            rel="noopener noreferrer"
          >
            {prettyUrl}
          </a>
        </li>
      );
    });

  return (
    <>
      <Head>
        <title>
          {fullName} - {project.name} | {strings.he.suffix}
        </title>
        <meta name="description" content={project.summary} />
      </Head>
      <Nav />
      <Stack>
        <Center intristic={false} gutters="var(--s1)">
          <header>
            <Link href="/">
              <a
                style={{
                  color: "var(--stdblue)",
                  display: "block",
                  marginBlockEnd: "var(--s1)",
                }}
              >
                {strings.he.backArrow}{" "}
                <span style={{ textDecoration: "underline" }}>
                  {strings.he.back}
                </span>
              </a>
            </Link>
            <h1 style={{ fontWeight: 700 }}>{fullName}</h1>
            <p style={{ fontSize: "var(--s1)" }}>{project.name}</p>
          </header>
        </Center>
        <main>
          <Stack space="var(--s3)">
            <Center intristic={false} gutters="var(--s1)">
              <Stack>
                <p>{project.summary}</p>
                {social.length > 0 && <ul>{social}</ul>}
              </Stack>
            </Center>
            <Center intristic max="1024px">
              <Stack>
                {project.videos.map((vid) => (
                  <div key={vid} dangerouslySetInnerHTML={{ __html: vid }} />
                ))}
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
          </Stack>
        </main>
        <Footer list={props.allProjects} />
      </Stack>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let project;
  if (context.params?.slug && typeof context.params.slug === "string") {
    project = await fetchFullProject(context.params.slug);
  }

  // TODO: remove this redundant call (check nextjs support for getstaticprops in layout comps)
  const allProjects = (await fetchAirtableData()).map(
    ({ firstNameHe, lastNameHe, slug }) => ({
      first: firstNameHe,
      last: lastNameHe,
      slug,
    })
  );
  return {
    notFound: project === undefined,
    props: {
      project,
      allProjects,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await fetchAirtableData()).map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: true };
};
