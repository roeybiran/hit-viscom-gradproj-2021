import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import styled from "styled-components";
import Center from "../components/Center";
import fetchData from "../lib/fetchData";
import React from "react";
import Grid from "../components/Grid";
import Stack from "../components/Stack";
import Nav from "../components/Nav";

const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 1px dashed black;
`;

export default function Locations(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Center maxWidth="100vw">
        <Nav lang="he" />
        <Grid
          overrides={{
            maxWidth: "100%",
            gridAutoRows: "minmax(250px, 1fr)",
            gap: 0,
          }}
        >
          {props.items.map((item) => (
            <ListItem key={item.projectName}>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                }}
              >
                <p>{`${item.lastName}, ${item.firstName}`}</p>
                {/* <p>{item.projectName}</p> */}
                <p>{item.floor}</p>
                <p>{item.room}</p>
              </div>
            </ListItem>
          ))}
        </Grid>
      </Center>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const items = (await fetchData())
    .filter((p) => p.room)
    .map((p) => ({
      firstName: p.student.firstName,
      lastName: p.student.lastName,
      projectName: p.name,
      room: `חדר: ${p.room}`,
      floor: `קומה: ${p.floor}`,
    }));

  return {
    props: {
      items,
      tableCaption: "שמות המציגים ומיקומי תצוגה",
      nameHeader: "סטודנט",
      projectHeader: "פרויקט",
      floorHeader: "קומה",
      roomHeader: "חדר",
    },
  };
};
