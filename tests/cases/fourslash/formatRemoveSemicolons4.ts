/// <reference path="fourslash.ts" />

////declare const opt: number | undefined;
////
////const a = 1;
////const b = 2;
////;[1, 2, 3]
////
////const c = opt ? 1 : 2;
////const d = opt ? 1 : 2;
////;[1, 2, 3]
////
////const e = opt ?? 1;
////const f = opt ?? 1;
////;[1, 2, 3]
////
////type a = 1;
////type b = 2;
////;[1, 2, 3]
////
////type c = typeof opt extends 1 ? 1 : 2;
////type d = typeof opt extends 1 ? 1 : 2;
////;[1, 2, 3]

format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Remove });
format.document();
verify.currentFileContentIs(
`declare const opt: number | undefined

const a = 1
const b = 2
;[1, 2, 3]

const c = opt ? 1 : 2
const d = opt ? 1 : 2
;[1, 2, 3]

const e = opt ?? 1
const f = opt ?? 1
;[1, 2, 3]

type a = 1
type b = 2
;[1, 2, 3]

type c = typeof opt extends 1 ? 1 : 2
type d = typeof opt extends 1 ? 1 : 2
;[1, 2, 3]`);
