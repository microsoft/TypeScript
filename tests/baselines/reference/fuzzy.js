//// [fuzzy.ts]
module M {
    export interface I {
        works:()=>R;
        alsoWorks:()=>R;
        doesntWork:()=>R;
    }

    export interface R {
        anything:number;
        oneI:I;
    }

    export class C implements I {
        constructor(public x:number) {
        }
        works():R {
            return <R>({ anything: 1 });
        }

        doesntWork():R {
            return { anything:1, oneI:this };
        }

        worksToo():R {
            return <R>({ oneI: this });
        }
    }
}



//// [fuzzy.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var M;
(function (M) {
    var C = (function () {
        function C(x) {
            this.x = x;
        }
        C.prototype.works = function () {
            return ({ anything: 1 });
        };
        C.prototype.doesntWork = function () {
            return { anything: 1, oneI: this };
        };
        C.prototype.worksToo = function () {
            return ({ oneI: this });
        };
        __names(C.prototype, ["works", "doesntWork", "worksToo"]);
        return C;
    }());
    M.C = C;
})(M || (M = {}));
