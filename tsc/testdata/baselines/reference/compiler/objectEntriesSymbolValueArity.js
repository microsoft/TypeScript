//// [tests/cases/compiler/objectEntriesSymbolValueArity.ts] ////

//// [objectEntriesSymbolValueArity.ts]
declare const database: unique symbol;
declare const models: {
    user: { create(entity?: object): void };
    [database]: { create(name: string, entity: object, id?: string): void };
};

for (const [, model] of Object.entries(models)) {
    model.create({});
}


//// [objectEntriesSymbolValueArity.js]
"use strict";
for (const [, model] of Object.entries(models)) {
    model.create({});
}
