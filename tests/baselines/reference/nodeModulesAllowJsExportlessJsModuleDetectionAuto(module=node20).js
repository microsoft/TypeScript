//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsExportlessJsModuleDetectionAuto.ts] ////

//// [foo.cjs]
// this file is a module despite having no imports
//// [bar.js]
// however this file is _not_ a module

//// [foo.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this file is a module despite having no imports
//// [bar.js]
// however this file is _not_ a module
