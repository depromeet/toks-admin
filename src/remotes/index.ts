import { http } from "../utils/http";

export const uploadS3Image = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await http.post<{ imageUrl: string }>("/api/v1/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
