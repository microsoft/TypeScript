/// <reference path="fourslash.ts" />

//// declare function pick<T, K extends keyof T>(keys: K[], obj: T): Pick<T, K>;
//// const { /**/ } = pick(['b'], { a: 'a', b: 'b' });

verify.completions({
  marker: "",
  exact: ["b"]
});
