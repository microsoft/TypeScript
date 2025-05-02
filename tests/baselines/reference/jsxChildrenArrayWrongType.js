//// [tests/cases/compiler/jsxChildrenArrayWrongType.tsx] ////

//// [index.tsx]
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

//// [index.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
var b = (React.createElement(Foo, null,
    React.createElement("div", null),
    "aa"));
