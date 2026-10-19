// @declaration: true
// @emitDeclarationOnly: true
// @outDir: dist
// @strict: true

// @filename: helper.ts
declare const brand: unique symbol;

class Foo {
  [brand]: number = 1;
}

export function makeFoo() {
  return new Foo();
}

// @filename: repro.ts
import { makeFoo } from './helper';

export default () => makeFoo();
