// @noTypesAndSymbols: true
// @allowJs: true
// @checkJs: true

// @Filename: /a.ts
export default class A {}
export class B {}
export class C {}

// @Filename: /b.ts
import type A, { B, C } from './a';

// @Filename: /a.js
import type A from './a';
export type { A };

// @Filename: /c.ts
namespace ns {
  export class Foo {}
}
import type Foo = ns.Foo;
