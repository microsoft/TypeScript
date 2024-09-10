/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/@angular/forms/package.json
//// { "name": "@angular/forms", "typings": "./forms.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/@angular/forms/forms.d.ts
//// export class PatternValidator {}

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {}

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "@angular/forms": "*" } }

// @Filename: /home/src/workspaces/project/index.ts
//// PatternValidator/**/

goTo.marker("");
format.setOption("newLineCharacter", "\n");
verify.importFixAtPosition([
`import { PatternValidator } from "@angular/forms";

PatternValidator`
]);
