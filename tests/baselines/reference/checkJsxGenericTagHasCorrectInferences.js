//// [tests/cases/conformance/jsx/checkJsxGenericTagHasCorrectInferences.tsx] ////

//// [file.tsx]
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

//// [file.jsx]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
let a = <GenericComponent initialValues={{ x: "y" }} nextValues={a => a}/>; // No error
let b = <GenericComponent initialValues={12} nextValues={a => a}/>; // No error - Values should be reinstantiated with `number` (since `object` is a default, not a constraint)
let c = <GenericComponent initialValues={{ x: "y" }} nextValues={a => ({ x: a.x })}/>; // No Error
let d = <GenericComponent initialValues={{ x: "y" }} nextValues={a => a.x}/>; // Error - `string` is not assignable to `{x: string}`
