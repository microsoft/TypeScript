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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function MyComp2(props) {
    return null;
}
class MyComp extends React.Component {
}
<a class=""/>;
<a for=""/>;
<label for=""/>;
<label for="" class=""/>;
<MyComp class=""/>;
<MyComp2 class=""/>;
<MyComp for=""/>;
<MyComp2 for=""/>;
