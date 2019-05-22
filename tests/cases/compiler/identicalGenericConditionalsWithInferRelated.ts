function f<X>(arg: X) {
    type Cond1 = X extends [infer A] ? A : never;
    type Cond2 = X extends [infer A] ? A : never;

    let x: Cond1 = null as any;
    let y: Cond2 = null as any;
    x = y; // is err, should be ok
    y = x; // is err, should be ok
}
