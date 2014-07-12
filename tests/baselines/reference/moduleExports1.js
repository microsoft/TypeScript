//// [moduleExports1.js]
define(["require", "exports"], function(require, exports) {
    (function (TypeScript) {
        (function (Strasse) {
            (function (Street) {
                var Rue = (function () {
                    function Rue() {
                    }
                    return Rue;
                })();
                Street.Rue = Rue;
            })(Strasse.Street || (Strasse.Street = {}));
            var Street = Strasse.Street;
        })(TypeScript.Strasse || (TypeScript.Strasse = {}));
        var Strasse = TypeScript.Strasse;
    })(exports.TypeScript || (exports.TypeScript = {}));
    var TypeScript = exports.TypeScript;

    var rue = new TypeScript.Strasse.Street.Rue();

    rue.address = "1 Main Street";

    void 0;

    if (!module.exports)
        module.exports = "";
});
