//// [jsxFactoryAndJsxFragmentFactory.tsx]
declare var h: any;
declare var Frag: any;

<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;

//// [jsxFactoryAndJsxFragmentFactory.js]
h(Frag, null);
h(Frag, null,
    h("span", null, "1"),
    h(Frag, null,
        h("span", null, "2.1"),
        h("span", null, "2.2")));
