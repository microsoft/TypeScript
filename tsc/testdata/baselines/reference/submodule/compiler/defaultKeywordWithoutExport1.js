//// [tests/cases/compiler/defaultKeywordWithoutExport1.ts] ////

//// [defaultKeywordWithoutExport1.ts]
declare function decorator(constructor: any): any;

@decorator
default class {}

//// [defaultKeywordWithoutExport1.js]
@decorator
default class {
}
