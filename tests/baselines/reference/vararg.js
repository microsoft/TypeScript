//// [tests/cases/compiler/vararg.ts] ////

//// [vararg.ts]
module M {
    export class C {
        public f(x:string,...rest:number[]) {
            var sum=0;
            for (var i=0;i<rest.length;i++) {
                sum+=rest[i];
            }
            result+=(x+": "+sum);
            return result;
        }

        public fnope(x:string,...rest:number) {
    
        }

        public fonly(...rest:string[]) {
            builder="";
            for (var i=0;i<rest.length;i++) {
                builder+=rest[i];
            }
            return builder;
        }
    }
}

var x=new M.C();
var result="";
result+=x.f(x,3,3); // bad first param
result+=x.f(3,"hello",3); // bad second param
result+=x.f("hello",3,3,3,3,3); // ok
result+=x.f("hello"); // ok varargs length 0
result+=x.fonly(3); // ok conversion
result+=x.fonly(x); // bad param
result+=x.fonly("a"); // ok 
result+=x.fonly("a","b","c","d"); //ok 




//// [vararg.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.f = function (x) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            var sum = 0;
            for (var i = 0; i < rest.length; i++) {
                sum += rest[i];
            }
            result += (x + ": " + sum);
            return result;
        };
        C.prototype.fnope = function (x) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
        };
        C.prototype.fonly = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            builder = "";
            for (var i = 0; i < rest.length; i++) {
                builder += rest[i];
            }
            return builder;
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var x = new M.C();
var result = "";
result += x.f(x, 3, 3); // bad first param
result += x.f(3, "hello", 3); // bad second param
result += x.f("hello", 3, 3, 3, 3, 3); // ok
result += x.f("hello"); // ok varargs length 0
result += x.fonly(3); // ok conversion
result += x.fonly(x); // bad param
result += x.fonly("a"); // ok 
result += x.fonly("a", "b", "c", "d"); //ok 
