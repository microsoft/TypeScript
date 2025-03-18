//// [tests/cases/conformance/expressions/typeGuards/typeGuardsObjectMethods.ts] ////

//// [typeGuardsObjectMethods.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// variables in global
var num: number;
var strOrNum: string | number;
var var1: string | number;
var obj1 = {
    // Inside method
    method(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string

        return strOrNum;
    },
    get prop() {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        return strOrNum;
    },
    set prop(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
};
// return expression of the method
strOrNum = typeof obj1.method(strOrNum) === "string" && obj1.method(strOrNum); 

// accessing getter property
strOrNum = typeof obj1.prop === "string" && obj1.prop; 

//// [typeGuardsObjectMethods.js]
var num;
var strOrNum;
var var1;
var obj1 = {
    method(param) {
        num = typeof var1 === "string" && var1.length;
        var var2;
        num = typeof var2 === "string" && var2.length;
        num = typeof param === "string" && param.length;
        return strOrNum;
    },
    get prop() {
        num = typeof var1 === "string" && var1.length;
        var var2;
        num = typeof var2 === "string" && var2.length;
        return strOrNum;
    },
    set prop(param) {
        num = typeof var1 === "string" && var1.length;
        var var2;
        num = typeof var2 === "string" && var2.length;
        num = typeof param === "string" && param.length;
    }
};
strOrNum = typeof obj1.method(strOrNum) === "string" && obj1.method(strOrNum);
strOrNum = typeof obj1.prop === "string" && obj1.prop;
