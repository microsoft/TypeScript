//// [contextualPropertyOfGenericMappedType.ts]
// Repro for #24694

declare function f<T extends object>(data: T, handlers: { [P in keyof T]: (value: T[P], prop: P) => void; }): void;
f({ data: 0 }, { data(value, key) {} });


//// [contextualPropertyOfGenericMappedType.js]
// Repro for #24694
f({ data: 0 }, { data: function (value, key) { } });
