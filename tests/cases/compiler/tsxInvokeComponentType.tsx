// @jsx: react
// @strict: true
// @esModuleInterop: true
/// <reference path="/.lib/react16.d.ts" />
import React, { ComponentType } from "react";

declare const Elem: ComponentType<{ someKey: string }>;

const bad = <Elem />;

const good = <Elem someKey="ok" />;

declare const Elem2: ComponentType<{ opt?: number }>;
const alsoOk = <Elem2>text</Elem2>;
