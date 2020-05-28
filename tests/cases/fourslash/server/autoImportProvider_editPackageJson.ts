/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/@angular/forms/package.json
//// { "name": "@angular/forms", "typings": "./forms.d.ts" }

// @Filename: /node_modules/@angular/forms/forms.d.ts
//// export class PatternValidator {}

// @Filename: /tsconfig.json
//// {}

// @Filename: /package.json
//// {}

// @Filename: /index.ts
//// PatternValidator/**/

goTo.marker("");
format.setOption("newLineCharacter", "\n");
verify.importFixAtPosition([]);

goTo.file("/package.json");
edit.replaceLine(0, `{ "dependencies": { "@angular/forms": "*" } }`);

goTo.marker("");
verify.importFixAtPosition([
`import { PatternValidator } from "@angular/forms";

PatternValidator`
]);
