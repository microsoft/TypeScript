/// <reference path='fourslash.ts' />
// @filename: duplicate.ts

////let [|sub|];
////sub?.();
////sub = () => {};

verify.codeFix({
  index: 0,
  description: [ts.Diagnostics.Infer_type_of_0_from_usage.message, 'sub'],
  newFileContent:
`let sub: () => void;
sub?.();
sub = () => {};`
});
