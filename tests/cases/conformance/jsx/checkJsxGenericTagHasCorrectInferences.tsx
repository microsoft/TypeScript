// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts
import * as React from "react";
interface BaseProps<T> {
  initialValues: T;
  nextValues: (cur: T) => T;
}
declare class GenericComponent<Props = {}, Values = object> extends React.Component<Props & BaseProps<Values>, {}> {
  iv: Values;
}

let a = <GenericComponent initialValues={{ x: "y" }} nextValues={a => a} />; // No error
let b = <GenericComponent initialValues={12} nextValues={a => a} />; // No error - Values should be reinstantiated with `number` (since `object` is a default, not a constraint)
let c = <GenericComponent initialValues={{ x: "y" }} nextValues={a => ({ x: a.x })} />; // No Error
let d = <GenericComponent initialValues={{ x: "y" }} nextValues={a => a.x} />; // Error - `string` is not assignable to `{x: string}`