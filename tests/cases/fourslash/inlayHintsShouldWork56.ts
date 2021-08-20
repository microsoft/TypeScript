/// <reference path="fourslash.ts" />

//// const object/*a*/ = { foo: 1, bar: 2 }
//// const array/*b*/ = [1, 2]
//// const a/*c*/ = object;
//// const { foo, bar } = object;
//// const {} = object;
//// const b/*d*/ = array;
//// const [ first, second ] = array;
//// const [] = array;

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': { foo: number; bar: number; }',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': number[]',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': { foo: number; bar: number; }',
        position: markers[2].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': number[]',
        position: markers[3].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayVariableTypeHints: true
});
