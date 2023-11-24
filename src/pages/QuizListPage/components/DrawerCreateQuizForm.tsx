import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { CreateQuizFormValues } from "../types";
import { SelectCategory } from "./SelectCategory";
import { CATEGORIES } from "../constants";
import Button from "@mui/material/Button";
import { InputTags } from "./InputTags";

export const DrawerCreateQuizForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const { register, control, handleSubmit } = useForm<CreateQuizFormValues>({
    defaultValues: {
      tags: [],
      categoryId: CATEGORIES[0].id,
      quizType: "A_B_IMAGE",
    },
  });

  const onSubmit = (data: CreateQuizFormValues) => {
    console.log(data);
  };

  return (
    <Drawer
      sx={{
        width: "600px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "600px",
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="subtitle1">퀴즈 생성</Typography>
      </DrawerHeader>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          padding: "16px",
        }}
        noValidate
      >
        <TextField
          fullWidth
          label="제목"
          variant="filled"
          required
          margin="dense"
          {...register("title", { required: true })}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <InputTags value={value} onChange={onChange} />
          )}
        />
        <FormLabel
          sx={{
            marginTop: "16px",
            marginBottom: "8px",
          }}
        >
          퀴즈 타입
        </FormLabel>
        <Controller
          control={control}
          name="quizType"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              aria-labelledby="quiz-type-label"
              defaultValue={value}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            >
              <FormControlLabel
                value="A_B_IMAGE"
                control={<Radio />}
                label="A/B퀴즈 이미지O"
              />
              <FormControlLabel
                value="A_B_SIMPLE"
                control={<Radio />}
                label="A/B퀴즈 이미지x"
              />
              <FormControlLabel
                value="O_X_IMAGE"
                control={<Radio />}
                label="O/X퀴즈 이미지O"
              />
              <FormControlLabel
                value="O_X_SIMPLE"
                control={<Radio />}
                label="O/X퀴즈 이미지X"
              />
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value, name } }) => (
            <SelectCategory name={name} value={value} onChange={onChange} />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "16px",
            width: "100%",
          }}
        >
          퀴즈 생성하기
        </Button>
      </Box>
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
