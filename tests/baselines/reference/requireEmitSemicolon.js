//// [tests/cases/compiler/requireEmitSemicolon.ts] ////

//// [requireEmitSemicolon_0.ts]
export module Models {
	export class Person {
        constructor(name: string) { }
	}
}

//// [requireEmitSemicolon_1.ts]
///<reference path='requireEmitSemicolon_0.ts'/>
import P = require("requireEmitSemicolon_0"); // bug was we were not emitting a ; here and causing runtime failures in node

export module Database {
	export class DB {
	    public findPerson(id: number): P.Models.Person {
	        return new P.Models.Person("Rock");
	    }
	}
} 

//// [requireEmitSemicolon_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Models;
    (function (Models) {
        var Person = (function () {
            function Person(name) {
            }
            return Person;
        }());
        Models.Person = Person;
    })(Models = exports.Models || (exports.Models = {}));
});
//// [requireEmitSemicolon_1.js]
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
define(["require", "exports", "requireEmitSemicolon_0"], function (require, exports, P) {
    "use strict";
    exports.__esModule = true;
    var Database;
    (function (Database) {
        var DB = (function () {
            function DB() {
            }
            DB.prototype.findPerson = function (id) {
                return new P.Models.Person("Rock");
            };
            __names(DB.prototype, ["findPerson"]);
            return DB;
        }());
        Database.DB = DB;
    })(Database = exports.Database || (exports.Database = {}));
});
