// @lib: es5
1..toString();
1.0.toString();
1.toString();
1.+2.0 + 3. ;

// Preserve whitespace where important for JS compatibility
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
var test9 = 3. + 3.
