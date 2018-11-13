// ==ORIGINAL==

import { d } from "lib1";
import { b } from "lib1";
import { c } from "lib2";
import { a } from "lib2";
a + b + c + d;

// ==ORGANIZED==

import { b, d } from "lib1";
import { a, c } from "lib2";
a + b + c + d;
