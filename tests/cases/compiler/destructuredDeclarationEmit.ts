// @declaration: true
// @filename: foo.ts
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
export { foo };
// @filename: index.ts
import { foo } from './foo';
export { foo };

const { bar: baz, bat, bam: { bork: { bar: ibar, baz: ibaz } } } = foo;
export { baz, ibaz };