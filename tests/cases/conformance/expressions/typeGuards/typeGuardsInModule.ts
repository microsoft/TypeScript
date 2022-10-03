// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// variables in global
var num: number;
var strOrNum: string | number;
var var1: string | number;
// Inside module
module m1 {
    // global vars in function declaration
    num = typeof var1 === "string" && var1.length; // string

    // variables in module declaration
    var var2: string | number;
    if (typeof var2 === "string") {
        num = var2.length; // string
    }
    else {
        num = var2; // number
    }

    // exported variable in the module
    export var var3: string | number;
    if (typeof var3 === "string") {
        strOrNum = var3; // string | number
    }
    else {
        strOrNum = var3; // string | number
    }
}
// local module
module m2 {
    var var2: string | number;
    export var var3: string | number;
    module m3 {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // local variables from outer module declaration
        num = typeof var2 === "string" && var2.length; // string

        // exported variable from outer the module
        strOrNum = typeof var3 === "string" && var3; // string | number

        // variables in module declaration
        var var4: string | number;
        if (typeof var4 === "string") {
            num = var4.length; // string
        }
        else {
            num = var4; // number
        }

        // exported variable in the module
        export var var5: string | number;
        if (typeof var5 === "string") {
            strOrNum = var5; // string | number
        }
        else {
            strOrNum = var5; // string | number
        }
    }
}
// Dotted module
module m3.m4 {
    // global vars in function declaration
    num = typeof var1 === "string" && var1.length; // string

    // variables in module declaration
    var var2: string | number;
    if (typeof var2 === "string") {
        num = var2.length; // string
    }
    else {
        num = var2; // number
    }

    // exported variable in the module
    export var var3: string | number;
    if (typeof var3 === "string") {
        strOrNum = var3; // string | number
    }
    else {
        strOrNum = var3; // string | number
    }
}
