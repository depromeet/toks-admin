export const isString = (x: any): x is string => typeof x === "string";
export const isFile = (x: any): x is File =>
  typeof x === "object" && x instanceof File;
