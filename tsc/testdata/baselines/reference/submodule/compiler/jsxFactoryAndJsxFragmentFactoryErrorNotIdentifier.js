//// [tests/cases/compiler/jsxFactoryAndJsxFragmentFactoryErrorNotIdentifier.tsx] ////

//// [jsxFactoryAndJsxFragmentFactoryErrorNotIdentifier.tsx]
declare var h: any;

<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;

//// [jsxFactoryAndJsxFragmentFactoryErrorNotIdentifier.js]
<></>;
<><span>1</span><><span>2.1</span><span>2.2</span></></>;
