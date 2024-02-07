import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Quiz, QuizType } from "../types";
import { Box, Chip, Tooltip } from "@mui/material";
import { match } from "ts-pattern";

type QuizCardProps = Quiz & {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  id: number;
};

export const QuizCard = ({ onEdit, onDelete, ...quiz }: QuizCardProps) => {
  const { title, description, quizType } = quiz;

  const { label, color } = match<
    QuizType,
    {
      label: string;
      color: "primary" | "secondary" | "default";
    }
  >(quizType)
    .with("A_B_IMAGE", () => ({
      label: "A/B Image",
      color: "primary",
    }))
    .with("O_X_IMAGE", () => ({
      label: "O/X Image",
      color: "secondary",
    }))
    .with("O_X_SIMPLE", () => ({
      label: "O/X Simple",
      color: "default",
    }))
    .exhaustive();

  const imageUrl = match<Quiz, string[]>(quiz)
    .with({ quizType: "O_X_SIMPLE" }, () => [])
    .with({ quizType: "O_X_IMAGE" }, (quiz) => [quiz.question.imageUrl])
    .with({ quizType: "A_B_IMAGE" }, (quiz) => [
      quiz.question.buttons.A.imageUrl,
      quiz.question.buttons.B.imageUrl,
    ])
    .otherwise(() => []);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "30%",
        height: "360px",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        paddingTop: "32px",
        overflowY: "auto",
      }}
    >
      <div>
        <Chip
          sx={{
            position: "absolute",
            width: "fit-content",
            top: "8px",
            right: "8px",
          }}
          label={label}
          variant="outlined"
          color={color}
        />
      </div>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Tooltip title={title}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Tooltip>
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
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            flex: 1,
            "& img": {
              width: "100%",
              height: "170px",
              objectFit: "cover",
              borderRadius: "8px",
            },
          }}
        >
          {imageUrl?.map((url) => (
            <Box key={`${url}-${quiz.id}`}>
              <img src={url} alt="quiz" loading="lazy" />
            </Box>
          ))}
        </Box>
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
