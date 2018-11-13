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
////type ComponentClass = /*ComponentClass*/new () => Component;
////interface ComponentClass2 { /*ComponentClass2*/new(): Component; }
////
////class /*MyComponent*/MyComponent extends Component {}
////<[|/*jsxMyComponent*/MyComponent|] />;
////new [|/*newMyComponent*/MyComponent|]({});
////
////declare const /*MyComponent2*/MyComponent2: ComponentClass;
////<[|/*jsxMyComponent2*/MyComponent2|] />;
////new [|/*newMyComponent2*/MyComponent2|]();
////
////declare const /*MyComponent3*/MyComponent3: ComponentClass2;
////<[|/*jsxMyComponent3*/MyComponent3|] />;
////new [|/*newMyComponent3*/MyComponent3|]();

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

    jsxMyComponent2: "MyComponent2",
    newMyComponent2: ["MyComponent2", "ComponentClass"],

    jsxMyComponent3: "MyComponent3",
    newMyComponent3: ["MyComponent3", "ComponentClass2"],
});
