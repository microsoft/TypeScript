//// [tests/cases/compiler/moduleExports1.ts] ////

//// [moduleExports1.ts]
<<<<<<< HEAD
export module TypeScript.Strasse.Street {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
export namespace TypeScript.Strasse.Street {
=======
export namespace TypeScript.Strasse.Street {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
	export class Rue {
		public address:string;
	}	
}

var rue = new TypeScript.Strasse.Street.Rue();

rue.address = "1 Main Street";

void 0;

if (!module.exports) module.exports = "";

//// [moduleExports1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScript = void 0;
var TypeScript;
(function (TypeScript) {
    let Strasse;
    (function (Strasse) {
        let Street;
        (function (Street) {
            class Rue {
                address;
            }
            Street.Rue = Rue;
        })(Street = Strasse.Street || (Strasse.Street = {}));
    })(Strasse = TypeScript.Strasse || (TypeScript.Strasse = {}));
})(TypeScript || (exports.TypeScript = TypeScript = {}));
var rue = new TypeScript.Strasse.Street.Rue();
rue.address = "1 Main Street";
void 0;
if (!module.exports)
    module.exports = "";
