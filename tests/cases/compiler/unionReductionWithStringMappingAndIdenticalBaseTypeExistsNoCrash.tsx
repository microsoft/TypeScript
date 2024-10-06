// @strict: true
// @noEmit: true
// @target: esnext
// @lib: dom, esnext
// @jsx: react
// @esModuleInterop: true
// @moduleResolution: node

// https://github.com/microsoft/TypeScript/issues/56688

// @filename: node_modules/@types/react/index.d.ts

export = React;
export as namespace React;

declare namespace React {
  type ReactNode =
    | ReactElement
    | string
    | number
    | Iterable<ReactNode>
    | boolean
    | null
    | undefined;
  type JSXElementConstructor<P> = (props: P) => ReactNode;
  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>,
  > {
    type: T;
    props: P;
    key: string | null;
  }

  type ComponentProps<T extends JSXElementConstructor<any>> =
    T extends JSXElementConstructor<infer P> ? P : never;

  interface ExoticComponent<P = {}> {
    (props: P): ReactNode;
    readonly $$typeof: symbol;
  }

  type LazyExoticComponent<T extends JSXElementConstructor<any>> =
    ExoticComponent<ComponentProps<T>> & {
      readonly _result: T;
    };

  function createElement(): void;

  namespace JSX {
    interface Element extends GlobalJSXElement {}
    interface ElementChildrenAttribute
      extends GlobalJSXElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = GlobalJSXLibraryManagedAttributes<
      C,
      P
    >;
    interface IntrinsicElements extends GlobalJSXIntrinsicElements {}
  }
}

type ReactManagedAttributes<C, P> = C extends { defaultProps: infer D }
  ? P & D
  : P;

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementChildrenAttribute {
      children: {};
    }
    type LibraryManagedAttributes<C, P> = C extends React.LazyExoticComponent<
      infer T
    >
      ? ReactManagedAttributes<T, P>
      : ReactManagedAttributes<C, P>;
    interface IntrinsicElements {
      div: {};
      span: {};
    }
  }
}

interface GlobalJSXElement extends JSX.Element {}
interface GlobalJSXElementChildrenAttribute
  extends JSX.ElementChildrenAttribute {}
type GlobalJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<
  C,
  P
>;
interface GlobalJSXIntrinsicElements extends JSX.IntrinsicElements {}

// @filename: src/index.tsx
import React from 'react'

declare function upperFirst<T extends string>(str: T): Capitalize<T>

const displayEnum = (value: string) => upperFirst(value.toLowerCase())

function Comp() {
  return <div>
    <span>Scope:</span> {displayEnum("VALUE")}
  </div>
}
