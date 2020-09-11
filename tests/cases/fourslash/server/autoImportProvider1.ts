/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/@angular/forms/package.json
//// { "name": "@angular/forms", "typings": "./forms.d.ts" }

// @Filename: /node_modules/@angular/forms/forms.d.ts
//// export class PatternValidator {}

// @Filename: /tsconfig.json
//// {}

// @Filename: /package.json
//// { "dependencies": { "@angular/forms": "*" } }

// @Filename: /index.ts
//// PatternValidator/**/

goTo.marker("");
format.setOption("newLineCharacter", "\n");
verify.importFixAtPosition([
`import { PatternValidator } from "@angular/forms";

PatternValidator`
]);
