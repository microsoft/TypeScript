//// [tests/cases/conformance/expressions/typeGuards/typeGuardsInFunction.ts] ////

//// [typeGuardsInFunction.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// variables in global
var num: number;
var var1: string | number;
// Inside function declaration
function f(param: string | number) {
    // global vars in function declaration
    num =  typeof var1 === "string" && var1.length; // string

    // variables in function declaration
    var var2: string | number;
    num = typeof var2 === "string" && var2.length; // string

    // parameters in function declaration
    num = typeof param === "string" && param.length; // string
}
// local function declaration
function f1(param: string | number) {
    var var2: string | number;
    function f2(param1: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables from outer function declaration
        num = typeof var2 === "string" && var2.length; // string

        // parameters in outer declaration
        num = typeof param === "string" && param.length; // string

        // local
        var var3: string | number;
        num = typeof var3 === "string" && var3.length; // string
        num = typeof param1 === "string" && param1.length; // string
    }
}
// Function expression
function f2(param: string | number) {
    // variables in function declaration
    var var2: string | number;
    // variables in function expressions
    var r = function (param1: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables from outer function declaration
        num = typeof var2 === "string" && var2.length; // string

        // parameters in outer declaration
        num = typeof param === "string" && param.length; // string

        // local
        var var3: string | number;
        num = typeof var3 === "string" && var3.length; // string
        num = typeof param1 === "string" && param1.length; // string
    } (param);
}
// Arrow expression
function f3(param: string | number) {
    // variables in function declaration
    var var2: string | number;
    // variables in function expressions
    var r = ((param1: string | number) => {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables from outer function declaration
        num = typeof var2 === "string" && var2.length; // string

        // parameters in outer declaration
        num = typeof param === "string" && param.length; // string

        // local
        var var3: string | number;
        num = typeof var3 === "string" && var3.length; // string
        num = typeof param1 === "string" && param1.length; // string
    })(param);
}
// Return type of function
// Inside function declaration
var strOrNum: string | number;
function f4() {
    var var2: string | number = strOrNum;
    return var2;
}
strOrNum = typeof f4() === "string" && f4(); // string | number 

//// [typeGuardsInFunction.js]
var num;
var var1;
function f(param) {
    num = typeof var1 === "string" && var1.length;
    var var2;
    num = typeof var2 === "string" && var2.length;
    num = typeof param === "string" && param.length;
}
function f1(param) {
    var var2;
    function f2(param1) {
        num = typeof var1 === "string" && var1.length;
        num = typeof var2 === "string" && var2.length;
        num = typeof param === "string" && param.length;
        var var3;
        num = typeof var3 === "string" && var3.length;
        num = typeof param1 === "string" && param1.length;
    }
}
function f2(param) {
    var var2;
    var r = function (param1) {
        num = typeof var1 === "string" && var1.length;
        num = typeof var2 === "string" && var2.length;
        num = typeof param === "string" && param.length;
        var var3;
        num = typeof var3 === "string" && var3.length;
        num = typeof param1 === "string" && param1.length;
    }(param);
}
function f3(param) {
    var var2;
    var r = ((param1) => {
        num = typeof var1 === "string" && var1.length;
        num = typeof var2 === "string" && var2.length;
        num = typeof param === "string" && param.length;
        var var3;
        num = typeof var3 === "string" && var3.length;
        num = typeof param1 === "string" && param1.length;
    })(param);
}
var strOrNum;
function f4() {
    var var2 = strOrNum;
    return var2;
}
strOrNum = typeof f4() === "string" && f4();
