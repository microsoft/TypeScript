/// <reference path='fourslash.ts' />

// Using separate files for each example to avoid unclosed JSX tags affecting other tests.

// @Filename: /0.tsx
////const x = <div>/*0*/;

// @Filename: /1.tsx
////const x = <div> foo/*1*/ </div>;

// @Filename: /2.tsx
////const x = <div></div>/*2*/;

// @Filename: /3.tsx
////const x = <div/>/*3*/;

// @Filename: /4.tsx
////const x = <div>
////    <p>/*4*/
////    </div>
////</p>;

// @Filename: /5.tsx
////const x = <div> text /*5*/;

// @Filename: /6.tsx
////const x = <div>
////    <div>/*6*/
////</div>;

// @Filename: /7.tsx
////const x = <div>
////    <p>/*7*/
////</div>;

// @Filename: /8.tsx
////const x = <div>
////    <div>/*8*/</div>
////</div>;

verify.jsxClosingTag({
    0: { newText: "</div>" },
    1: undefined,
    2: undefined,
    3: undefined,
    4: { newText: "</p>" },
    5: { newText: "</div>" },
    6: { newText: "</div>" },
    7: { newText: "</p>" },
    8: undefined,
});
