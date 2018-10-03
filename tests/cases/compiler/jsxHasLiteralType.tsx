// @strictNullChecks: true
// @jsx: react
// @skipLibCheck: true
// @libFiles: lib.d.ts,react.d.ts
import * as React from "react";

interface Props {
    x?: "a" | "b";
}
class MyComponent<P extends Props = Props> extends React.Component<P, {}> {}
const m = <MyComponent x="a"/>
