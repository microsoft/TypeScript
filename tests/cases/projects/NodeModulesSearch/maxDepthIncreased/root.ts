import * as m1 from "m1";
import * as m4 from "m4";

m1.f1("test");
m1.f2.a = 10;

m1.f2.person.age = "10";    // Should error if loaded the .js files correctly

let r2 = 3 + m4.foo; // Should be OK if correctly using the @types .d.ts file
