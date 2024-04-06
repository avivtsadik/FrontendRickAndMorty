import * as React from "react";
import { Autocomplete, InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface ISearchContext {
  authCompleteData: string[];
  filterText: string;
  setFilterText: (filterText: string) => void;
}
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchBar: React.FC<ISearchContext> = ({
  filterText,
  setFilterText,
  authCompleteData,
}) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        freeSolo
        onInputChange={(event: React.ChangeEvent<{}>, value: string) =>
          setFilterText(value)
        }
        options={authCompleteData}
        renderInput={(params) => (
          <StyledInputBase
            {...params.InputProps}
            placeholder="Search…"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            inputProps={{ ...params.inputProps, "aria-label": "search" }}
          />
        )}
      />
    </Search>
  );
};
export default SearchBar;
