//// [tests/cases/compiler/jsxFactoryQualifiedNameWithEs5.ts] ////

//// [index.tsx]
import "./jsx";

var skate: any;
const React = { createElement: skate.h };

class Component {
    renderCallback() {
        return <div>test</div>;
    }
};

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./jsx");
var skate;
var React = { createElement: skate.h };
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.renderCallback = function () {
        return skate.h("div", null, "test");
    };
    return Component;
}());
;
