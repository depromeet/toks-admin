import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Controller, FormProvider } from "react-hook-form";
import { InputTags } from "./InputTags";
import { SelectCategory } from "./SelectCategory";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateQuizFormValues } from "../types";
import { QuizTypeForm } from "./QuizTypeForm";
import { CATEGORIES, schema } from "../constants";
import { P, match } from "ts-pattern";
import { useCreateQuizMutation } from "../hooks/useCreateQuizMutation";
import { uploadS3Image } from "../../../remotes";
import { isFile, isString } from "../utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSelectedQuiz } from "../../../store";
import { useEffect } from "react";
import { useUpdateQuizMutation } from "../hooks/useUpdateQuizMutation";

export const CreateAndUpdateQuizForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const selectedQuiz = useSelectedQuiz();
  const queryClient = useQueryClient();
  const { mutateAsync: updateQuiz } = useUpdateQuizMutation();
  const { mutateAsync: createQuiz } = useCreateQuizMutation();
  const methods = useForm<CreateQuizFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      tags: [],
      question: {
        buttons: {},
        question: "",
      },
      categoryId: CATEGORIES[0].id,
      answer: undefined,
    },
  });

  const handleCreateAndUpdateSuccess = () => {
    alert(selectedQuiz ? "퀴즈가 수정되었습니다." : "퀴즈가 생성되었습니다.");
    queryClient.invalidateQueries({
      queryKey: ["quizList"],
    });
    onClose();
  };

  const onSubmit = (form: CreateQuizFormValues) => {
    const isConfirm = confirm("퀴즈를 생성하시겠습니까?");
    if (!isConfirm) {
      return;
    }

    if (!form || !form.question) {
      return;
    }

    match(form.quizType)
      .with("O_X_SIMPLE", async () => {
        const _form = {
          ...form,
          question: {
            question: form.question.question,
            buttons: {
              O: {
                button: form.question.buttons.O!.button,
              },
              X: {
                button: form.question.buttons.X!.button,
              },
            },
          },
        };

        if (selectedQuiz) {
          await updateQuiz(
            {
              id: selectedQuiz.id,
              quiz: _form,
            },
            {
              onSuccess: handleCreateAndUpdateSuccess,
            }
          );
          return;
        }
        await createQuiz(_form, {
          onSuccess: handleCreateAndUpdateSuccess,
        });
      })
      .with("O_X_IMAGE", async () => {
        const 썸네일이미지 = form.question.imageUrl ?? "";
        const imageUrl = await match(썸네일이미지)
          .with(P.when(isString), (_imageUrl) => _imageUrl)
          .with(P.when(isFile), async (file) => {
            const { imageUrl } = await uploadS3Image(file);
            return imageUrl;
          })
          .otherwise(() => "");

        if (!imageUrl) {
          alert("이미지를 업로드 해주세요.");
          return;
        }

        const _form = {
          ...form,
          question: {
            ...form.question,
            buttons: {
              O: {
                button: {
                  name: form.question.buttons.O!.button.name,
                },
              },
              X: {
                button: {
                  name: form.question.buttons.X!.button.name,
                },
              },
            },
            imageUrl,
          },
        };

        if (selectedQuiz) {
          await updateQuiz(
            {
              id: selectedQuiz.id,
              quiz: _form,
            },
            {
              onSuccess: handleCreateAndUpdateSuccess,
            }
          );
          return;
        }

        await createQuiz(_form, {
          onSuccess: handleCreateAndUpdateSuccess,
        });
      })
      .with("A_B_IMAGE", async () => {
        const A이미지 = form.question.buttons.A?.imageUrl ?? "";
        const B이미지 = form.question.buttons.B?.imageUrl ?? "";

        const AimageUrl = await match(A이미지)
          .with(P.when(isString), (_imageUrl) => _imageUrl)
          .with(P.when(isFile), async (file) => {
            const { imageUrl } = await uploadS3Image(file);
            return imageUrl;
          })
          .otherwise(() => "");

        const BimageUrl = await match(B이미지)
          .with(P.when(isString), (_imageUrl) => _imageUrl)
          .with(P.when(isFile), async (file) => {
            const { imageUrl } = await uploadS3Image(file);
            return imageUrl;
          })
          .otherwise(() => "");

        if (!AimageUrl || !BimageUrl) {
          alert("이미지를 업로드 해주세요.");
          return;
        }

        const _form = {
          ...form,
          question: {
            ...form.question,
            buttons: {
              A: {
                button: form.question.buttons.A!.button,
                imageUrl: AimageUrl,
              },
              B: {
                button: form.question.buttons.B!.button,
                imageUrl: BimageUrl,
              },
            },
          },
        };

        if (selectedQuiz) {
          await updateQuiz(
            {
              id: selectedQuiz.id,
              quiz: _form,
            },
            {
              onSuccess: handleCreateAndUpdateSuccess,
            }
          );
          return;
        }

        await createQuiz(_form, {
          onSuccess: handleCreateAndUpdateSuccess,
        });
      });
  };

  useEffect(() => {
    if (selectedQuiz) {
      methods.reset(selectedQuiz);
    }
  }, [selectedQuiz]);

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
        <Typography variant="subtitle1">
          {selectedQuiz ? "퀴즈 수정하기" : "퀴즈 생성하기"}
        </Typography>
      </DrawerHeader>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
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
            error={!!methods.formState.errors.title}
            helperText={methods.formState.errors.title?.message}
            {...methods.register("title", { required: true })}
          />
          <Controller
            control={methods.control}
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
            control={methods.control}
            name="quizType"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                aria-labelledby="quiz-type-label"
                defaultValue={value}
                value={value ?? null}
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
          <QuizTypeForm />
          <Box
            sx={{
              padding: "8px 0",
              display: "flex",
              alignItems: "stretch",
              gap: "8px",
            }}
          >
            <TextField
              sx={{
                flex: 1,
              }}
              label="상세 페이지 제목"
              variant="filled"
              required
              margin="dense"
              {...methods.register("question.question", { required: true })}
            />
            <Button
              variant="outlined"
              onClick={() => {
                methods.setValue(
                  "question.question",
                  methods.getValues("title")
                );
              }}
            >
              퀴즈 제목 동일
            </Button>
          </Box>
          <TextField
            fullWidth
            label="상세 페이지 설명()"
            variant="filled"
            margin="dense"
            multiline
            rows={4}
            {...methods.register("description")}
          />
          <Controller
            control={methods.control}
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
            {selectedQuiz ? "퀴즈 수정하기" : "퀴즈 생성하기"}
          </Button>
        </Box>
      </FormProvider>
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
