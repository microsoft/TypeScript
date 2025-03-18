//// [tests/cases/compiler/moduleExports1.ts] ////

//// [moduleExports1.ts]
export module TypeScript.Strasse.Street {
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
