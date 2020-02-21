// Selection is at the start of jsx it's still considered js.

//// function a() {
////     let foo = "bar";
////     return (
////         [|<div>
////             {foo}|]
////         </div>
////     );
//// }

verify.toggleLineComment(
    `function a() {
    let foo = "bar";
    return (
        // <div>
        //     {foo}
        </div>
    );
}`);