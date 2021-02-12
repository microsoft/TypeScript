//// [jsxLargeRefUnion.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

const animated: {
  [Tag in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<Tag>
  >
} = {} as any;

function makeAnimated<T extends React.ElementType<any>>(
  comp: T
): React.ForwardRefExoticComponent<React.ComponentPropsWithRef<T>> {
  return null as any; // not important
}

export interface UpgradedProps {
  show: boolean;
}

export function test<P>(
  component: React.ComponentType<P> | keyof React.ReactHTML
): React.ComponentType<P & UpgradedProps> {
  // changing to `const Comp: any` un-hangs tsserver
  const Comp =
    typeof component === "string"
      ? animated[component]
      : makeAnimated(component);

  return React.forwardRef<any, P & UpgradedProps>((props, ref) => {
    const { show, ...ownProps } = props;
    return show ? <Comp {...ownProps} ref={ref} /> : null; // ref as currently defined is expression-too-complex
  });
}

type FixedRef<T> = string | null | React.RefObject<T> | { bivarianceHack(instance: T | null): any }["bivarianceHack"] & {current?: undefined};
declare module "react" {
  interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P> {
    customRef: FixedRef<T>;
  }
}
interface ForwardCustomRefRenderFunction<T, P = {}> {
  (props: React.PropsWithChildren<P>, ref: FixedRef<T>): React.ReactElement<any> | null;
  displayName?: string;
  defaultProps?: never;
  propTypes?: never;
}
declare function forwardCustomRef<T, P = {}>(Component: ForwardCustomRefRenderFunction<T, P>): React.ComponentType<P & React.ClassAttributes<T>>;

export function test2<P>(
  component: React.ComponentType<P> | keyof React.ReactHTML
): React.ComponentType<P & UpgradedProps> {
  // changing to `const Comp: any` un-hangs tsserver
  const Comp =
    typeof component === "string"
      ? animated[component]
      : makeAnimated(component);

  return forwardCustomRef<any, P & UpgradedProps>((props, ref) => {
    const { show, ...ownProps } = props;
    return show ? <Comp {...ownProps} customRef={ref} /> : null; // with the additional `current?: undefined` member on the signature, it now can resolve
  });
}

//// [jsxLargeRefUnion.js]
"use strict";
/// <reference path="react16.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.test2 = exports.test = void 0;
var React = require("react");
var animated = {};
function makeAnimated(comp) {
    return null; // not important
}
function test(component) {
    // changing to `const Comp: any` un-hangs tsserver
    var Comp = typeof component === "string"
        ? animated[component]
        : makeAnimated(component);
    return React.forwardRef(function (props, ref) {
        var show = props.show, ownProps = __rest(props, ["show"]);
        return show ? React.createElement(Comp, __assign({}, ownProps, { ref: ref })) : null; // ref as currently defined is expression-too-complex
    });
}
exports.test = test;
function test2(component) {
    // changing to `const Comp: any` un-hangs tsserver
    var Comp = typeof component === "string"
        ? animated[component]
        : makeAnimated(component);
    return forwardCustomRef(function (props, ref) {
        var show = props.show, ownProps = __rest(props, ["show"]);
        return show ? React.createElement(Comp, __assign({}, ownProps, { customRef: ref })) : null; // with the additional `current?: undefined` member on the signature, it now can resolve
    });
}
exports.test2 = test2;
