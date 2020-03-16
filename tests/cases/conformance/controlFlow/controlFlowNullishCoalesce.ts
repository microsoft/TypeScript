// @strict: true

// assignments in shortcutting rhs
let a: number;
o ?? (a = 1);
a.toString();

// assignment flow
declare const o: { x: number } | undefined;
let x: { x: number } | boolean;
if (x = o ?? true) {
    x;
}

