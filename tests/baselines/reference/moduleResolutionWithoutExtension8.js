//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtension8.ts] ////

//// [bar.cts]
// Extensionless relative path dynamic import in a cjs module
import("./foo").then(x => x); // should error, ask for extension

//// [bar.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Extensionless relative path dynamic import in a cjs module
import("./foo").then(x => x); // should error, ask for extension
