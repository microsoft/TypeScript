/// <reference path='fourslash.ts' />

////Promise
////    .resolve()
////    .then(() => {/*1*/""/*2*/
////}).then(() => {/*3*//*4*/
////})/*semi1*//*semi2*/

////function foo() {
////    return Promise.resolve()
////        .then(function () {
////        ""/*a*/
////    })/*b*/
////}

////Promise
////    .then(
////    /*n1*/
////        )
////    /*n2*/
////    .then();

// @Filename: listSmart.ts
////Promise
////    .resolve().then(
////    /*listSmart1*/
////    3,
////    /*listSmart2*/
////    [
////        3
////        /*listSmart3*/
////    ]
////    /*listSmart4*/
////    );

// @Filename: listZeroIndent.ts
////Promise.resolve([
////]).then(
////    /*listZeroIndent1*/
////    [
////    /*listZeroIndent2*/
////        3
////    ]
////    );

// @Filename: listTypeParameter1.ts
////foo.then
////    <
////    /*listTypeParameter1*/
////    void
////    /*listTypeParameter2*/
////    >(
////    function (): void {
////    },
////    function (): void {
////    }
////    );

// @Filename: listComment.ts
////Promise
////    .then(
////    // euphonium
////    "k"
////    // oboe
////    );


goTo.marker('1');
edit.insertLine('');
goTo.marker('2');
verify.currentLineContentIs('        ""');
edit.insertLine('');
verify.indentationIs(8);
goTo.marker('4');
edit.insertLine('');
goTo.marker('3');
verify.currentLineContentIs('    }).then(() => {');

goTo.marker("semi1");
edit.insert(';');
verify.currentLineContentIs('    });');
goTo.marker("semi2");
edit.insert(';');
verify.currentLineContentIs('    });;');

goTo.marker('a');
edit.insert(';');
verify.currentLineContentIs('            "";');
goTo.marker('b');
edit.insert(';');
verify.currentLineContentIs('        });');

goTo.marker('n1');
verify.indentationIs(8);
goTo.marker('n2');
verify.indentationIs(4);

goTo.file("listSmart.ts");
format.document();
verify.currentFileContentIs(`Promise
    .resolve().then(

        3,

        [
            3

        ]

    );`);
goTo.marker("listSmart1");
verify.indentationIs(8);
goTo.marker("listSmart2");
verify.indentationIs(8);
goTo.marker("listSmart3");
verify.indentationIs(12);
goTo.marker("listSmart4");
verify.indentationIs(8);

goTo.file("listZeroIndent.ts");
format.document();
verify.currentFileContentIs(`Promise.resolve([
]).then(

    [

        3
    ]
);`);
goTo.marker("listZeroIndent1");
verify.indentationIs(4);
goTo.marker("listZeroIndent2");
verify.indentationIs(8);

goTo.file("listTypeParameter1.ts");
format.document();
verify.currentFileContentIs(`foo.then
    <

        void

    >(
        function(): void {
        },
        function(): void {
        }
    );`);
goTo.marker("listTypeParameter1");
verify.indentationIs(8);
goTo.marker("listTypeParameter2");
verify.indentationIs(8);

goTo.file("listComment.ts");
format.document();
verify.currentFileContentIs(`Promise
    .then(
        // euphonium
        "k"
        // oboe
    );`)
