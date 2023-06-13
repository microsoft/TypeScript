//// [tests/cases/compiler/tsxUnionMemberChecksFilterDataProps.tsx] ////

//// [tsxUnionMemberChecksFilterDataProps.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React, { ReactElement } from "react";

declare function NotHappy(props: ({ fixed?: boolean } | { value?: number })): ReactElement<any>;
declare function Happy(props: { fixed?: boolean, value?: number }): ReactElement<any>;

const RootNotHappy = () => (<NotHappy data-testid="my-test-id" />);
const RootHappy = () => (<Happy data-testid="my-test-id" />);


//// [tsxUnionMemberChecksFilterDataProps.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
var RootNotHappy = function () { return (react_1.default.createElement(NotHappy, { "data-testid": "my-test-id" })); };
var RootHappy = function () { return (react_1.default.createElement(Happy, { "data-testid": "my-test-id" })); };
