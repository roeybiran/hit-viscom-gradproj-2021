import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import fetchAirtableData from "@/lib/fetchAirtableData";
import makeFeaturedImage from "@/lib/makeFeaturedImage";
import strings from "@/lib/strings";
import {
  Center,
  Cover,
  Grid,
  Stack,
} from "@roeybiran/every-layout-styled-components";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";

export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentProjects, setCurrentProjects] = useState(projects);

  const handleChange = (s: string) => {
    const q = s.toLowerCase().replace(/\s/g, "");
    if (!q) {
      setCurrentProjects(projects);
      return;
    }
    const filtered = projects.filter((p) => {
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
    setCurrentProjects(filtered);
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
      <Center as="main" max="none" gutters="var(--s1)">
        <Stack>
          <SearchBar onInput={handleChange} />
          <header className="sr-only">
            <h1>{strings.suffix}</h1>
          </header>
          <div aria-live="polite">
            <Grid
              className="grid"
              as="ul"
              aria-live="polite"
              data-empty={!currentProjects.length}
            >
              {projects.map((p) => (
                <li
                  key={p.id}
                  hidden={!currentProjects.some((x) => x.id === p.id)}
                >
                  <ProjectCard
                    slug={p.slug}
                    featuredImage={p.featuredImage}
                    imageAlt={p.imageAlt}
                    projectName={p.projectName}
                    student={{
                      firstName: p.student.firstName,
                      lastName: p.student.lastName,
                    }}
                  />
                </li>
              ))}
            </Grid>
            <Cover centered="div">
              <Center intrinsic>
                <p className="no-results">{strings.noResults} ¯\_(ツ)_/¯</p>
              </Center>
            </Cover>
          </div>
        </Stack>
      </Center>
      <Footer
        list={projects.map(({ student, slug }) => ({
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

const Wrapper = styled.div`
  .no-results {
    font-size: var(--s3);
    color: var(--stdblue);
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  }

  .grid + div {
    display: none;
  }

  [data-empty] + div {
    display: block;
  }

  main {
    min-height: 100vh;
  }
`;
