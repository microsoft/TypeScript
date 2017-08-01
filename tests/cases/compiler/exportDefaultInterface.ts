// @Filename: a.ts
export default interface A { value: number; }

var a: A;
a.value.toExponential();

// @Filename: b.ts
import A from './a';

var a: A;
a.value.toExponential();