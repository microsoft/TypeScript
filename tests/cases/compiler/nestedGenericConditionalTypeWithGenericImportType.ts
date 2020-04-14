// #31824

// @filename: name.ts
export type Name<T> = any;

// @filename: index.ts
type T<X> = any extends ((any extends any ? any : string) extends any ? import("./name").Name<X> : any)
  ? any
  : any;
