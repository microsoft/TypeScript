// @preserveConstEnums: true
// @target: esnext

// @filename: a.ts
const enum A {
    Foo
};
export { A };

// @filename: b.ts
import { A } from './a';
export { A as B };
