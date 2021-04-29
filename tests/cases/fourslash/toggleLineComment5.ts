// Comments inside strings are still considered comments.

//// let var1 = `
//// //some stri[|ng
//// //some other|] string
//// `;
////
//// let var2 = `
//// some stri[|ng
//// some other|] string
//// `;

verify.toggleLineComment(
    `let var1 = \`
some string
some other string
\`;

let var2 = \`
//some string
//some other string
\`;`);