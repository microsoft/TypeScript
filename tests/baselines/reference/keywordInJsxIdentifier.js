//// [keywordInJsxIdentifier.tsx]

declare var React: any;
<foo class-id/>

//// [keywordInJsxIdentifier.js]
React.createElement("foo", {"class-id": true});
