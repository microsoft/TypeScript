// @declaration: true
// @module: umd
// @filename: foo.ts
/// <amd-module name="name_of_foo"/>
export const foo = 1;
// @filename: bar.ts
/// <amd-dependency name="name_of_foo" path="./foo" />
import {foo} from './foo';
void foo;