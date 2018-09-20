// Fixes #15094
// @Filename: second.d.ts
export import Component = CompletelyMissing;
// @Filename: first.d.ts
import * as Second from './second';
export = Second;
// @Filename: crash.ts
import { Component } from './first';
class C extends Component { }
