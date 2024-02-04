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
import { CreateQuizFormValues, Quiz } from "../types";
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
      title: "",
      tags: [],
      question: {
        buttons: {
          O: {
            button: {
              name: "",
            },
            imageUrl: undefined,
          },
          X: {
            button: {
              name: "",
            },
            imageUrl: undefined,
          },
        },
      },
      categoryId: CATEGORIES[0].id,
    },
  });
  const { mutateAsync: createQuiz } = useCreateQuizMutation();
  const { quizType: watchQuizType } = useWatch({
    control,
  });
  const onSubmit = async (form: CreateQuizFormValues) => {
    match(form.quizType)
      .with("O_X_SIMPLE", async () => {
        const _question: Quiz = {
          ...form,
          quizType: "O_X_SIMPLE",
        };
        await createQuiz(_question);
      })
      .with("O_X_IMAGE", async () => {
        let s3Url: string = "";
        const imageFile = form.question.imageUrl ?? "";
        if (imageFile) {
          const { imageUrl } = await uploadS3Image(imageFile);
          s3Url = imageUrl;
        }
        const _question: Quiz = {
          ...form,
          question: {
            ...form.question,
            imageUrl: s3Url,
          },
          quizType: "O_X_IMAGE",
        };
        await createQuiz(_question);
      })
      .with("A_B_IMAGE", async () => {
        let O이미지URL: string = "";
        let X이미지URL: string = "";
        const O이미지 = form.question.buttons.O.imageUrl ?? "";
        const X이미지 = form.question.buttons.X.imageUrl ?? "";
        if (O이미지) {
          const { imageUrl } = await uploadS3Image(O이미지);
          O이미지URL = imageUrl;
        }

        if (X이미지) {
          const { imageUrl } = await uploadS3Image(X이미지);
          X이미지URL = imageUrl;
        }

        const _question: Quiz = {
          ...form,
          question: {
            ...form.question,
            buttons: {
              A: {
                imageUrl: O이미지URL,
                button: {
                  ...form.question.buttons.O.button,
                },
              },
              B: {
                imageUrl: X이미지URL,
                button: {
                  ...form.question.buttons.X.button,
                },
              },
            },
          },
          quizType: "A_B_IMAGE",
        };
        await createQuiz(_question);
      })
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
            {...register("question.buttons.O.button.name")}
          />
          <UploadButton
            label="A 이미지 업로드하기"
            {...register("question.buttons.O.imageUrl", {
              required: true,
            })}
          />
          <TextField
            margin="dense"
            sx={{
              width: 1,
            }}
            label="B 버튼 명"
            helperText="버튼 B에 나타 낼 텍스트를 보여줍니다."
            {...register("question.buttons.X.button.name")}
          />
          <UploadButton
            label="B 이미지 업로드하기"
            {...register("question.buttons.X.imageUrl", {
              required: true,
            })}
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
            {...register("question.buttons.O.button.name")}
          />
          <UploadButton
            label="O 이미지 업로드하기"
            {...register("question.buttons.O.imageUrl", { required: true })}
          />
          <TextField
            margin="dense"
            label="X 버튼 명"
            sx={{
              width: 1,
            }}
            helperText="버튼 X에 나타 낼 텍스트를 보여줍니다."
            {...register("question.buttons.X.button.name")}
          />
          <UploadButton
            label="X 이미지 업로드하기"
            {...register("question.buttons.X.imageUrl", {
              required: true,
            })}
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
            {...register("question.buttons.O.button.name")}
          />
          <TextField
            label="X 버튼 명"
            sx={{
              width: 1,
            }}
            helperText="버튼 X에 나타 낼 텍스트를 보여줍니다."
            {...register("question.buttons.X.button.name")}
          />
        </>
      ))
      .otherwise(() => <FormLabel>퀴즈 타입을 선택해주세요.</FormLabel>);

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
