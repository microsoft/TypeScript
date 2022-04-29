//@module: amd
// @Filename: requireEmitSemicolon_0.ts
export module Models {
	export class Person {
        constructor(name: string) { }
	}
}

// @Filename: requireEmitSemicolon_1.ts
///<reference path='requireEmitSemicolon_0.ts'/>
import P = require("requireEmitSemicolon_0"); // bug was we were not emitting a ; here and causing runtime failures in node

export module Database {
	export class DB {
	    public findPerson(id: number): P.Models.Person {
	        return new P.Models.Person("Rock");
	    }
	}
} 