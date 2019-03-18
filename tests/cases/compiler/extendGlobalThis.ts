// @filename: extension.d.ts
declare global {
    namespace globalThis  {
        var test: string;
    }
}

export {}

// @filename: index.ts
import "./extention";

globalThis.tests = "a-b";
foo.bar = "test";

console.log(globalThis.test.split("-"));
