import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { StatusValues } from "../utils/generalEnums";
import ChildrenGuard from "../Guards/ChildrenGuard";

export interface ICharacterProps {
  name: string;
  status: StatusValues;
  species: string;
  currentLocation?: string;
  image: string;
  numOfEpisodes: number;
}

interface IStatus {
  bgcolor: string;
  text: StatusValues;
}

const Character: React.FC<ICharacterProps> = ({
  name,
  status,
  species,
  currentLocation,
  image,
  numOfEpisodes,
}: ICharacterProps) => {
  const mapStatus = new Map<StatusValues, IStatus>([
    [StatusValues.ALIVE, { bgcolor: "lightgreen", text: StatusValues.ALIVE }],
    [StatusValues.DEAD, { bgcolor: "red", text: StatusValues.DEAD }],
    [StatusValues.UNKNOWN, { bgcolor: "gray", text: StatusValues.UNKNOWN }],
  ]);
  const statusData = mapStatus.get(status);

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        avatar={
          statusData ? (
            <Avatar sx={{ bgcolor: statusData.bgcolor }} aria-label="recipe">
              <Typography
                variant="caption"
                sx={{ fontSize: "9px" }}
                color="text.secondary"
              >
                {statusData.text}
              </Typography>
            </Avatar>
          ) : null
        }
        title={name}
        subheader={species}
      />
      <CardMedia component="img" height="194" image={image} />
      <CardContent>
        <Typography variant="body2">
          Number of episodes: {numOfEpisodes}
        </Typography>
        <ChildrenGuard showChildren={!!currentLocation}>
          <Typography variant="body2">
            Current location: {currentLocation}
          </Typography>
        </ChildrenGuard>
      </CardContent>
    </Card>
  );
};
export default Character;
