let a1: (< 1);
let a2: (< -1);
let a3: (<= 1);
let a4: (<= -1);
let a5: (> 1);
let a6: (> -1);
let a7: (>= 1);
let a8: (>= -1);

let a9: ((> 0));
let a10: (((> 0)));

declare function b1(): (> -3.14);
declare function b2(b2arg: (>= 42)): void;
declare function b3(b3arg: (< 7.4)): (> 10);

interface C {
    c1: (>= 4);
    c2(c2arg: (> -6)): void;
    c3(): (> 9.6);
    c4(c4arg: (<= -2)): (> 100);
}

class D {
    public d1: (> 0);
    d2(d2arg: (> 0)) {
        return d2arg;
    }
}

type E1 = (> 4);
type E2 = (<= 10);
type E3 = (>= -42);

type F1 = (<= "notanumber");
type F2 = (>= "0");
type F3 = (<4>);
type F4 = (< +);
type F5 = (> +);
type F6 = (> &);
type F7 = (>= );
type F8 = (< );
