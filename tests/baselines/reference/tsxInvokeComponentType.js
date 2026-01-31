//// [tests/cases/compiler/tsxInvokeComponentType.tsx] ////

//// [tsxInvokeComponentType.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React, { ComponentType } from "react";

declare const Elem: ComponentType<{ someKey: string }>;

const bad = <Elem />;

const good = <Elem someKey="ok" />;

declare const Elem2: ComponentType<{ opt?: number }>;
const alsoOk = <Elem2>text</Elem2>;


//// [tsxInvokeComponentType.js]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";
const bad = React.createElement(Elem, null);
const good = React.createElement(Elem, { someKey: "ok" });
const alsoOk = React.createElement(Elem2, null, "text");
