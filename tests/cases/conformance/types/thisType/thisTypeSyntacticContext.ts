function f(this: { n: number }) {
}

const o: { n: number, test?: (this: { n: number }) => void } = { n: 1 }
o.test = f

o.test();
o!.test();
o.test!();
o.test!!!();
(o.test!)();
(o.test)();

