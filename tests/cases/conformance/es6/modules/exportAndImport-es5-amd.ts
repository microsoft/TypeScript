//@module: amd
//@target: ES5

// @filename: m1.ts
export default function f1() {
}

// @filename: m2.ts
import f1 from "./m1";
export default function f2() {
    f1();
}
