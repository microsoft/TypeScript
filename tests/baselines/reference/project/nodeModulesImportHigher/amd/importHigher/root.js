define(["require", "exports", "m1"], function (require, exports, m1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    m1.f1("test");
    m1.f2.a = 10;
    m1.f2.person.age = "10"; // Error: Should be number (if direct import of m2 made the m3 module visible). 
});
