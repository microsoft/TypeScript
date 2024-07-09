// @isolatedModules: true
// @module: commonjs

// @filename: file1.ts

import { Foo } from './file2';
console.log(Foo.BAR);

// @filename: file2.ts

export const enum Foo {
  BAR,
}
