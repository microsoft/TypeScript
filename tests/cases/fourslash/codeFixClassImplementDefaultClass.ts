/// <reference path='fourslash.ts' />

////interface I { x: number; }
////export default class implements I {[| |]}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I { x: number; }
export default class implements I {
    x: number;
}`,
});
