/// <reference path='fourslash.ts' />

/////*a*/import { join } from "path";
////import * as fs from "fs";/*b*/
////
////fs.readFileSync(join('a', 'b'));

goTo.select("a", "b");
verify.not.refactorAvailable("Convert import", "Convert named imports to namespace import");
