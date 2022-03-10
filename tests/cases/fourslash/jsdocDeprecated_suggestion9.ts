///<reference path="fourslash.ts" />

// @Filename: first.ts
//// export class logger { }
// @Filename: second.ts
//// import { logger } from './first';
//// new logger()

goTo.file('second.ts')
verify.noErrors()
verify.getSuggestionDiagnostics([]);
