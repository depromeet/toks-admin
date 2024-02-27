import { Paginator } from "../../types";
import { Banner } from "./components/Banner";
export type Banner = {
  id: number;
  title: string;
  seq: number;
  imageUrl: string;
  landingUrl: string;
  isActive: boolean;
};

export type BannerResponse = Paginator<Banner>;
export type CreateBannerRequest = Omit<Banner, "id">;
export type CreateBannerFormValues = Omit<Banner, "id" | "imageUrl"> & {
  imageUrl: File;
};
