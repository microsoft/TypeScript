// @strict: true

// Relating 'Box<string>' to 'Box<number>' measures the variances of 'Box', which
// resolves the return type of 'm', which relates 'Box<string>' to 'Box<number>'
// while those variances are incomplete. Results computed meanwhile must not be
// kept, so 'm' returns both types.

// @filename: first.ts
declare let b1: Box<string>;
declare let b2: Box<number>;
b1 = b2;

// @filename: box.ts
declare let a1: Box<string>;
declare let a2: Box<number>;
declare const cond: boolean;
class Box<T> {
    value!: T;
    m() {
        if (cond) return a1;
        return a2;
    }
}
const r = new Box<boolean>().m();
