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
  description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "Two"],
  index: 1,
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
