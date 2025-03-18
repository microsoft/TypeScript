//// [tests/cases/compiler/typeUsedAsValueError2.ts] ////

//// [helloInterface.ts]
interface HelloInterface {
    world: any;
}

export = HelloInterface;

//// [helloNamespace.ts]
namespace HelloNamespace {
    export type world = any;
}

export = HelloNamespace;

//// [world.ts]
import HelloInterface = require("helloInterface");
import HelloNamespace = require("helloNamespace");

HelloInterface.world;
HelloNamespace.world;

//// [world.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloInterface = require("helloInterface");
const HelloNamespace = require("helloNamespace");
HelloInterface.world;
HelloNamespace.world;
