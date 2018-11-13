///<reference path="fourslash.ts"/>

////const {
////x,
////y,
////} = 0;

format.document();
verify.currentFileContentIs(
`const {
    x,
    y,
} = 0;`
);
