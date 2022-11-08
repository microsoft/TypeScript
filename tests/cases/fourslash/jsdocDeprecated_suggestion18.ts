///<reference path="fourslash.ts" />

// @jsx: preserve
// @filename: foo.tsx
////interface Props {
////    /** @deprecated  */
////    x: number;
////    y: number;
////}
////function A(props: Props) {
////    return <div>{props.y}</div>
////}
////function B() {
////    return <A [|x|]={1} [|y|]={1} />
////}

const [range] = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'x' is deprecated.",
        "reportsDeprecated": true,
        "range": range
    },
]);
