// @jsx: react
// @strict: true
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