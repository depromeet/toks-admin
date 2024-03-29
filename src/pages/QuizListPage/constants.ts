import { z } from "zod";
import { Categories } from "./types";

export const CATEGORIES: Categories[] = [
  {
    id: "100000",
    depth: 1,
    name: "개발",
    description: "개발",
  },
  {
    id: "101000",
    depth: 2,
    name: "웹 개발",
    description: "웹 개발",
  },
  {
    id: "102000",
    depth: 2,
    name: "React",
    description: "리엑트",
  },
  {
    id: "103000",
    depth: 2,
    name: "Python",
    description: "파이썬",
  },
  {
    id: "104000",
    depth: 2,
    name: "Android",
    description: "안드로이드",
  },
  {
    id: "105000",
    depth: 2,
    name: "빅데이터",
    description: "빅데이터",
  },
  {
    id: "106000",
    depth: 2,
    name: "JavaScript",
    description: "자바스크립트",
  },
  {
    id: "107000",
    depth: 2,
    name: "TypeScript",
    description: "타입스크립트",
  },
  {
    id: "108000",
    depth: 2,
    name: "Vue.js",
    description: "뷰",
  },
  {
    id: "109000",
    depth: 2,
    name: "Svelte",
    description: "스벨트",
  },
  {
    id: "110000",
    depth: 2,
    name: "Next.js",
    description: "넥스트제이에스",
  },
  {
    id: "111000",
    depth: 2,
    name: "Node.js",
    description: "노드제이에스",
  },
  {
    id: "112000",
    depth: 2,
    name: "Java",
    description: "자바",
  },
  {
    id: "113000",
    depth: 2,
    name: "Spring",
    description: "스프링",
  },
  {
    id: "114000",
    depth: 2,
    name: "GO",
    description: "고",
  },
  {
    id: "200000",
    depth: 1,
    name: "디자인",
    description: "디자인",
  },
  {
    id: "201000",
    depth: 2,
    name: "일반 디자인",
    description: "일반 디자인",
  },
  {
    id: "202000",
    depth: 2,
    name: "인스퍼레이션",
    description: "인스퍼레이션",
  },
  {
    id: "203000",
    depth: 2,
    name: "UI/UX",
    description: "UI/UX",
  },
  {
    id: "204000",
    depth: 2,
    name: "브랜드 디자인",
    description: "브랜드 디자인",
  },
  {
    id: "205000",
    depth: 2,
    name: "타이포그래피",
    description: "타이포그래피",
  },
  {
    id: "300000",
    depth: 1,
    name: "기획",
    description: "기획",
  },
  {
    id: "301000",
    depth: 2,
    name: "프로덕트 관리",
    description: "프로덕트 관리",
  },
  {
    id: "302000",
    depth: 2,
    name: "일반 기획",
    description: "일반 기획",
  },
  {
    id: "303000",
    depth: 2,
    name: "서비스 기획",
    description: "서비스 기획",
  },
  {
    id: "304000",
    depth: 2,
    name: "전략 기획",
    description: "전략 기획",
  },
  {
    id: "305000",
    depth: 2,
    name: "데이터 분석",
    description: "데이터 분석",
  },
  {
    id: "400000",
    depth: 1,
    name: "마케팅",
    description: "마케팅",
  },
  {
    id: "401000",
    depth: 2,
    name: "일반 마케팅",
    description: "일반 마케팅",
  },
  {
    id: "402000",
    depth: 2,
    name: "브랜드 마케팅",
    description: "브랜드 마케팅",
  },
  {
    id: "403000",
    depth: 2,
    name: "그로스 마케팅",
    description: "그로스 마케팅",
  },
  {
    id: "404000",
    depth: 2,
    name: "콘텐츠 마케팅",
    description: "콘텐츠 마케팅",
  },
];

export const schema = z.object({
  title: z.string(),
  tags: z.string().array().default([]),
  categoryId: z.string().default(""),
  question: z.object({
    question: z.string(),
    imageUrl: z.union([z.string(), z.custom<File>()]).optional(),
    buttons: z.object({
      A: z
        .object({
          imageUrl: z.union([z.string(), z.custom<File>()]).optional(),
          button: z.object({
            name: z.string(),
          }),
        })
        .optional(),
      B: z
        .object({
          imageUrl: z.union([z.string(), z.custom<File>()]).optional(),
          button: z.object({
            name: z.string(),
          }),
        })
        .optional(),
      O: z
        .object({
          imageUrl: z.union([z.string(), z.custom<File>()]).optional(),
          button: z.object({
            name: z.string(),
          }),
        })
        .optional(),
      X: z
        .object({
          imageUrl: z.union([z.string(), z.custom<File>()]).optional(),
          button: z.object({
            name: z.string(),
          }),
        })
        .optional(),
    }),
  }),
  quizType: z
    .union([
      z.literal("A_B_IMAGE"),
      z.literal("O_X_IMAGE"),
      z.literal("O_X_SIMPLE"),
    ])
    .default("A_B_IMAGE"),
  description: z.string().optional(),
  answer: z.union([z.literal("O"), z.literal("X")]).optional(),
});
