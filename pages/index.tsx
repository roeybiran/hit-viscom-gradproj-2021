import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import ProjectCard from "@/components/ProjectCard";
import Nav from "@/components/Header";
import fetchAirtableData from "@/lib/fetchAirtableData";
import makeFeaturedImage from "@/lib/makeFeaturedImage";
import strings from "@/lib/strings";
import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import {
  Center,
  Grid,
  Stack,
  Cover,
} from "@roeybiran/every-layout-styled-components";

const Wrapper = styled.div`
  .no-results {
    font-size: var(--s3);
    color: var(--stdblue);
  }
`;

export default function Home({
  projects: allProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const allCards = useMemo(
    () =>
      allProjects.map((p) => ({
        project: p,
        card: (
          <ProjectCard
            key={p.id}
            slug={p.slug}
            featuredImage={p.featuredImage}
            imageAlt={p.imageAlt}
            projectName={p.projectName}
            student={{
              firstName: p.student.firstName,
              lastName: p.student.lastName,
            }}
          />
        ),
      })),
    [allProjects]
  );

  const [currentCards, setCurrentCards] = useState(allCards);

  const handleChange = (s: string) => {
    const q = s.toLowerCase().replace(/\s/g, "");
    if (!q) {
      setCurrentCards(allCards);
      return;
    }
    const filtered = allCards.filter(({ project: p }) => {
      const haystacks = [
        p.student.firstName,
        p.student.lastName,
        p.student.firstName + p.student.lastName,
        p.projectName,
      ]
        .map((s) => s.toLowerCase())
        .filter((s) => s.startsWith(q));
      return haystacks.length > 0;
    });
    setCurrentCards(filtered);
  };

  return (
    <Wrapper>
      <Head>
        <title>{strings.heads.home.title}</title>
        <meta name="description" content={strings.heads.home.description} />
        <meta property="og:title" content={strings.heads.home.title} />
        <meta property="og:image" content={"https://i.imgur.com/Su504JD.jpg"} />
        <meta
          property="og:description"
          content={strings.heads.home.description}
        />
        <meta property="twitter:title" content={strings.heads.home.title} />
        <meta
          property="twitter:image"
          content={"https://i.imgur.com/Su504JD.jpg"}
        />
        <meta
          property="twitter:description"
          content={strings.heads.home.description}
        />
      </Head>
      <Nav />
      <Center as="main" max="none" gutters="var(--s1)">
        <Stack>
          <SearchBar onInput={handleChange} />
          <header className="sr-only">
            <h1>{strings.suffix}</h1>
          </header>
          {currentCards.length > 0 ? (
            <Grid as="ul">{currentCards.map(({ card }) => card)}</Grid>
          ) : (
            <Cover centered="div">
              <Center intrinsic>
                <p className="no-results">¯\_(ツ)_/¯</p>
              </Center>
            </Cover>
          )}
        </Stack>
      </Center>
      <Footer
        list={allProjects.map(({ student, slug }) => ({
          first: student.firstName,
          last: student.lastName,
          slug: slug,
        }))}
      />
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const data = await fetchAirtableData();
  const featuredImages = await Promise.all(
    data.map((p) => makeFeaturedImage(p.featuredImage))
  );
  const projects = featuredImages
    .map((img, idx) => {
      const proj = data[idx];
      return {
        id: proj.id,
        slug: proj.slug,
        featuredImage: img,
        imageAlt: proj.imagesAltText,
        projectName: proj.projectNameHe,
        student: {
          firstName: proj.firstNameHe,
          lastName: proj.lastNameHe,
        },
        room: proj.room ?? null,
        floor: proj.floor ?? null,
      };
    })
    .sort((p1, p2) => {
      if (!p1 || !p2) return 0;
      if (p1.student.lastName < p2.student.lastName) return -1;
      if (p1.student.lastName > p2.student.lastName) return 1;
      if (p1.student.firstName < p2.student.firstName) return -1;
      if (p1.student.firstName > p2.student.firstName) return 1;
      if (p1.id < p2.id) return -1;
      if (p1.id > p2.id) return 1;
      return 0;
    });

  return {
    props: {
      projects,
    },
  };
};
