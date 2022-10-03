import * as m1 from "m1";
import * as m2 from "m2";

m1.f1("test");
m1.f2.a = 10;
m1.f2.person.age = "10"; // Error: Should be number (if direct import of m2 made the m3 module visible). 
