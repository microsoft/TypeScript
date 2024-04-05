//// [tests/cases/compiler/jsxFactoryAndJsxFragmentFactoryNull.tsx] ////

//// [jsxFactoryAndJsxFragmentFactoryNull.tsx]
declare var h: any;

<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;

//// [jsxFactoryAndJsxFragmentFactoryNull.js]
h(null, null);
h(null, null,
    h("span", null, "1"),
    h(null, null,
        h("span", null, "2.1"),
        h("span", null, "2.2")));
