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
const React = __importStar(require("react"));
let Component;
const RenderElement = ({ title }) => React.createElement("div", null, title);
Component = RenderElement;
React.createElement(RenderElement, null);
React.createElement(RenderElement, { title: "react" });
React.createElement(RenderElement, { excessProp: true });
const RenderString = ({ title }) => title;
Component = RenderString;
React.createElement(RenderString, null);
React.createElement(RenderString, { title: "react" });
React.createElement(RenderString, { excessProp: true });
const RenderNumber = ({ title }) => title.length;
Component = RenderNumber;
React.createElement(RenderNumber, null);
React.createElement(RenderNumber, { title: "react" });
React.createElement(RenderNumber, { excessProp: true });
const RenderArray = ({ title }) => [title];
Component = RenderArray;
React.createElement(RenderArray, null);
React.createElement(RenderArray, { title: "react" });
React.createElement(RenderArray, { excessProp: true });
// React Server Component
const RenderPromise = async ({ title }) => "react";
Component = RenderPromise;
React.createElement(RenderPromise, null);
React.createElement(RenderPromise, { title: "react" });
React.createElement(RenderPromise, { excessProp: true });
// Class components still work
class RenderStringClass extends React.Component {
    render() {
        return this.props.title;
    }
}
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
