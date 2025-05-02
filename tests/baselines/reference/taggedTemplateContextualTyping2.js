//// [tests/cases/conformance/expressions/contextualTyping/taggedTemplateContextualTyping2.ts] ////

//// [taggedTemplateContextualTyping2.ts]
type FuncType1 = (x: <T>(p: T) => T) => typeof x;
type FuncType2 = (x: <S, T>(p: T) => T) => typeof x;

function tempTag2(templateStrs: TemplateStringsArray, f: FuncType1, x: number): number;
function tempTag2(templateStrs: TemplateStringsArray, f: FuncType2, h: FuncType2, x: string): string;
function tempTag2(...rest: any[]): any {
    return undefined;
}

// If contextual typing takes place, these functions should work.
// Otherwise, the arrow functions' parameters will be typed as 'any',
// and it is an error to invoke an any-typed value with type arguments,
// so this test will error.
tempTag2 `${ x => { x<number>(undefined); return x; }         }${ 0 }`;
tempTag2 `${ x => { x<number, string>(undefined); return x; } }${ y => { y<string, number>(null); return y; } }${ "hello" }`;
tempTag2 `${ x => { x<number, string>(undefined); return x; } }${ undefined }${ "hello" }`;

//// [taggedTemplateContextualTyping2.js]
function tempTag2(...rest) {
    return undefined;
}
// If contextual typing takes place, these functions should work.
// Otherwise, the arrow functions' parameters will be typed as 'any',
// and it is an error to invoke an any-typed value with type arguments,
// so this test will error.
tempTag2 `${x => { x(undefined); return x; }}${0}`;
tempTag2 `${x => { x(undefined); return x; }}${y => { y(null); return y; }}${"hello"}`;
tempTag2 `${x => { x(undefined); return x; }}${undefined}${"hello"}`;
