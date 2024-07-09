/// <reference path='fourslash.ts' />

/////*a*/import { join } from "path";
/////*b*/import * as fs from "fs";
////
////fs.readFileSync(join('a', 'b'));

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as path from "path";
import * as fs from "fs";

fs.readFileSync(path.join('a', 'b'));`,
});
