/// <reference path='fourslash.ts' />

////module A/*moduleName1*/


////module A./*moduleName2*/

verify.completions(
    { marker: "moduleName1", exact: completion.globals, isNewIdentifierLocation: true },
    { marker: "moduleName2", exact: [], isNewIdentifierLocation: true },
);
