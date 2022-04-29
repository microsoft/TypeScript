// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void>{
    /* Note - some of these comments are removed during the refactor. This is not ideal. */

    // a
    /*b*/ return /*c*/ fetch( /*d*/ 'https://typescriptlang.org' /*e*/).then( /*f*/ result /*g*/ => { /*h*/ console.log(/*i*/ result /*j*/) /*k*/}/*l*/);
    // m
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void>{
    /* Note - some of these comments are removed during the refactor. This is not ideal. */

    // a
    /*b*/ const result /*g*/ = await fetch(/*d*/ 'https://typescriptlang.org' /*e*/);
    console.log(/*i*/ result /*j*/); /*k*/
    // m
}