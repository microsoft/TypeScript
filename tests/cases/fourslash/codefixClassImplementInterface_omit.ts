/// <reference path="fourslash.ts" />

////interface One {
////    a: number;
////    b: string;
////}
////
////interface Two extends Omit<One, "a"> {
////    c: boolean;
////}
////
////class TwoStore implements Two {[| |]}

verify.codeFix({
  description: "Implement interface 'Two'",
  newFileContent:
`interface One {
    a: number;
    b: string;
}

interface Two extends Omit<One, "a"> {
    c: boolean;
}

class TwoStore implements Two {
    c: boolean;
    b: string;
}`,
});
