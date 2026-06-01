// @target: es2020
// @module: commonjs
// @strict: true
// @esModuleInterop: true

// @Filename: module.ts
class X {
    public static a = 1;
    protected static b = 2;
    private static c = 3;
}
export = X;

// @Filename: main.ts
import { a, b, c } from "./module";
