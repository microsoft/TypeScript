//// [tests/cases/compiler/declarationEmitPathMappingMonorepo.ts] ////

//// [index.d.ts]
declare module "@ts-bug/a" {
    export type AText = {
      value: string;
    };
    export function a(text: string): AText;
  }
  
//// [index.ts]
import { a } from "@ts-bug/a";

export function b(text: string) {
  return a(text);
}

//// [index.js]
import { a } from "@ts-bug/a";
export function b(text) {
    return a(text);
}


//// [index.d.ts]
export declare function b(text: string): import("@ts-bug/a").AText;
