import { useWindowSize } from "usehooks-ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

export const LoginPage = () => {
  const { width, height } = useWindowSize();
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const _token = formData.get("authToken") as string;
    const accessToken = import.meta.env.VITE_ADMIN_TOKEN ?? "";
    if (_token !== AUTH_TOKEN) {
      setErrorText("인증 토큰이 틀렸습니다.");
      return;
    }

    if (!accessToken) {
      setErrorText("env 파일에 ADMIN_TOKEN을 설정해주세요.");
      return;
    }

    sessionStorage.setItem("token", _token);
    sessionStorage.setItem("accessToken", accessToken);
    navigate("/quiz", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          border: "white 1px solid",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.primary",
          }}
        >
          TOKS BackOffice
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              onFocus={() => {
                setErrorText("");
              }}
              sx={{ marginTop: "16px" }}
              label="인증토큰"
              name="authToken"
              helperText={errorText}
              error={Boolean(errorText)}
            />
            <Button variant="contained" color="info" type="submit">
              <Typography
                sx={{
                  color: "text.primary",
                }}
              >
                로그인
              </Typography>
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
