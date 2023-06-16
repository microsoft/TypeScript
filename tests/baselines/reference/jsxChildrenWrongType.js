//// [tests/cases/compiler/jsxChildrenWrongType.tsx] ////

//// [other.tsx]
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

//// [other.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
const b = (React.createElement(Foo, null,
    React.createElement("div", null),
    "aa"));
