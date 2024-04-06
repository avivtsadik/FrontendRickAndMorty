import React from "react";
import CharacterList from "../../components/CharactersList/charactersList";
import WithLogHoc from "../../components/WithLogHoc";

const Home: React.FC = () => {
  return <CharacterList />;
};
export default WithLogHoc(Home);
