//// [tests/cases/compiler/jsxFactoryButNoJsxFragmentFactory.tsx] ////

//// [jsxFactoryButNoJsxFragmentFactory.tsx]
declare var h: any;

<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;

//// [jsxFactoryButNoJsxFragmentFactory.js]
<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;
