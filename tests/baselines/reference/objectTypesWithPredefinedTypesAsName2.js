//// [objectTypesWithPredefinedTypesAsName2.ts]
// it is an error to use a predefined type as a type name

class void {} // parse error unlike the others

//// [objectTypesWithPredefinedTypesAsName2.js]
// it is an error to use a predefined type as a type name
var  = (function () {
    function () {
    }
    return ;
})();
void {}; // parse error unlike the others
