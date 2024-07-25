//// [tests/cases/compiler/jsxElementType.tsx] ////

//// [jsxElementType.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

type React18ReactFragment = ReadonlyArray<React18ReactNode>;
type React18ReactNode =
  | React.ReactElement<any>
  | string
  | number
  | React18ReactFragment
  | React.ReactPortal
  | boolean
  | null
  | undefined
  | Promise<React18ReactNode>;

// // React.JSXElementConstructor but it now can return React nodes from function components.
type NewReactJSXElementConstructor<P> =
  | ((props: P) => React18ReactNode)
  | (new (props: P) => React.Component<P, any>);

declare global {
  namespace JSX {
    type ElementType = string | NewReactJSXElementConstructor<any>;
    interface IntrinsicElements {
      ['my-custom-element']: React.DOMAttributes<unknown>;
    }
  }
}

let Component: NewReactJSXElementConstructor<{ title: string }>;

const RenderElement = ({ title }: { title: string }) => <div>{title}</div>;
Component = RenderElement;
<RenderElement />;
<RenderElement title="react" />;
<RenderElement excessProp />;

const RenderString = ({ title }: { title: string }) => title;
Component = RenderString;
<RenderString />;
<RenderString title="react" />;
<RenderString excessProp />;

const RenderNumber = ({ title }: { title: string }) => title.length;
Component = RenderNumber;
<RenderNumber />;
<RenderNumber title="react" />;
<RenderNumber excessProp />;

const RenderArray = ({ title }: { title: string }) => [title];
Component = RenderArray;
<RenderArray />;
<RenderArray title="react" />;
<RenderArray excessProp />;

// React Server Component
const RenderPromise = async ({ title }: { title: string }) => "react";
Component = RenderPromise;
<RenderPromise />;
<RenderPromise title="react" />;
<RenderPromise excessProp />;

// Class components still work
class RenderStringClass extends React.Component<{ title: string }> {
  render() {
    return this.props.title;
  }
}
Component = RenderStringClass;
<RenderStringClass />;
<RenderStringClass title="react" />;
<RenderStringClass excessProp />;

// Host element types still work
<div />;
<my-custom-element />;
// Undeclared host element types are still rejected
<boop />;
<my-undeclared-custom-element />;

// Highlighting various ecosystem compat issues
// react-native-gesture-handler
// https://github.com/software-mansion/react-native-gesture-handler/blob/79017e5e7cc2e82e6467851f870920ff836ee04f/src/components/GestureComponents.tsx#L139-L146
interface ReactNativeFlatListProps<Item> {}
function ReactNativeFlatList(
  props: {},
  ref: React.ForwardedRef<typeof ReactNativeFlatList>
) {
  return null;
}
<ReactNativeFlatList />;

// testing higher-order component compat
function f1<T extends (props: {}) => React.ReactElement<any>>(Component: T) {
  return <Component />;
}

<Unresolved />;
<Unresolved foo="abc" />;

declare global {
    namespace JSX {
      interface IntrinsicElements {
          ['a:b']: { a: string };
      }
  }
}

<a:b a="accepted" />;
<a:b b="rejected" />;
<a:b a="accepted" b="rejected" />;


//// [jsxElementType.js]
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = require("react");
var Component;
var RenderElement = function (_a) {
    var title = _a.title;
    return React.createElement("div", null, title);
};
Component = RenderElement;
React.createElement(RenderElement, null);
React.createElement(RenderElement, { title: "react" });
React.createElement(RenderElement, { excessProp: true });
var RenderString = function (_a) {
    var title = _a.title;
    return title;
};
Component = RenderString;
React.createElement(RenderString, null);
React.createElement(RenderString, { title: "react" });
React.createElement(RenderString, { excessProp: true });
var RenderNumber = function (_a) {
    var title = _a.title;
    return title.length;
};
Component = RenderNumber;
React.createElement(RenderNumber, null);
React.createElement(RenderNumber, { title: "react" });
React.createElement(RenderNumber, { excessProp: true });
var RenderArray = function (_a) {
    var title = _a.title;
    return [title];
};
Component = RenderArray;
React.createElement(RenderArray, null);
React.createElement(RenderArray, { title: "react" });
React.createElement(RenderArray, { excessProp: true });
// React Server Component
var RenderPromise = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var title = _b.title;
    return __generator(this, function (_c) {
        return [2 /*return*/, "react"];
    });
}); };
Component = RenderPromise;
React.createElement(RenderPromise, null);
React.createElement(RenderPromise, { title: "react" });
React.createElement(RenderPromise, { excessProp: true });
// Class components still work
var RenderStringClass = /** @class */ (function (_super) {
    __extends(RenderStringClass, _super);
    function RenderStringClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderStringClass.prototype.render = function () {
        return this.props.title;
    };
    return RenderStringClass;
}(React.Component));
Component = RenderStringClass;
React.createElement(RenderStringClass, null);
React.createElement(RenderStringClass, { title: "react" });
React.createElement(RenderStringClass, { excessProp: true });
// Host element types still work
React.createElement("div", null);
React.createElement("my-custom-element", null);
// Undeclared host element types are still rejected
React.createElement("boop", null);
React.createElement("my-undeclared-custom-element", null);
function ReactNativeFlatList(props, ref) {
    return null;
}
React.createElement(ReactNativeFlatList, null);
// testing higher-order component compat
function f1(Component) {
    return React.createElement(Component, null);
}
React.createElement(Unresolved, null);
React.createElement(Unresolved, { foo: "abc" });
React.createElement("a:b", { a: "accepted" });
React.createElement("a:b", { b: "rejected" });
React.createElement("a:b", { a: "accepted", b: "rejected" });
