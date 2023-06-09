//// [tests/cases/compiler/targetTypeObjectLiteral.ts] ////

//// [targetTypeObjectLiteral.ts]
var z: { x: number; y: (w:string)=>number;} = {

    x: 12,

    y: function(w) {

        return 0;

    }

}

//// [targetTypeObjectLiteral.js]
var z = {
    x: 12,
    y: function (w) {
        return 0;
    }
};
