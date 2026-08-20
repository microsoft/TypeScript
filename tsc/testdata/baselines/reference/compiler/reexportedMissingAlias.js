//// [tests/cases/compiler/reexportedMissingAlias.ts] ////

//// [second.d.ts]
export import Component = CompletelyMissing;
//// [first.d.ts]
import * as Second from './second';
export = Second;
//// [crash.ts]
import { Component } from './first';
class C extends Component { }


//// [crash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const first_1 = require("./first");
class C extends first_1.Component {
}
