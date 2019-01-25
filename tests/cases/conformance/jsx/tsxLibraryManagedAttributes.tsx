// @jsx: preserve
// @strict: true

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
