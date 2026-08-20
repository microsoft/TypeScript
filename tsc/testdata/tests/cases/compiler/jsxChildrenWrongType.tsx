// @jsx: react
// @strict: true
// @target: ES2017
// @module: ESNext
// @esModuleInterop: true
// @skipLibCheck: true

// @filename: other.tsx
// @exactOptionalPropertyTypes: true
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />


interface PropsType {
    children: [string, number?] | Iterable<boolean>;
}
declare class Foo extends React.Component<PropsType, {}> {}
const b = (
    <Foo>
        {<div/> as unknown}
        {"aa"}
    </Foo>
);