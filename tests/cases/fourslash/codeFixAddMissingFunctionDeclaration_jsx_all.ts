/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: /foo.tsx

////interface P {
////    onClick: (a: number, b: string) => void;
////}
////
////const A = ({ onClick }: P) =>
////    <div onClick={onClick}></div>;
////
////const B = () =>
////    <A onClick={handleClick}></A>
////
////const C = () => {
////    return (
////       <A onClick={handleClick}></A>
////    );
////}

goTo.file("/foo.tsx");
verify.codeFixAll({
    fixId: "fixMissingFunctionDeclaration",
    fixAllDescription: ts.Diagnostics.Add_all_missing_function_declarations.message,
    newFileContent: {
        "/foo.tsx":
`interface P {
    onClick: (a: number, b: string) => void;
}

const A = ({ onClick }: P) =>
    <div onClick={onClick}></div>;

const B = () =>
    <A onClick={handleClick}></A>

const C = () => {
    function handleClick(a: number, b: string): void {
        throw new Error("Function not implemented.");
    }

    return (
       <A onClick={handleClick}></A>
    );
}

function handleClick(a: number, b: string): void {
    throw new Error("Function not implemented.");
}
`
    }
});
