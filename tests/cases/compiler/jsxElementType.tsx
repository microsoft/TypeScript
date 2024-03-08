// @strict: true
// @jsx: react
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
