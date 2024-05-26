/// <reference path="fourslash.ts" />
////declare const x: [(arg: number) => void, "num"] | [(arg: string) => void, "str"] | [(arg: number) => number, "num2"] = [(x: number) => {}, '/**/'];

verify.completions({ marker: "", exact: ["num"] });