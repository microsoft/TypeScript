/// <reference path='fourslash.ts'/>

// @jsx: preserve

// @Filename: /a.tsx
////function /*f*/f() {}
////const /*g*/g = f;
////const /*h*/h = g;

////[|/*useF*/f|]();
////[|/*useG*/g|]();
////[|/*useH*/h|]();

////const i = /*i*/() => 0;
////const /*j*/j = i;

////[|/*useI*/i|]();
////[|/*useJ*/j|]();

////const o = { m: /*m*/() => 0 };
////o.[|/*useM*/m|]();

////class Component { /*componentCtr*/constructor(props: {}) {} }
////class /*MyComponent*/MyComponent extends Component {}
////<[|/*jsxMyComponent*/MyComponent|] />
////new [|/*newMyComponent*/MyComponent|]({});

verify.noErrors();

verify.goToDefinition({
    useF: "f",
    useG: ["g", "f"],
    useH: ["h", "f"],

    useI: "i",
    useJ: ["j", "i"],
    useM: "m",

    jsxMyComponent: "MyComponent",
    newMyComponent: ["MyComponent", "componentCtr"],
});
