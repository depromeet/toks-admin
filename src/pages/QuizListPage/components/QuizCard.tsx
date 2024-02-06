import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Quiz } from "../types";
import { Tooltip } from "@mui/material";

type QuizCardProps = Quiz & {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  id: number;
};

export const QuizCard = ({
  title,
  description,
  onEdit,
  onDelete,
}: QuizCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "23%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1" gutterBottom>
          {title}
        </Typography>
        <Tooltip title={description}>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {description}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions
        sx={{
          marginTop: "auto",
        }}
      >
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
