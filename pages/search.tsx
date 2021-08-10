const foo = {};

export default foo;
// import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
// import styled from "styled-components";
// import React, { useMemo, useState } from "react";

// import Center from "@/components/Center";
// import Grid from "@/components/Grid";
// import Nav from "@/components/Nav";
// import fetchAirtableData from "@/lib/fetchAirtableData";
// import makeFeaturedImage from "@/lib/makeFeaturedImage";
// import ProjectCard, { ProjectSearchResult } from "@/components/ProjectCard";
// import Stack from "@/components/Stack";

// const ListItem = styled.li`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   border: 1px dashed black;
// `;

// export default function Search(
//   props: InferGetStaticPropsType<typeof getStaticProps>
// ) {
//   const [currentCards, setCurrentCards] = useState<JSX.Element[]>([]);

//   const allProjects = useMemo(
//     () =>
//       props.projects.map((p) => ({
//         project: p,
//         card: (
//           <ProjectSearchResult
//             key={p.id}
//             slug={p.slug}
//             featuredImage={p.featuredImage}
//             imageAlt={p.imageAlt}
//             projectName={p.projectName}
//             student={{
//               firstName: p.student.firstName,
//               lastName: p.student.lastName,
//             }}
//             room={p.room}
//             floor={p.floor}
//           />
//         ),
//       })),
//     [props.projects]
//   );

//   return (
//     <>
//       <Nav searchModeCallback={handleChange} />
//       <Center max="1024px">
//         <Stack style={{ marginTop: "var(--s2)" }}>{currentCards}</Stack>
//       </Center>
//     </>
//   );
// }

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const data = await fetchAirtableData();
//   const featuredImages = await Promise.all(
//     data.map((p) => makeFeaturedImage(p.featuredImage))
//   );
//   const projects = featuredImages.map((img, idx) => {
//     const proj = data[idx];
//     return {
//       id: proj.id,
//       slug: proj.slug,
//       featuredImage: img,
//       imageAlt: proj.imagesAltText,
//       projectName: proj.projectNameHe,
//       student: {
//         firstName: proj.firstNameHe,
//         lastName: proj.lastNameHe,
//       },
//       floor: proj.floor ?? null,
//       room: proj.room ?? null,
//     };
//   });

//   return {
//     props: {
//       projects,
//     },
//   };
// };
