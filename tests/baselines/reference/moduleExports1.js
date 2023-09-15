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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeScript = void 0;
    var TypeScript;
    (function (TypeScript) {
        var Strasse;
        (function (Strasse) {
            var Street;
            (function (Street) {
                var Rue = /** @class */ (function () {
                    function Rue() {
                    }
                    return Rue;
                }());
                Street.Rue = Rue;
            })(Street = Strasse.Street || (Strasse.Street = {}));
        })(Strasse = TypeScript.Strasse || (TypeScript.Strasse = {}));
    })(TypeScript || (exports.TypeScript = TypeScript = {}));
    var rue = new TypeScript.Strasse.Street.Rue();
    rue.address = "1 Main Street";
    void 0;
    if (!module.exports)
        module.exports = "";
});
