import { Box } from "@mui/material";
import { useBannersQuery } from "../hooks/useBannersQuery";
import { Banner } from "./Banner";
import { Banner as BannerType } from "../types";
import { useDeleteBannerMutation } from "../hooks/useDeleteBannerMutation";
import { useUpdateBannerMutation } from "../hooks/useUpdateBannerMutation";

export const BannerList = ({ width }: { width: number }) => {
  const { data: pagination } = useBannersQuery();
  const { mutateAsync: removeBanner } = useDeleteBannerMutation();
  const { mutateAsync: toggleBanner, isPending } = useUpdateBannerMutation();

  const handleDelete = (bannerId: number) => async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) {
      return;
    }
    await removeBanner(bannerId);
  };

  const handleToggle = (banner: BannerType) => () => {
    toggleBanner({
      ...banner,
      isActive: !banner.isActive,
    });
  };

  const sameSequenceCountList = pagination?.sameSequenceCountList || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "480px",
        width: `${width}px`,
        minWidth: "320px",
        height: "80%",
        overflowY: "auto",
      }}
    >
      {pagination.content?.map((banner) => (
        <Banner
          key={banner.id}
          onRemoveButtonClick={handleDelete(banner.id)}
          onToggleButtonClick={handleToggle(banner)}
          isPending={isPending}
          isSameSequence={sameSequenceCountList.includes(banner.seq)}
          {...banner}
        />
      ))}
    </Box>
  );
};
