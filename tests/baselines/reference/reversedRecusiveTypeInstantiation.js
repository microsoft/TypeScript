//// [reversedRecusiveTypeInstantiation.ts]
interface A<StringArgPos1, NumberArgPos2> {
   xPos1 : StringArgPos1
   yPos2 : NumberArgPos2
   zPos2Pos1 : A<NumberArgPos2, StringArgPos1>
}

var a : A<string, number>
a.zPos2Pos1.xPos1 = 1



//// [reversedRecusiveTypeInstantiation.js]
var a;
a.zPos2Pos1.xPos1 = 1;
