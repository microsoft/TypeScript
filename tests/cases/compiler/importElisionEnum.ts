// @Filename: enum.ts
export enum MyEnum {
  a = 0,
  b,
  c,
  d
}

// @Filename: index.ts
import { MyEnum as MyEnumFromModule } from "./enum";

const x = MyEnumFromModule.a;

enum MyEnum {
  a = MyEnumFromModule.a
}