/// <reference path="fourslash.ts"/>

//// () => 42;
//// () => ( 42 );
//// () =>[| {
////     42
//// }|];
//// () => [|(
////     42
//// )|];
//// () =>[| "foo" +
////     "bar" +
////     "baz"|];

verify.outliningSpansInCurrentFile(test.ranges());
