import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useWindowSize } from "usehooks-ts";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../pages/constants";

export const Frame = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = sessionStorage.getItem("token") === AUTH_TOKEN;
    if (!isToken) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <StyledFrame
      style={{
        width: width,
        height: `calc(${height}px - 80px)`,
      }}
    >
      <Header />
      <Outlet />
    </StyledFrame>
  );
};

const StyledFrame = styled("div")``;
