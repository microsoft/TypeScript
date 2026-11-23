//// [tests/cases/compiler/localReferenceInEnumComputedNameNoFlake.ts] ////

//// [localReferenceInEnumComputedNameNoFlake.ts]
// TS6133 must not report 'unused' as unread: the computed name references it.
const unused = { value: 1 };
export enum Example {
    [unused.value] = 0
}


//// [localReferenceInEnumComputedNameNoFlake.js]
// TS6133 must not report 'unused' as unread: the computed name references it.
const unused = { value: 1 };
export var Example;
(function (Example) {
    Example[Example[unused.value] = 0] = unused.value;
})(Example || (Example = {}));


//// [localReferenceInEnumComputedNameNoFlake.d.ts]
export declare enum Example {
    [unused.value] = 0
}
