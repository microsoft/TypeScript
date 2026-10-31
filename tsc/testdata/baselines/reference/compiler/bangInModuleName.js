//// [tests/cases/compiler/bangInModuleName.ts] ////

//// [a.d.ts]
declare module "http" {
}

declare module 'intern/dojo/node!http' {
    import http = require('http');
    export = http;
}

//// [a.ts]
/// <reference path="a.d.ts"/>

import * as http from 'intern/dojo/node!http';

//// [a.js]
"use strict";
/// <reference path="a.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
