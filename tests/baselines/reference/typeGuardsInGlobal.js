//// [typeGuardsInGlobal.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// variables in global
var num: number;
var var1: string | number;
if (typeof var1 === "string") {
    num = var1.length; // string
}
else {
    num = var1; // number
}


//// [typeGuardsInGlobal.js]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
// variables in global
var num;
var var1;
if (typeof var1 === "string") {
    num = var1.length; // string
}
else {
    num = var1; // number
}
