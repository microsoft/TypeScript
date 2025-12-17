/// <reference path='fourslash.ts' />

//// const b = "foo";
////
//// const t = {
////   a: 1,
////   b,
//// };
////
//// type InferedT = typeof t;
////
//// class InferedTClass implements InferedT {}

verify.codeFix({
    description: "Implement interface 'InferedT'",
    newFileContent:
`const b = "foo";

const t = {
  a: 1,
  b,
};

type InferedT = typeof t;

class InferedTClass implements InferedT {
    a: number;
    b: string;
}`,
});
