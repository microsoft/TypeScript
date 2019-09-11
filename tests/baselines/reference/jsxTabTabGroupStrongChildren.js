//// [jsxTabTabGroupStrongChildren.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";

export interface TabGroupProps {
    // Has to be a union of a single type and an array type for ~legacy reasons~
    // It's just how jsx children are checked, as they predate tuple types
    children: React.ComponentElement<TabProps, Tab>[] | React.ComponentElement<TabProps, Tab>;
}

export interface TabProps {}

export class Tab extends React.Component<TabProps> {
    private a!: void; // nominally tag `Tab`
    render(): JSX.Element {
        return <div></div>;
    }
}
export class NotTab extends React.Component<TabProps> {
    private a!: void; // nominally tag `NotTab` (which is now distinct from `Tab`)
    render(): JSX.Element {
        return <div></div>;
    }
}
export class TabGroup extends React.Component<TabGroupProps> {
    render() {
        return <div>{this.props.children}</div>
    }
}

const elem = <div/>; // sanity check DetailedHtmlElement

const output = <TabGroup>
    <Tab/>
</TabGroup>;

const shouldFail = <TabGroup>
    <Tab/>
    <div/>
</TabGroup>;

const alsoFails = <TabGroup>
    <NotTab/>
</TabGroup>;


// Function component ver:

// This uses `SFCElement` and `SFC` - nowadays those are called `FunctionComponentElement` and `FunctionComponent`

export interface FCTabGroupProps {
    children: React.SFCElement<FCTabProps>[] | React.SFCElement<FCTabProps>;
}

export interface FCTabProps {}

const FCTabGroup: React.SFC<FCTabGroupProps> = props => <div>{props.children}</div>;

const FCTab = (props: FCTabProps) => <div></div>;

const fctab = <FCTabGroup>
    <FCTab/>
</FCTabGroup>;

const notATab = <FCTabGroup>
    <div/>
</FCTabGroup>;

const NotFCTab = (props: {}) => <div></div>;

// No way to error on this, is (structurally) indistinguishable from the above
const alsoNotATab = <FCTabGroup>
    <NotFCTab/>
</FCTabGroup>;

//// [jsxTabTabGroupStrongChildren.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.prototype.render = function () {
        return react_1["default"].createElement("div", null);
    };
    return Tab;
}(react_1["default"].Component));
exports.Tab = Tab;
var NotTab = /** @class */ (function (_super) {
    __extends(NotTab, _super);
    function NotTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotTab.prototype.render = function () {
        return react_1["default"].createElement("div", null);
    };
    return NotTab;
}(react_1["default"].Component));
exports.NotTab = NotTab;
var TabGroup = /** @class */ (function (_super) {
    __extends(TabGroup, _super);
    function TabGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabGroup.prototype.render = function () {
        return react_1["default"].createElement("div", null, this.props.children);
    };
    return TabGroup;
}(react_1["default"].Component));
exports.TabGroup = TabGroup;
var elem = react_1["default"].createElement("div", null); // sanity check DetailedHtmlElement
var output = react_1["default"].createElement(TabGroup, null,
    react_1["default"].createElement(Tab, null));
var shouldFail = react_1["default"].createElement(TabGroup, null,
    react_1["default"].createElement(Tab, null),
    react_1["default"].createElement("div", null));
var alsoFails = react_1["default"].createElement(TabGroup, null,
    react_1["default"].createElement(NotTab, null));
var FCTabGroup = function (props) { return react_1["default"].createElement("div", null, props.children); };
var FCTab = function (props) { return react_1["default"].createElement("div", null); };
var fctab = react_1["default"].createElement(FCTabGroup, null,
    react_1["default"].createElement(FCTab, null));
var notATab = react_1["default"].createElement(FCTabGroup, null,
    react_1["default"].createElement("div", null));
var NotFCTab = function (props) { return react_1["default"].createElement("div", null); };
// No way to error on this, is (structurally) indistinguishable from the above
var alsoNotATab = react_1["default"].createElement(FCTabGroup, null,
    react_1["default"].createElement(NotFCTab, null));
