//// [tests/cases/compiler/interfaceAssignmentCompat.ts] ////

//// [interfaceAssignmentCompat.ts]
module M {
    export enum Color {
        Green,
        Blue,
        Brown,
    }

    export interface IEye {
        color:number;
    }

    export interface IFrenchEye {
        coleur:number;
    }

    export function CompareEyes(a:IEye,b:IEye):number {
        return a.color-b.color;
    }

    export function CompareYeux(a:IFrenchEye,b:IFrenchEye):number {
        return a.coleur-b.coleur;
    }

    export function test() {
        var x:IEye[]= [];
        var result="";
    
        x[0]={ color:Color.Brown };
        x[1]={ color:Color.Blue };
        x[2]={ color:Color.Green };

        x=x.sort(CompareYeux); // parameter mismatch
        // type of z inferred from specialized array type
        var z=x.sort(CompareEyes); // ok

        for (var i=0,len=z.length;i<len;i++) {
            result+=((Color._map[z[i].color])+"\r\n");
        }

        var eeks:IFrenchEye[] = [];
        for (var j=z.length=1;j>=0;j--) {
            eeks[j]=z[j];  // nope: element assignment
        }
        eeks=z; // nope: array assignment
        return result;
    }
}

M.test();




//// [interfaceAssignmentCompat.js]
var M;
(function (M) {
    var Color;
    (function (Color) {
        Color[Color["Green"] = 0] = "Green";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Brown"] = 2] = "Brown";
    })(Color = M.Color || (M.Color = {}));
    function CompareEyes(a, b) {
        return a.color - b.color;
    }
    M.CompareEyes = CompareEyes;
    function CompareYeux(a, b) {
        return a.coleur - b.coleur;
    }
    M.CompareYeux = CompareYeux;
    function test() {
        var x = [];
        var result = "";
        x[0] = { color: Color.Brown };
        x[1] = { color: Color.Blue };
        x[2] = { color: Color.Green };
        x = x.sort(CompareYeux); // parameter mismatch
        // type of z inferred from specialized array type
        var z = x.sort(CompareEyes); // ok
        for (var i = 0, len = z.length; i < len; i++) {
            result += ((Color._map[z[i].color]) + "\r\n");
        }
        var eeks = [];
        for (var j = z.length = 1; j >= 0; j--) {
            eeks[j] = z[j]; // nope: element assignment
        }
        eeks = z; // nope: array assignment
        return result;
    }
    M.test = test;
})(M || (M = {}));
M.test();
