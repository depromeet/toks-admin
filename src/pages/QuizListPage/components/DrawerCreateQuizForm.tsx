import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useForm, Controller, useWatch } from "react-hook-form";
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
import { match } from "ts-pattern";
import { UploadButton } from "./UploadButton";
import { useCreateQuizMutation } from "../hooks/useCreateQuizMutation";
import { uploadS3Image } from "../../../remotes";

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
  const { mutate: createQuiz } = useCreateQuizMutation();
  const { quizType: watchQuizType } = useWatch({
    control,
  });
  const onSubmit = async (form: CreateQuizFormValues) => {
    const { quizType } = form;

    match(quizType)
      .with("A_B_IMAGE", () => {})
      .with("O_X_IMAGE", async () => {
        let s3Url: string = "";
        const imageFile = form.questions.imageUrl ?? "";
        if (imageFile) {
          const { imageUrl } = await uploadS3Image(imageFile);
          s3Url = imageUrl;
        }

        await createQuiz({
          ...form,
          quizType: "O_X_IMAGE",
          question: {
            ...form.questions,
            imageUrl: s3Url,
          },
        });
      })
      .with("O_X_SIMPLE", () => {})
      .exhaustive();
  };

  const renderQuizTypeForm = () =>
    match(watchQuizType)
      .with("A_B_IMAGE", () => (
        <>
          <TextField
            sx={{
              width: 1,
            }}
            margin="dense"
            label="A 버튼 명"
            helperText="버튼 A에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.A.button.name")}
          />
          <UploadButton
            label="A 이미지 업로드하기"
            {...register("questions.buttons.A.imageUrl")}
          />
          <TextField
            margin="dense"
            sx={{
              width: 1,
            }}
            label="B 버튼 명"
            helperText="버튼 B에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.B.button.name")}
          />
          <UploadButton
            label="B 이미지 업로드하기"
            {...register("questions.buttons.B.imageUrl")}
          />
        </>
      ))
      .with("O_X_IMAGE", () => (
        <>
          <TextField
            margin="dense"
            sx={{
              width: 1,
            }}
            label="O 버튼 명"
            helperText="O 버튼에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.O.button.name")}
          />
          <UploadButton
            label="O 이미지 업로드하기"
            {...register("questions.buttons.O.imageUrl")}
          />
          <TextField
            margin="dense"
            label="X 버튼 명"
            sx={{
              width: 1,
            }}
            helperText="버튼 X에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.X.button.name")}
          />
          <UploadButton
            label="X 이미지 업로드하기"
            {...register("questions.buttons.X.imageUrl")}
          />
        </>
      ))
      .with("O_X_SIMPLE", () => (
        <>
          <TextField
            sx={{
              width: 1,
            }}
            label="O 버튼 명"
            helperText="버튼 O에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.O.button.name")}
          />
          <TextField
            label="X 버튼 명"
            sx={{
              width: 1,
            }}
            helperText="버튼 X에 나타 낼 텍스트를 보여줍니다."
            {...register("questions.buttons.X.button.name")}
          />
        </>
      ))
      .otherwise(() => `Unexpected quizType`);

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
        {renderQuizTypeForm()}
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
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
