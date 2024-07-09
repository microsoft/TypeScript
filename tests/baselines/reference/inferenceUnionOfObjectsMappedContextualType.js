//// [tests/cases/compiler/inferenceUnionOfObjectsMappedContextualType.ts] ////

//// [inferenceUnionOfObjectsMappedContextualType.ts]
type Entity = {
    someDate: Date | null;
} & ({ id: string; } | { id: number; })

type RowRendererMeta<TInput extends {}> = {
    [key in keyof TInput]: { key: key; caption: string; formatter?: (value: TInput[key]) => string; };
}

type RowRenderer<TInput extends {}> = RowRendererMeta<TInput>[keyof RowRendererMeta<TInput>];

const test: RowRenderer<Entity> = {
    key: 'someDate',
    caption: 'My Date',
    formatter: (value) => value ? value.toString() : '-' // value: any
}


//// [inferenceUnionOfObjectsMappedContextualType.js]
"use strict";
var test = {
    key: 'someDate',
    caption: 'My Date',
    formatter: function (value) { return value ? value.toString() : '-'; } // value: any
};
