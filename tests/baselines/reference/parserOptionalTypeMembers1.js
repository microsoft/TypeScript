//// [tests/cases/conformance/parser/ecmascript5/parserOptionalTypeMembers1.ts] ////

//// [parserOptionalTypeMembers1.ts]
interface PropertyDescriptor2 {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}

//// [parserOptionalTypeMembers1.js]
