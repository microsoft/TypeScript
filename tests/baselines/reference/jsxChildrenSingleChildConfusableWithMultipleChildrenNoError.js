//// [tests/cases/compiler/jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.tsx] ////

//// [jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react'

type Tab = [string, React.ReactNode]  // [tabName, tabContent]

interface Props {
    children: Tab[]
}

function TabLayout(props: Props) {
    return <div/>
}

export class App extends React.Component<{}> {
    render() {
        return <TabLayout>
            {[
                ['Users', <div/>],
                ['Products', <div/>]
            ]}
        </TabLayout>
    }
}

//// [jsxChildrenSingleChildConfusableWithMultipleChildrenNoError.js]
"use strict";
/// <reference path="react16.d.ts" />
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var React = require("react");
function TabLayout(props) {
    return React.createElement("div", null);
}
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement(TabLayout, null, [
            ['Users', React.createElement("div", null)],
            ['Products', React.createElement("div", null)]
        ]);
    };
    return App;
}(React.Component));
exports.App = App;
