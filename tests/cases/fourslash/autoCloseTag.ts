/// <reference path='fourslash.ts' />

// @Filename: /a.tsx
////const x = <div>/*0*/;
////const x = <div> foo/*1*/ </div>;
////const x = <div></div>/*2*/;
////const x = <div/>/*3*/;
////const x = <div>
////    <p>/*4*/
////    </div>
////</p>;
////const x = <div> text /*5*/;

verify.jsxClosingTag({
    0: { newText: "</div>" },
    1: undefined,
    2: undefined,
    3: undefined,
    4: { newText: "</p>" },
});
