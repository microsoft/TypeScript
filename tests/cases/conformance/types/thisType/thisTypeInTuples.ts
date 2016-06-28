interface Array<T> {
    slice(): this;
}

let t: [number, string] = [42, "hello"];
let a = t.slice();
let b = t.slice(1);
let c = t.slice(0, 1);
