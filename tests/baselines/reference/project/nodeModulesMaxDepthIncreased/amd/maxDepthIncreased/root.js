define(["require", "exports", "m1", "m4"], function (require, exports, m1, m4) {
    "use strict";
    m1.f1("test");
    m1.f2.a = 10;
    m1.f2.person.age = "10"; // Should error if loaded the .js files correctly
    var r1 = m4.test.charAt(2); // Should error if correctly not using the .js file but using @types info
    var r2 = 3 + m4.foo; // Should be OK if correctly using the @types .d.ts file
});
