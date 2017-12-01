/// <reference path='fourslash.ts' />

////class C {
////    [|export|] foo;
////    [|declare|] bar;
////    [|export|] [|declare|] foobar;
////    [|declare|] [|export|] barfoo;
////
////    constructor([|export|] conFoo,
////                [|declare|] conBar,
////                [|export|] [|declare|] conFooBar,
////                [|declare|] [|export|] conBarFoo,
////                [|static|] sue,
////                [|static|] [|export|] [|declare|] sueFooBar,
////                [|static|] [|declare|] [|export|] sueBarFoo,
////                [|declare|] [|static|] [|export|] barSueFoo) {
////    }
////}
////
////module m {
////    [|static|] a;
////    [|public|] b;
////    [|private|] c;
////    [|protected|] d;
////    [|static|] [|public|] [|private|] [|protected|] e;
////    [|public|] [|static|] [|protected|] [|private|] f;
////    [|protected|] [|static|] [|public|] g;
////}
////[|static|] a;
////[|public|] b;
////[|private|] c;
////[|protected|] d;
////[|static|] [|public|] [|private|] [|protected|] e;
////[|public|] [|static|] [|protected|] [|private|] f;
////[|protected|] [|static|] [|public|] g;

goTo.eachRange(() => verify.occurrencesAtPositionCount(0));
