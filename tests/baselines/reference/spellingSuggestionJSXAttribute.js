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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = __importStar(require("react"));
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
React.createElement("a", { class: "" });
React.createElement("a", { for: "" }); // should have no fix
React.createElement("label", { for: "" });
React.createElement("label", { for: "", class: "" });
React.createElement(MyComp, { class: "" });
React.createElement(MyComp2, { class: "" });
React.createElement(MyComp, { for: "" });
React.createElement(MyComp2, { for: "" });
