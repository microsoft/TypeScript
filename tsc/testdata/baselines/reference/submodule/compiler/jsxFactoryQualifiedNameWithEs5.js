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
const React = { createElement: skate.h };
class Component {
    renderCallback() {
        return <div>test</div>;
    }
}
;
