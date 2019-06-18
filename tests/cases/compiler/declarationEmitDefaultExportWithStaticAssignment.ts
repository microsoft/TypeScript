// @declaration: true
// @filename: foo.ts
export class Foo {}

// @filename: index1.ts
import {Foo} from './foo';
export default function Example() {}
Example.Foo = Foo

// @filename: index2.ts
import {Foo} from './foo';
export {Foo};
export default function Example() {}
Example.Foo = Foo

// @filename: index3.ts
export class Bar {}
export default function Example() {}

Example.Bar = Bar