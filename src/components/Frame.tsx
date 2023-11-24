import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useWindowSize } from "usehooks-ts";
import styled from "@emotion/styled";

export const Frame = () => {
  const { width, height } = useWindowSize();
  return (
    <StyledFrame
      style={{
        width: width,
        height: height,
      }}
    >
      <Header />
      <Outlet />
    </StyledFrame>
  );
};

const StyledFrame = styled("div")``;
