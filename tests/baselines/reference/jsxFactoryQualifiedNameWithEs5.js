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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("./jsx");
var skate;
var React = { createElement: skate.h };
var Component = (function () {
    function Component() {
    }
    Component.prototype.renderCallback = function () {
        return skate.h("div", null, "test");
    };
    __names(Component.prototype, ["renderCallback"]);
    return Component;
}());
;
