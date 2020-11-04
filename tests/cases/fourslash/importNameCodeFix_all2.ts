/// <reference path="fourslash.ts" />

// @Filename: /path.ts
////export declare function join(): void;

// @Filename: /os.ts
////export declare function homedir(): void;

// @Filename: /index.ts
////
////join();
////homedir();

goTo.file("/index.ts");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent: `import { homedir } from "./os";
import { join } from "./path";

join();
homedir();`
});
