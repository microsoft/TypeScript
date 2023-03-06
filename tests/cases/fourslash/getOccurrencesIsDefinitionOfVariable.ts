/// <reference path='fourslash.ts' />
/////*1*/var /*2*/x = 0;
////var assignmentRightHandSide = /*3*/x;
////var assignmentRightHandSide2 = 1 + /*4*/x;
////
/////*5*/x = 1;
/////*6*/x = /*7*/x + /*8*/x;
////
/////*9*/x == 1;
/////*10*/x <= 1;
////
////var preIncrement = ++/*11*/x;
////var postIncrement = /*12*/x++;
////var preDecrement = --/*13*/x;
////var postDecrement = /*14*/x--;
////
/////*15*/x += 1;
/////*16*/x <<= 1;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16');
