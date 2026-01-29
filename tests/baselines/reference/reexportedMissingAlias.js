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
import { Component } from './first';
class C extends Component {
}
