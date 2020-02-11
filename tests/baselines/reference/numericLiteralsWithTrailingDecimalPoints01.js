//// [numericLiteralsWithTrailingDecimalPoints01.ts]
1..toString();
1.0.toString();
1.toString();
1.+2.0 + 3. ;

// Preserve whitespace and comments where important for JS compatibility
var i: number = 1;
var test1 = i.toString();
var test2 = 2.toString();
var test3 = 3 .toString();
var test4 = 3    .toString();
var test5 = 3	.toString();
var test6 = 3.['toString']();
var test7 = 3
.toString();
var test8 = new Number(4).toString();
var test9 = 3. + 3.;
var test10 = 0 /* comment */.toString();
var test11 = 3. /* comment */ .toString();
var test12 = 3
  /* comment */ .toString();
var test13 = 3.
  /* comment */ .toString();
var test14 = 3
    // comment
    .toString();
var test15 = 3.
    // comment
    .toString();
var test16 = 3  // comment time
    .toString();
var test17 = 3. // comment time again
    .toString();



//// [numericLiteralsWithTrailingDecimalPoints01.js]
1..toString();
1.0.toString();
1.;
toString();
1. + 2.0 + 3.;
// Preserve whitespace and comments where important for JS compatibility
var i = 1;
var test1 = i.toString();
var test2 = 2., toString;
();
var test3 = 3..toString();
var test4 = 3..toString();
var test5 = 3..toString();
var test6 = 3.['toString']();
var test7 = 3
    .toString();
var test8 = new Number(4).toString();
var test9 = 3. + 3.;
var test10 = 0 /* comment */.toString();
var test11 = 3. /* comment */.toString();
var test12 = 3
    /* comment */ .toString();
var test13 = 3.
    /* comment */ .toString();
var test14 = 3
    // comment
    .toString();
var test15 = 3.
    // comment
    .toString();
var test16 = 3 // comment time
    .toString();
var test17 = 3. // comment time again
    .toString();
