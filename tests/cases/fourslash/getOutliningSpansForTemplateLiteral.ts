/// <reference path="fourslash.ts"/>

//// declare function tag(...args: any[]): void
//// const a = [|`signal line`|]
//// const b = [|`multi
//// line`|]
//// const c = tag[|`signal line`|]
//// const d = tag[|`multi
//// line`|]
//// const e = [|`signal ${1} line`|]
//// const f = [|`multi
//// ${1}
//// line`|]
//// const g = tag[|`signal ${1} line`|]
//// const h = tag[|`multi
//// ${1}
//// line`|]
//// const i = ``

verify.outliningSpansInCurrentFile(test.ranges());
