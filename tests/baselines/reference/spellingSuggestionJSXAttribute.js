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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var React = require("react");
function MyComp2(props) {
    return null;
}
var MyComp = /** @class */ (function (_super) {
    __extends(MyComp, _super);
    function MyComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyComp;
}(React.Component));
React.createElement("a", { "class": "" });
React.createElement("a", { "for": "" }); // should have no fix
React.createElement("label", { "for": "" });
React.createElement("label", { "for": "", "class": "" });
React.createElement(MyComp, { "class": "" });
React.createElement(MyComp2, { "class": "" });
React.createElement(MyComp, { "for": "" });
React.createElement(MyComp2, { "for": "" });
