import * as React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Character, { ICharacterProps } from "../character";
import { useCharactersList } from "./charactersList.module";
import { enqueueSnackbar } from "notistack";
import Loader from "../loader";
import SearchBar from "../searchBar";
import "./charactersList.css";
import { useMemo } from "react";
const containerCharacterListSx = {
  padding: "20px",
  boxShadow: "10",
  maxWidth: "calc(100vw - 70px)",
  maxHeight: "calc(100vh - 70px)",
  overflowY: "auto",
};

interface ICharactersProps extends ICharacterProps {
  id: number;
}

const CharacterList: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    filterText,
    setFilterText,
    authCompleteData
  } = useCharactersList();

  if (status === "error" && error) {
    enqueueSnackbar("An error has occurred " + error.message, {
      variant: "error",
    });
  }

  return (
    <>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        authCompleteData={authCompleteData}
      />
      <Loader isLoading={status === "pending"}>
        {data ? (
          <Container sx={containerCharacterListSx} className="searchBar">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 6, md: 12, lg: 12 }}
            >
              {data.pages.map((group, i) =>
                group?.data.map((data: ICharactersProps, index: number) => {
                  return (
                    <Grid
                      key={data.id + "" + index}
                      item
                      xs={2}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <Character
                        name={data.name}
                        species={data.species}
                        image={data.image}
                        numOfEpisodes={data.numOfEpisodes}
                        status={data.status}
                        currentLocation={data.currentLocation}
                      />
                    </Grid>
                  );
                })
              )}
              {hasNextPage && (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  sx={{ mt: "10px", position: "relative", left: "50%" }}
                >
                  {isFetchingNextPage ? "Loading more..." : "Load More"}
                </Button>
              )}
            </Grid>
          </Container>
        ) : (
          <Typography variant="h6">No results found...</Typography>
        )}
      </Loader>
    </>
  );
};
export default CharacterList;
