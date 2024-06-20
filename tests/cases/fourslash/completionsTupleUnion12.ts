/// <reference path="fourslash.ts" />
////declare const x: [(arg: number) => void, "num"] | [(arg: string) => void, "str"] | [(arg: boolean) => boolean, "val"] = [() => {}, '/**/'];

verify.completions({ marker: "", exact: ["num", "str"] });