//// [tests/cases/compiler/noSubstitutionTemplateStringLiteralTypes.ts] ////

//// [noSubstitutionTemplateStringLiteralTypes.ts]
const x: `foo` = "foo";


//// [noSubstitutionTemplateStringLiteralTypes.js]
"use strict";
const x = "foo";
