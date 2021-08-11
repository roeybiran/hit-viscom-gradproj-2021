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
import Link from "next/link";

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const project = props.project;
  if (!project) {
    return <Custom404 />;
  }

  const fullName = `${project.student.firstName} ${project.student.lastName}`;
  const social = [
    { prop: project.projectUrl, label: strings.he.projectUrl },
    { prop: project.student.mail, label: strings.he.mail },
    { prop: project.student.portfolio, label: strings.he.portfolio },
    { prop: project.student.instagram, label: strings.he.instagram },
  ]
    .filter((x) => x.prop)
    .map((x) => {
      const url = new URL(x.prop!.toLowerCase());
      const host = url.host.replace(/^www\./, "");

      const path = `${url.pathname
        .split("/")
        .filter((x) => x)
        .slice(0, 1)}`;
      const final = `${host}/${path}`.replace(/^\/|\/$/g, "");

      return (
        <li key={x.label}>
          {x.label}:{" "}
          <a
            style={{ textDecoration: "underline" }}
            href={x.prop!}
            target="_blank"
            rel="noopener noreferrer"
          >
            {final}
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
        <Center intristic={false}>
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
            <Center>
              <Stack>
                <p>{project.summary}</p>
                {social.length > 0 && <ul>{social}</ul>}
              </Stack>
            </Center>
            <Center intristic max={"1024px"}>
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
      </Stack>
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
