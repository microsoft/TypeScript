type Keys = 'a' | 'b' | 'c' | 'd';

const p = {
    a: 0,
    b: "hello",
    x: 8 // Should error, 'x' isn't in 'Keys'
} satisfies Partial<Record<Keys, unknown>>;

// Should be OK -- retain info that a is number and b is string
let a = p.a.toFixed();
let b = p.b.substring(1);
// Should error even though 'd' is in 'Keys'
let d = p.d;
