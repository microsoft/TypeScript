var array = [1, 2, 3];
var array1 = [true, 2, 3];  // Contextual type by the numeric index type of the contextual type
var tup: [number, number, number] = [1, 2, 3, 4];
var tup1: [number, number, number] = [1, 2, 3, "string"];  // error
var tup2: [number|string, number|string, number|string] = [1, 2, 3, "string"];

var spr = [1, 2, 3, ...array];
var spr1 = [1, 2, 3, ...tup];
var spr2:[number, number, number] = [1, 2, 3, ...tup];  // error
