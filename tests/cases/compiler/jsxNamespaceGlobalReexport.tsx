// @strict: true
// @jsx: react-jsx
// @jsxImportSource: preact
// @types: preact/jsx-runtime
// @filename: /node_modules/preact/index.d.ts
type Defaultize<Props, Defaults> =
	// Distribute over unions
	Props extends any // Make any properties included in Default optional
		? Partial<Pick<Props, Extract<keyof Props, keyof Defaults>>> &
				// Include the remaining properties from Props
				Pick<Props, Exclude<keyof Props, keyof Defaults>>
		: never;
export namespace JSXInternal {
    interface HTMLAttributes<T = {}> { }
    interface SVGAttributes<T = {}> { }
    type LibraryManagedAttributes<Component, Props> = Component extends {
        defaultProps: infer Defaults;
    }
        ? Defaultize<Props, Defaults>
        : Props;

    interface IntrinsicAttributes {
        key?: any;
    }

    interface Element extends VNode<any> { }

    interface ElementClass extends Component<any, any> { }

    interface ElementAttributesProperty {
        props: any;
    }

    interface ElementChildrenAttribute {
        children: any;
    }

    interface IntrinsicElements {
        div: HTMLAttributes;
    }
}
export const Fragment: unique symbol;
export type ComponentType<T = {}> = {};
export type ComponentChild = {};
export type ComponentChildren = {};
export type VNode<T = {}> = {};
export type Attributes = {};
export type Component<T = {}, U = {}> = {};
// @filename: /node_modules/preact/jsx-runtime/index.d.ts
export { Fragment } from '..';
import {
    ComponentType,
    ComponentChild,
    ComponentChildren,
    VNode,
    Attributes
} from '..';
import { JSXInternal } from '..';

export function jsx(
    type: string,
    props: JSXInternal.HTMLAttributes &
        JSXInternal.SVGAttributes &
        Record<string, any> & { children?: ComponentChild },
    key?: string
): VNode<any>;
export function jsx<P>(
    type: ComponentType<P>,
    props: Attributes & P & { children?: ComponentChild },
    key?: string
): VNode<any>;

export function jsxs(
    type: string,
    props: JSXInternal.HTMLAttributes &
        JSXInternal.SVGAttributes &
        Record<string, any> & { children?: ComponentChild[] },
    key?: string
): VNode<any>;
export function jsxs<P>(
    type: ComponentType<P>,
    props: Attributes & P & { children?: ComponentChild[] },
    key?: string
): VNode<any>;

export function jsxDEV(
    type: string,
    props: JSXInternal.HTMLAttributes &
        JSXInternal.SVGAttributes &
        Record<string, any> & { children?: ComponentChildren },
    key?: string
): VNode<any>;
export function jsxDEV<P>(
    type: ComponentType<P>,
    props: Attributes & P & { children?: ComponentChildren },
    key?: string
): VNode<any>;
// This shouldn't be preferred over
//export namespace jsxDEV {
//    export import JSX = JSXInternal;
//}
// but it sort-of should work and it shouldn't crash.
declare global {
    // @ts-ignore
    export import JSX = JSXInternal;
}
// @filename: /index.tsx
export const Comp = () => <div></div>;