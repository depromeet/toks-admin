import { Controller, useForm } from "react-hook-form";
import { CreateBannerFormValues } from "../types";
import { Box, Button, TextField } from "@mui/material";
import { UploadButton } from "../../QuizListPage/components/UploadButton";
import { uploadS3Image } from "../../../remotes";
import { useCreateBannerMutation } from "../hooks/useCreateBannerMutation";

export const CreateAndUpdateBannerForm = () => {
  const { register, handleSubmit, formState, control, reset } =
    useForm<CreateBannerFormValues>();
  const { mutateAsync } = useCreateBannerMutation();

  const onSubmit = async (formValue: CreateBannerFormValues) => {
    const { imageUrl: bannerImageUrl } = formValue;
    if (!bannerImageUrl) {
      return;
    }

    let s3ImageUrl = "";
    try {
      const { imageUrl } = await uploadS3Image(bannerImageUrl);
      s3ImageUrl = imageUrl;
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    }

    await mutateAsync({
      ...formValue,
      imageUrl: s3ImageUrl,
      seq: 1,
      isActive: true,
    });

    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "480px",
      }}
    >
      <h2>배너 생성하기</h2>
      <TextField
        fullWidth
        label="이미지 제목(UI 표시x alt로 들어갑니다)"
        variant="filled"
        required
        margin="dense"
        error={!!formState.errors.title}
        helperText={formState.errors.title?.message}
        {...register("title", { required: "필수 값 이에요." })}
      />
      <TextField
        fullWidth
        label="하이퍼링크 URL(배너 클릭시 이동할 URL)"
        variant="filled"
        required
        margin="dense"
        error={!!formState.errors.landingUrl}
        helperText={formState.errors.landingUrl?.message}
        {...register("landingUrl", { required: "필수 값 이에요." })}
      />
      <Controller
        control={control}
        name="imageUrl"
        render={({ field: { onChange, value } }) => (
          <UploadButton
            label="배너 이미지 업로드하기"
            value={value}
            onChange={(e) => {
              if (e.target.files) {
                onChange(e.target.files[0]);
              }
            }}
          />
        )}
      />
      <Button type="submit" variant="contained">
        생성하기
      </Button>
    </Box>
  );
};
