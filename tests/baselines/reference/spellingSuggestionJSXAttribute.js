//// [tests/cases/compiler/spellingSuggestionJSXAttribute.tsx] ////

//// [spellingSuggestionJSXAttribute.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

function MyComp2(props: { className?: string, htmlFor?: string }) {
    return null!;
}
class MyComp extends React.Component<{ className?: string, htmlFor?: string }> { }
<a class="" />;
<a for="" />; // should have no fix
<label for="" />;
<label for="" class="" />;
<MyComp class="" />;
<MyComp2 class="" />;
<MyComp for="" />;
<MyComp2 for="" />;


//// [spellingSuggestionJSXAttribute.js]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
function MyComp2(props) {
    return null;
}
class MyComp extends React.Component {
}
React.createElement("a", { class: "" });
React.createElement("a", { for: "" }); // should have no fix
React.createElement("label", { for: "" });
React.createElement("label", { for: "", class: "" });
React.createElement(MyComp, { class: "" });
React.createElement(MyComp2, { class: "" });
React.createElement(MyComp, { for: "" });
React.createElement(MyComp2, { for: "" });
