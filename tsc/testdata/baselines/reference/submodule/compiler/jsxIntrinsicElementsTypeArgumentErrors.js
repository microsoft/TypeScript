//// [tests/cases/compiler/jsxIntrinsicElementsTypeArgumentErrors.tsx] ////

//// [jsxIntrinsicElementsTypeArgumentErrors.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

// opening + closing
const a = <div<>></div>; // empty type args

const b = <div<number,>></div>; // trailing comma type args

const c = <div<Missing>></div>; // nonexistant type args

const d = <div<Missing<AlsoMissing>>></div>; // nested missing type args

const e = <div<Record<object, object>>></div>; // existing but incorrect nested type args

const f = <div<number>></div>; // existing type argument with no internal issues

// self-closing
const g = <div<>/>; // empty type args

const h = <div<number,>/>; // trailing comma type args

const i = <div<Missing>/>; // nonexistant type args

const j = <div<Missing<AlsoMissing>>/>; // nested missing type args

const k = <div<Record<object, object>>/>; // existing but incorrect nested type args

const l = <div<number>/>; // existing type argument with no internal issues


//// [jsxIntrinsicElementsTypeArgumentErrors.js]
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
/// <reference path="react16.d.ts" />
const React = __importStar(require("react"));
// opening + closing
const a = React.createElement("div", null); // empty type args
const b = React.createElement("div", null); // trailing comma type args
const c = React.createElement("div", null); // nonexistant type args
const d = React.createElement("div", null); // nested missing type args
const e = React.createElement("div", null); // existing but incorrect nested type args
const f = React.createElement("div", null); // existing type argument with no internal issues
// self-closing
const g = React.createElement("div", null); // empty type args
const h = React.createElement("div", null); // trailing comma type args
const i = React.createElement("div", null); // nonexistant type args
const j = React.createElement("div", null); // nested missing type args
const k = React.createElement("div", null); // existing but incorrect nested type args
const l = React.createElement("div", null); // existing type argument with no internal issues
