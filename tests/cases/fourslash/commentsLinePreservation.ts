/// <reference path='fourslash.ts' />

/////** This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  */
////var /*a*/a: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  */
////var /*b*/b: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  *
////  */
////var /*c*/c: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param
////  * @random tag This should be third line
////  */
////function /*d*/d(param: string) { /*1*/param = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param
////  */
////function /*e*/e(param: string) { /*2*/param = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 first line of param
////  *
////  *  param information third line
////  * @random tag This should be third line
////  */
////function /*f*/f(param1: string) { /*3*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  * @random tag This should be third line
////  */
////function /*g*/g(param1: string) { /*4*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  * @random tag This should be third line
////  */
////function /*h*/h(param1: string) { /*5*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  *
////  */
////function /*i*/i(param1: string) { /*6*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  */
////function /*j*/j(param1: string) { /*7*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 hello   @randomtag 
////  *
////  *  random information first line
////  *
////  *  random information third line
////  */
////function /*k*/k(param1: string) { /*8*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 first Line text
////  *
////  * @param param1 
////  *
////  * blank line that shouldnt be shown when starting this 
////  * second time information about the param again
////  */
////function /*l*/l(param1: string) { /*9*/param1 = "hello"; }

goTo.marker('a');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line\n\nThis is fourth Line");

goTo.marker('b');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line\n\nThis is fourth Line");

goTo.marker('c');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line\n\nThis is fourth Line");

goTo.marker('d');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('1');
verify.quickInfoIs(undefined, "");

goTo.marker('e');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('2');
verify.quickInfoIs(undefined, "");

goTo.marker('f');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('3');
verify.quickInfoIs(undefined, "first line of param\n\nparam information third line");

goTo.marker('g');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('4');
verify.quickInfoIs(undefined, "param information first line");

goTo.marker('h');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('5');
verify.quickInfoIs(undefined, "param information first line\n\nparam information third line");

goTo.marker('i');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('6');
verify.quickInfoIs(undefined, "param information first line\n\nparam information third line");

goTo.marker('j');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('7');
verify.quickInfoIs(undefined, "param information first line\n\nparam information third line");

goTo.marker('k');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('8');
verify.quickInfoIs(undefined, "hello   ");

goTo.marker('l');
verify.quickInfoIs(undefined, "This is firstLine\nThis is second Line");
goTo.marker('9');
verify.quickInfoIs(undefined, "first Line text\nblank line that shouldnt be shown when starting this \nsecond time information about the param again");
