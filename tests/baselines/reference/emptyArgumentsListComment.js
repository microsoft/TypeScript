//// [emptyArgumentsListComment.ts]
declare var a;

a(/*1*/);
a(
    /*first*/
    // foo
    /*middle*/
    // bar
    /*last*/
);


//// [emptyArgumentsListComment.js]
a( /*1*/);
a(
/*first*/
// foo
/*middle*/
// bar
/*last*/
);
