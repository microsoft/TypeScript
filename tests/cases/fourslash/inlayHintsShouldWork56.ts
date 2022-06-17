/// <reference path="fourslash.ts" />

//// const object = { foo: 1, bar: 2 }
//// const array/*a*/ = [1, 2]
//// const a/*b*/ = object;
//// const { foo, bar } = object;
//// const {} = object;
//// const b/*c*/ = array;
//// const [ first, second ] = array;
//// const [] = array;

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': number[]',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': { foo: number; bar: number; }',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': number[]',
        position: markers[2].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayVariableTypeHints: true
});
