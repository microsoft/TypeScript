//// [keywordInJsxIdentifier.tsx]
declare var React: any;
<foo class-id/>;
<foo class/>;
<foo class-id="1"/>;
<foo class="1"/>;


//// [keywordInJsxIdentifier.js]
React.createElement("foo", { "class-id": true });
React.createElement("foo", { "class": true });
React.createElement("foo", { "class-id": "1" });
React.createElement("foo", { "class": "1" });
