import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import ProjectCard from "@/components/ProjectCard";
import Center from "@/components/Center";
import Grid from "@/components/Grid";
import Nav from "@/components/Nav";
import fetchAirtableData from "@/lib/fetchAirtableData";
import makeFeaturedImage from "@/lib/makeFeaturedImage";
import strings from "@/lib/strings";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>{strings.he.heads.home.title}</title>
        <meta name="description" content={strings.he.heads.home.description} />
      </Head>
      <Nav />
      <Center maxWidth="1024px">
        <header>
          <h1>{}</h1>
        </header>
        <main style={{ width: "100%", marginTop: "var(--s2)" }}>
          <Grid>
            {props.projects.map((project) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                featuredImage={project.featuredImage}
                imageAlt={project.imageAlt}
                projectName={project.projectName}
                student={{
                  firstName: project.student.firstName,
                  lastName: project.student.lastName,
                }}
                showLocation={false}
              />
            ))}
          </Grid>
        </main>
      </Center>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
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
