//// [tests/cases/conformance/jsx/tsxLibraryManagedAttributes.tsx] ////

//// [tsxLibraryManagedAttributes.tsx]
type Defaultize<TProps, TDefaults> =
    & {[K in Extract<keyof TProps, keyof TDefaults>]?: TProps[K]}
    & {[K in Exclude<keyof TProps, keyof TDefaults>]: TProps[K]}
    & Partial<TDefaults>;

type InferredPropTypes<P> = {[K in keyof P]: P[K] extends PropTypeChecker<infer T, infer U> ? PropTypeChecker<T, U>[typeof checkedType] : {}};

declare const checkedType: unique symbol;
interface PropTypeChecker<U, TRequired = false> {
    (props: any, propName: string, componentName: string, location: any, propFullName: string): boolean;
    isRequired: PropTypeChecker<U, true>;
    [checkedType]: TRequired extends true ? U : U | null | undefined;
}

declare namespace PropTypes {
    export const number: PropTypeChecker<number>;
    export const string: PropTypeChecker<string>;
    export const node: PropTypeChecker<ReactNode>;
}

type ReactNode = string | number | ReactComponent<{}, {}>;

declare class ReactComponent<P={}, S={}> {
    constructor(props: P);
    props: P & Readonly<{children: ReactNode[]}>;
    setState(s: Partial<S>): S;
    render(): ReactNode;
}

declare namespace JSX {
    interface Element extends ReactComponent {}
    interface IntrinsicElements {}
    type LibraryManagedAttributes<TComponent, TProps> =
        TComponent extends { defaultProps: infer D; propTypes: infer P; }
            ? Defaultize<TProps & InferredPropTypes<P>, D>
            : TComponent extends { defaultProps: infer D }
                ? Defaultize<TProps, D>
                : TComponent extends { propTypes: infer P }
                    ? TProps & InferredPropTypes<P>
                    : TProps;
}

class Component extends ReactComponent {
    static propTypes = {
        foo: PropTypes.number,
        bar: PropTypes.node,
        baz: PropTypes.string.isRequired,
    };
    static defaultProps = {
        foo: 42,
    }
}

const a = <Component foo={12} bar="yes" baz="yeah" />;
const b = <Component foo={12} />; // Error, missing required prop bar
const c = <Component bar="yes" baz="yeah" />;
const d = <Component bar="yes" baz="yo" bat="ohno" />; // Error, baz not a valid prop
const e = <Component foo={12} bar={null} baz="cool" />; // bar is nullable/undefinable since it's not marked `isRequired`
const f = <Component foo={12} bar="yeah" baz={null} />; // Error, baz is _not_ nullable/undefinable since it's marked `isRequired`

class JustPropTypes extends ReactComponent {
    static propTypes = {
        foo: PropTypes.number,
        bar: PropTypes.node.isRequired,
    };
}

const g = <JustPropTypes foo={12} bar="ok" />;
const h = <JustPropTypes foo="no" />; // error, wrong type
const i = <JustPropTypes foo={null} bar="ok" />;
const j = <JustPropTypes foo={12} bar={null} />; // error, bar is required

class JustDefaultProps extends ReactComponent {
    static defaultProps = {
        foo: 42,
    };
}

const k = <JustDefaultProps foo={12} />;
const l = <JustDefaultProps foo={12} bar="ok" />; // error, no prop named bar
const m = <JustDefaultProps foo="no" />; // error, wrong type

interface FooProps {
    foo: string;
}

class BothWithSpecifiedGeneric extends ReactComponent<FooProps> {
    static propTypes = {
        foo: PropTypes.string,
        bar: PropTypes.node,
        baz: PropTypes.number.isRequired,
    };
    static defaultProps = {
        foo: "yo",
    };
}
const n = <BothWithSpecifiedGeneric foo="fine" bar="yes" baz={12} />;
const o = <BothWithSpecifiedGeneric foo="no" />; // Error, missing required prop bar
const p = <BothWithSpecifiedGeneric bar="yes" baz={12} />;
const q = <BothWithSpecifiedGeneric bar="yes" baz={12} bat="ohno" />; // Error, baz not a valid prop
const r = <BothWithSpecifiedGeneric foo="no" bar={null} baz={0} />; // bar is nullable/undefinable since it's not marked `isRequired`
const s = <BothWithSpecifiedGeneric foo="eh" bar="yeah" baz={null} />; // Error, baz is _not_ nullable/undefinable since it's marked `isRequired`

class JustPropTypesWithSpecifiedGeneric extends ReactComponent<FooProps> {
    static propTypes = {
        foo: PropTypes.string,
        bar: PropTypes.node.isRequired,
    };
}
const t = <JustPropTypesWithSpecifiedGeneric foo="nice" bar="ok" />;
const u = <JustPropTypesWithSpecifiedGeneric foo={12} />; // error, wrong type
const v = <JustPropTypesWithSpecifiedGeneric foo={null} bar="ok" />; // generic overrides propTypes required-ness, null isn't valid
const w = <JustPropTypesWithSpecifiedGeneric foo="cool" bar={null} />; // error, bar is required

class JustDefaultPropsWithSpecifiedGeneric extends ReactComponent<FooProps> {
    static defaultProps = {
        foo: "no",
    };
}

const x = <JustDefaultPropsWithSpecifiedGeneric foo="eh" />;
const y = <JustDefaultPropsWithSpecifiedGeneric foo="no" bar="ok" />; // error, no prop named bar
const z = <JustDefaultPropsWithSpecifiedGeneric foo={12} />; // error, wrong type
const aa = <JustDefaultPropsWithSpecifiedGeneric />;


//// [tsxLibraryManagedAttributes.jsx]
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
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.propTypes = {
        foo: PropTypes.number,
        bar: PropTypes.node,
        baz: PropTypes.string.isRequired,
    };
    Component.defaultProps = {
        foo: 42,
    };
    return Component;
}(ReactComponent));
var a = <Component foo={12} bar="yes" baz="yeah"/>;
var b = <Component foo={12}/>; // Error, missing required prop bar
var c = <Component bar="yes" baz="yeah"/>;
var d = <Component bar="yes" baz="yo" bat="ohno"/>; // Error, baz not a valid prop
var e = <Component foo={12} bar={null} baz="cool"/>; // bar is nullable/undefinable since it's not marked `isRequired`
var f = <Component foo={12} bar="yeah" baz={null}/>; // Error, baz is _not_ nullable/undefinable since it's marked `isRequired`
var JustPropTypes = /** @class */ (function (_super) {
    __extends(JustPropTypes, _super);
    function JustPropTypes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustPropTypes.propTypes = {
        foo: PropTypes.number,
        bar: PropTypes.node.isRequired,
    };
    return JustPropTypes;
}(ReactComponent));
var g = <JustPropTypes foo={12} bar="ok"/>;
var h = <JustPropTypes foo="no"/>; // error, wrong type
var i = <JustPropTypes foo={null} bar="ok"/>;
var j = <JustPropTypes foo={12} bar={null}/>; // error, bar is required
var JustDefaultProps = /** @class */ (function (_super) {
    __extends(JustDefaultProps, _super);
    function JustDefaultProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustDefaultProps.defaultProps = {
        foo: 42,
    };
    return JustDefaultProps;
}(ReactComponent));
var k = <JustDefaultProps foo={12}/>;
var l = <JustDefaultProps foo={12} bar="ok"/>; // error, no prop named bar
var m = <JustDefaultProps foo="no"/>; // error, wrong type
var BothWithSpecifiedGeneric = /** @class */ (function (_super) {
    __extends(BothWithSpecifiedGeneric, _super);
    function BothWithSpecifiedGeneric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BothWithSpecifiedGeneric.propTypes = {
        foo: PropTypes.string,
        bar: PropTypes.node,
        baz: PropTypes.number.isRequired,
    };
    BothWithSpecifiedGeneric.defaultProps = {
        foo: "yo",
    };
    return BothWithSpecifiedGeneric;
}(ReactComponent));
var n = <BothWithSpecifiedGeneric foo="fine" bar="yes" baz={12}/>;
var o = <BothWithSpecifiedGeneric foo="no"/>; // Error, missing required prop bar
var p = <BothWithSpecifiedGeneric bar="yes" baz={12}/>;
var q = <BothWithSpecifiedGeneric bar="yes" baz={12} bat="ohno"/>; // Error, baz not a valid prop
var r = <BothWithSpecifiedGeneric foo="no" bar={null} baz={0}/>; // bar is nullable/undefinable since it's not marked `isRequired`
var s = <BothWithSpecifiedGeneric foo="eh" bar="yeah" baz={null}/>; // Error, baz is _not_ nullable/undefinable since it's marked `isRequired`
var JustPropTypesWithSpecifiedGeneric = /** @class */ (function (_super) {
    __extends(JustPropTypesWithSpecifiedGeneric, _super);
    function JustPropTypesWithSpecifiedGeneric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustPropTypesWithSpecifiedGeneric.propTypes = {
        foo: PropTypes.string,
        bar: PropTypes.node.isRequired,
    };
    return JustPropTypesWithSpecifiedGeneric;
}(ReactComponent));
var t = <JustPropTypesWithSpecifiedGeneric foo="nice" bar="ok"/>;
var u = <JustPropTypesWithSpecifiedGeneric foo={12}/>; // error, wrong type
var v = <JustPropTypesWithSpecifiedGeneric foo={null} bar="ok"/>; // generic overrides propTypes required-ness, null isn't valid
var w = <JustPropTypesWithSpecifiedGeneric foo="cool" bar={null}/>; // error, bar is required
var JustDefaultPropsWithSpecifiedGeneric = /** @class */ (function (_super) {
    __extends(JustDefaultPropsWithSpecifiedGeneric, _super);
    function JustDefaultPropsWithSpecifiedGeneric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JustDefaultPropsWithSpecifiedGeneric.defaultProps = {
        foo: "no",
    };
    return JustDefaultPropsWithSpecifiedGeneric;
}(ReactComponent));
var x = <JustDefaultPropsWithSpecifiedGeneric foo="eh"/>;
var y = <JustDefaultPropsWithSpecifiedGeneric foo="no" bar="ok"/>; // error, no prop named bar
var z = <JustDefaultPropsWithSpecifiedGeneric foo={12}/>; // error, wrong type
var aa = <JustDefaultPropsWithSpecifiedGeneric />;
