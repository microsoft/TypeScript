/// <reference path='fourslash.ts' />

/////*a*/import { join } from "path";
////i/*b*/mport * as fs from "fs";
////
////fs.readFileSync(join('a', 'b'));

goTo.select("a", "b");
verify.not.refactorAvailable("Convert import", "Convert named imports to namespace import");
