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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
var Models;
(function (Models) {
    class Person {
        constructor(name) { }
    }
    Models.Person = Person;
})(Models || (exports.Models = Models = {}));
//// [requireEmitSemicolon_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const P = require("requireEmitSemicolon_0");
var Database;
(function (Database) {
    class DB {
        findPerson(id) {
            return new P.Models.Person("Rock");
        }
    }
    Database.DB = DB;
})(Database || (exports.Database = Database = {}));
