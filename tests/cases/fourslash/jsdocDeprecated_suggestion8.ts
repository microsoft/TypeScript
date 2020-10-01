///<reference path="fourslash.ts" />

// @Filename: first.ts
//// /** @deprecated */
//// export declare function tap<T>(next: null): void;
//// export declare function tap<T>(next: T): T;
// @Filename: second.ts
//// import { tap } from './first';
//// tap

goTo.file('second.ts')
verify.noErrors()
verify.getSuggestionDiagnostics([]);
