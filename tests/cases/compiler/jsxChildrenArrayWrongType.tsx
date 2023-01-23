// @jsx: react
// @strict: true
// @target: ES5
// @module: ESNext
// @esModuleInterop: true
// @skipLibCheck: true

// @filename: index.tsx
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

// target is ES5, so no `Iterable` type is present.

interface PropsType {
    children: [string, number] | boolean[];
}
declare class Foo extends React.Component<PropsType, {}> {}
const b = (
    <Foo>
        {<div/> as unknown}
        {"aa"}
    </Foo>
);