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
console.log(globalThis.test.split("-"));
