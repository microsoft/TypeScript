type Bit = 0 | 1;
type And<A extends Bit, B extends Bit> = [A, B] extends [1, 1] ? 1 : 0;

type Test<A extends Bit, B extends Bit> = And<A extends 1 ? 0 : 1, B extends 1 ? 0 : 1>;
//    ^? type Test<I1 extends Bit, I2 extends Bit> = 1

type a = Test<1, 1>; // 1, should be 0