define(["require", "exports", "m1", "m4"], function (require, exports, m1, m4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    m1.f1("test");
    m1.f2.a = 10;
    m1.f2.person.age = "10"; // Should error if loaded the .js files correctly
    var r2 = 3 + m4.foo; // Should be OK if correctly using the @types .d.ts file
});
