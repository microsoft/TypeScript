//// [jsxFactoryButNoJsxFragmentFactory.tsx]
declare var h: any;

<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;

//// [jsxFactoryButNoJsxFragmentFactory.js]
h(React.Fragment, null);
h(React.Fragment, null,
    h("span", null, "1"),
    h(React.Fragment, null,
        h("span", null, "2.1"),
        h("span", null, "2.2")));
