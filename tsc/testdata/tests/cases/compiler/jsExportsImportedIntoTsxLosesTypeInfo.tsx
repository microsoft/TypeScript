// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @jsx: preserve

// https://github.com/microsoft/typescript-go/issues/3519

// @filename: node_modules/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    type Key = string | number;
    interface RefObject<T> {
        current: T | null;
    }
    type Ref<T> = ((instance: T | null) => void) | RefObject<T> | null;
    interface Attributes {
        key?: Key | null;
    }
    interface RefAttributes<T> extends Attributes {
        ref?: Ref<T>;
    }
    type PropsWithoutRef<P> = Pick<P, Exclude<keyof P, "ref">>;
    interface ReactElement<P = any> {
        type: any;
        props: P;
        key: Key | null;
    }
    type ReactNode = ReactElement | string | number | null | undefined | boolean;
    interface FunctionComponent<P = {}> {
        (props: P): ReactElement | null;
    }
    type FC<P = {}> = FunctionComponent<P>;
    interface ComponentClass<P = {}> {
        new (props: P): Component<P>;
    }
    type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
    class Component<P = {}, S = {}> {
        props: Readonly<P>;
        state: Readonly<S>;
        constructor(props: P);
        render(): ReactNode;
    }
    interface ForwardRefExoticComponent<P> {
        (props: P): ReactElement | null;
    }
    interface ForwardRefRenderFunction<T, P = {}> {
        (props: P, ref: Ref<T>): ReactElement | null;
    }
    function forwardRef<T, P = {}>(
        render: ForwardRefRenderFunction<T, P>,
    ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
    interface Context<T> {
        Provider: FC<{ value: T; children?: ReactNode }>;
        Consumer: FC<{ children: (value: T) => ReactNode }>;
    }
    function createContext<T>(defaultValue: T): Context<T>;
    function useRef<T>(initialValue: T | null): RefObject<T>;
    function useContext<T>(context: Context<T>): T;
}

// @filename: node_modules/redux/index.d.ts
export function compose(): <R>(a: R) => R;
export function compose<F extends Function>(f: F): F;
export function compose<A, B, C>(f1: (b: B) => C, f2: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(
    f1: (c: C) => D,
    f2: (b: B) => C,
    f3: (a: A) => B,
): (a: A) => D;
export function compose<R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R;
export function compose<R>(...funcs: Function[]): (...args: any[]) => R;

// @filename: node_modules/react-redux/index.d.ts
import * as React from "react";
export interface InferableComponentEnhancer {
    <P>(component: React.ComponentType<P>): React.ComponentType<P>;
}
export function connect(): InferableComponentEnhancer;

// @filename: src/lib.js
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

/** @type {React.FC<{ domRef: unknown }>} */
let C0 = () => null;

export const C1 = React.forwardRef((props, ref) => <C0 domRef={ref} {...props} />);

export const C2 = compose(connect(), hoc())(C1);

// @ts-ignore
export const C3 = React.createContext();

function hoc() {
    // @ts-ignore
    return (Component) => {
        return class extends React.Component {
            /** @override */
            render() {
                return <Component {...this.props} />;
            }
        };
    };
}

// @filename: src/main.tsx
import React from 'react';
import { C1, C2, C3 } from './lib.js';

const track = React.useRef(null);
<C1 ref={(e) => { track.current = e; }} />;

<C2 />;

const { value } = React.useContext(C3);
