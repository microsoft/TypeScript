/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|type Props = {
////    a: number;
////}
////class Foo {
////    readonly a: number;
////    constructor({ a }: Props) {
////        this.a = a;
////    }
////}|]
////
////export default function f() {
////    return new Foo({ a: 1 });
////}

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { Foo } from "./Foo";

export default function f() {
    return new Foo({ a: 1 });
}`,

        "/Foo.ts":
`type Props = {
    a: number;
};
export class Foo {
    readonly a: number;
    constructor({ a }: Props) {
        this.a = a;
    }
}
`,
    },
});
