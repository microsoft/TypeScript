//// [tests/cases/conformance/jsx/tsxElementResolution19.tsx] ////

//// [react.d.ts]
declare module "react" {

}

//// [file1.tsx]
declare module JSX {
    interface Element { }
}
export class MyClass { }

//// [file2.tsx]
// Should not elide React import
import * as React from 'react';
import {MyClass} from './file1';

<MyClass />;


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
class MyClass {
}
exports.MyClass = MyClass;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Should not elide React import
const React = require("react");
const file1_1 = require("./file1");
<file1_1.MyClass />;
