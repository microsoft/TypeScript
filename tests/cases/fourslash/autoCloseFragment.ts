/// <reference path='fourslash.ts' />

// Using separate files for each example to avoid unclosed JSX tags affecting other tests.

// @Filename: /0.tsx
////const x = <>/*0*/;

// @Filename: /1.tsx
////const x = <> foo/*1*/ </>;

// @Filename: /2.tsx
////const x = <></>/*2*/;

// @Filename: /3.tsx
////const x = </>/*3*/;

// @Filename: /4.tsx
////const x = <div>
////    <>/*4*/
////    </div>
////</>;

// @Filename: /5.tsx
////const x = <> text /*5*/;

// @Filename: /6.tsx
////const x = <>
////    <>/*6*/
////</>;

// @Filename: /7.tsx
////const x = <div>
////    <>/*7*/
////</div>;

// @Filename: /8.tsx
////const x = <div>
////    <>/*8*/</>
////</div>;

// @Filename: /9.tsx
////const x = <p>
////    <>
////        <>/*9*/
////    </>
////</p>

verify.jsxClosingTag({
    0: { newText: "</>" },
    1: undefined,
    2: undefined,
    3: undefined,
    4: { newText: "</>" },
    5: { newText: "</>" },
    6: { newText: "</>" },
    7: { newText: "</>" },
    8: undefined,
    9: { newText: "</>" },
});
