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
var Component = (function () {
    function Component() {
    }
    var proto_1 = Component.prototype;
    proto_1.renderCallback = function () {
        return skate.h("div", null, "test");
    };
    return Component;
}());
;
