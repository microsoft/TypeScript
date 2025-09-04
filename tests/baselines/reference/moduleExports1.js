//// [tests/cases/compiler/moduleExports1.ts] ////

//// [moduleExports1.ts]
var rue = new TypeScript.Strasse.Street.Rue();

rue.address = "1 Main Street";

void 0;

if (!module.exports) module.exports = "";

//// [moduleExports1.js]
var rue = new TypeScript.Strasse.Street.Rue();
rue.address = "1 Main Street";
void 0;
if (!module.exports)
    module.exports = "";
