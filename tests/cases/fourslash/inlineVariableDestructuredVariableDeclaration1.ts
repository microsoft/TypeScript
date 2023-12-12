/// <reference path="fourslash.ts" />

////export function Component(props: any) {
////    const { foo } = /*a*/props/*b*/;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");
