// @jsx: react-jsx
// @strict: true
// @module: esnext
// @skipLibCheck: true
// @jsxImportSource: @test

// @filename: node_modules/@test/jsx-runtime/index.d.ts
export const jsx: any;
export const jsxs: any;

type JsxElement =
  | JsxElementArray
  | undefined
  | string
  | ((arg: { foo: "bar" }) => void);
interface JsxElementArray extends Array<JsxElement> {}

interface FragmentProps {
  children?: JsxElement;
}

export const Fragment: (props: FragmentProps) => any;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      span: any;
    }
  }
}

// @filename: index.tsx
import { Fragment } from "@test/jsx-runtime";

// This should pass - using explicit Fragment
<Fragment>
  {"ok"}
  {({ foo }) => "also ok"}
</Fragment>;

// This should also pass - using <> syntax should be equivalent
<>
  {"ok"}
  {({ foo }) => "should also be ok"}
</>;
