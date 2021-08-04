import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Center from "../../components/Center";
import Nav from "../../components/Nav";
import Stack from "../../components/Stack";
import fetchData from "../../lib/fetchData";
import strings from "../../lib/strings";
//
export default function ProjectPage({
  project,
  labels,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!project) return <div />;
  return (
    <Center>
      <Nav lang="he" />
      <Stack>
        <header>
          <h1>{project.name}</h1>
          <p>{project.student.fullName}</p>
        </header>
        {project.student.mail && (
          <p>
            <a href={project.student.mail}>{labels.mail}</a>
          </p>
        )}
        {project.student.portfolio && (
          <p>
            <a href={project.student.portfolio}>{labels.portfolio}</a>
          </p>
        )}
        {project.student.instagram && (
          <p>
            <a href={project.student.instagram}>{labels.instagram}</a>
          </p>
        )}
        <main>
          <p>{project.summary}</p>
        </main>
        <div>
          {project.videos.map((vid) => (
            <div key={vid} dangerouslySetInnerHTML={{ __html: vid }} />
          ))}
        </div>
        <Center>
          <Stack>
            {project.otherImages.map((img) => {
              return (
                <div
                  style={{
                    maxWidth: "max-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  key={img.url}
                >
                  <Image
                    src={img.url}
                    width={img.width}
                    height={img.height}
                    alt={project.imageAlt}
                    placeholder="blur"
                    blurDataURL={img.blurDataUrl}
                  />
                </div>
              );
            })}
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const project = (await fetchData()).find(
    (project) => project.id === context.params?.id
  );

  return {
    notFound: project === undefined,
    props: {
      project,
      labels: {
        instagram: strings.instagram.he,
        mail: strings.mail.he,
        portfolio: strings.portfolio.he,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await fetchData()).map((p) => ({ params: { id: p.id } }));

  return { paths, fallback: true };
};
