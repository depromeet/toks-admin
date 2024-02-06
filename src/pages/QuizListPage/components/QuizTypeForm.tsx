import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { match } from "ts-pattern";
import { UploadButton } from "./UploadButton";
import { Controller, useFormContext } from "react-hook-form";
import { CreateQuizFormValues } from "../types";

export const QuizTypeForm = () => {
  const { register, watch, control, formState } =
    useFormContext<CreateQuizFormValues>();
  const quizType = watch("quizType");

  return match(quizType)
    .with("A_B_IMAGE", () => (
      <>
        <TextField
          sx={{
            width: 1,
          }}
          margin="dense"
          label="A 버튼 명"
          helperText="버튼 A에 나타 낼 텍스트를 보여줍니다."
          {...register("question.buttons.A.button.name")}
        />
        <Controller
          control={control}
          name="question.buttons.A.imageUrl"
          render={({ field: { onChange, value } }) => (
            <>
              <UploadButton
                label="A 이미지 업로드하기"
                value={value}
                onChange={(e) => {
                  if (e.target.files) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
              {formState.errors.question?.buttons?.A?.imageUrl && (
                <FormLabel error>
                  {formState.errors.question?.buttons?.A?.imageUrl.message}
                </FormLabel>
              )}
            </>
          )}
        />
        <TextField
          margin="dense"
          sx={{
            width: 1,
          }}
          label="B 버튼 명"
          error={Boolean(formState.errors.question?.buttons?.B?.button?.name)}
          helperText={
            formState.errors.question?.buttons?.B?.button?.name?.message
          }
          {...register("question.buttons.B.button.name")}
        />
        <Controller
          control={control}
          name="question.buttons.B.imageUrl"
          render={({ field: { onChange, value } }) => (
            <>
              <UploadButton
                label="B 이미지 업로드하기"
                value={value}
                onChange={(e) => {
                  if (e.target.files) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
              {formState.errors.question?.buttons?.B?.imageUrl && (
                <FormLabel error>
                  {formState.errors.question?.buttons?.B?.imageUrl.message}
                </FormLabel>
              )}
            </>
          )}
        />
      </>
    ))
    .with("O_X_IMAGE", () => (
      <>
        <Controller
          control={control}
          name="question.imageUrl"
          render={({ field: { onChange, value } }) => (
            <>
              <UploadButton
                label="이미지 업로드하기"
                value={value}
                onChange={(e) => {
                  if (e.target.files) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
              {formState.errors.question?.imageUrl && (
                <FormLabel error>
                  {formState.errors.question?.imageUrl.message}
                </FormLabel>
              )}
            </>
          )}
        />
        <TextField
          margin="dense"
          sx={{
            width: 1,
          }}
          label="O 버튼 명"
          error={Boolean(formState.errors.question?.buttons?.O?.button?.name)}
          helperText={
            formState.errors.question?.buttons?.O?.button?.name?.message
          }
          {...register("question.buttons.O.button.name", {
            required: "O 버튼 명을 입력해주세요.",
          })}
        />
        <TextField
          margin="dense"
          label="X 버튼 명"
          sx={{
            width: 1,
          }}
          error={Boolean(formState.errors.question?.buttons?.X?.button?.name)}
          helperText={
            formState.errors.question?.buttons?.X?.button?.name?.message
          }
          {...register("question.buttons.X.button.name", {
            required: "X 버튼 명을 입력해주세요.",
          })}
        />
        <Controller
          control={control}
          name="answer"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              aria-labelledby="answer-label"
              defaultValue={value}
              value={value ?? null}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            >
              <FormControlLabel value="O" control={<Radio />} label="O(A)" />
              <FormControlLabel value="X" control={<Radio />} label="X(B)" />
            </RadioGroup>
          )}
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
          error={Boolean(formState.errors.question?.buttons?.O?.button?.name)}
          helperText={
            formState.errors.question?.buttons?.O?.button?.name?.message
          }
          {...register("question.buttons.O.button.name", {
            required: "O 버튼 명을 입력해주세요.",
          })}
        />
        <TextField
          label="X 버튼 명"
          sx={{
            width: 1,
          }}
          error={Boolean(formState.errors.question?.buttons?.X?.button?.name)}
          helperText={
            formState.errors.question?.buttons?.X?.button?.name?.message
          }
          {...register("question.buttons.X.button.name", {
            required: "X 버튼 명을 입력해주세요.",
          })}
        />
        <Controller
          control={control}
          name="answer"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              aria-labelledby="answer-label"
              defaultValue={value}
              value={value ?? null}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            >
              <FormControlLabel value="O" control={<Radio />} label="O(A)" />
              <FormControlLabel value="X" control={<Radio />} label="X(B)" />
            </RadioGroup>
          )}
        />
      </>
    ))
    .otherwise(() => <FormLabel>퀴즈 타입을 선택해주세요.</FormLabel>);
};
