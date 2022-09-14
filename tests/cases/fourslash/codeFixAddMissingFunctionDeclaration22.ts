/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: foo.tsx

////interface P {
////    onClick: (a: number, b: string) => void;
////}
////
////const A = ({ onClick }: P) =>
////    <div onClick={onClick}></div>;
////
////const B = () =>
////    <A onClick={handleClick}></A>

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "handleClick"],
    newFileContent:
`interface P {
    onClick: (a: number, b: string) => void;
}

const A = ({ onClick }: P) =>
    <div onClick={onClick}></div>;

const B = () =>
    <A onClick={handleClick}></A>

function handleClick(a: number, b: string): void {
    throw new Error("Function not implemented.");
}
`
});
