// Selection is at the start of jsx its still js.

//@Filename: file.tsx
//// let a = (
////     [|<div>
////         some text|]
////     </div>
//// );

verify.toggleLineComment(
    `let a = (
    //<div>
    //    some text
    </div>
);`);