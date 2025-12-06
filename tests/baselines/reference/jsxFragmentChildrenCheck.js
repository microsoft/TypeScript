//// [tests/cases/compiler/jsxFragmentChildrenCheck.tsx] ////

//// [index.d.ts]
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

//// [index.tsx]
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


//// [index.js]
import { jsxs as _jsxs, Fragment as _Fragment } from "@test/jsx-runtime";
import { Fragment } from "@test/jsx-runtime";
// This should pass - using explicit Fragment
_jsxs(Fragment, { children: ["ok", function (_a) {
            var foo = _a.foo;
            return "also ok";
        }] });
// This should also pass - using <> syntax should be equivalent
_jsxs(_Fragment, { children: ["ok", function (_a) {
            var foo = _a.foo;
            return "should also be ok";
        }] });
