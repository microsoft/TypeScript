/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: foo.tsx

////const A = () => {
////    return (<div onClick={() => handleClick()}></div>);
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "handleClick"],
    newFileContent:
`const A = () => {
    function handleClick() {
        throw new Error("Function not implemented.");
    }

    return (<div onClick={() => handleClick()}></div>);
}`
});
