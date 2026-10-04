//// [tests/cases/conformance/importDefer/importDefaultBindingDefer.ts] ////

//// [a.ts]
export default function defer() {
    console.log("defer from a");
}

//// [b.ts]
import defer from "a";

defer();

//// [a.js]
export default function defer() {
    console.log("defer from a");
}
//// [b.js]
import defer from "a";
defer();
