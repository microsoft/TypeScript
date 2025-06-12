//// [tests/cases/compiler/partialDiscriminatedUnionMemberHasGoodError.ts] ////

//// [partialDiscriminatedUnionMemberHasGoodError.ts]
interface TypeA {
    type: "A";
    param: string;
}

interface TypeB {
    type: "B";
    param: string;
}

type ValidType = TypeA | TypeB;

interface Wrapper {
    types: ValidType[];
}

const foo: Wrapper[] = [];

foo.push({
    types: [{
        type: "A"
    }]
});

//// [partialDiscriminatedUnionMemberHasGoodError.js]
const foo = [];
foo.push({
    types: [{
            type: "A"
        }]
});
