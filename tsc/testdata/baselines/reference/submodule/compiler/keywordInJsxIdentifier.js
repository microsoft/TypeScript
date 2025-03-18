//// [tests/cases/compiler/keywordInJsxIdentifier.tsx] ////

//// [keywordInJsxIdentifier.tsx]
declare var React: any;
<foo class-id/>;
<foo class/>;
<foo class-id="1"/>;
<foo class="1"/>;


//// [keywordInJsxIdentifier.js]
<foo class-id/>;
<foo class/>;
<foo class-id="1"/>;
<foo class="1"/>;
