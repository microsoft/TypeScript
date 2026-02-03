//// [tests/cases/compiler/constDeclarationShadowedByVarDeclaration3.ts] ////

//// [constDeclarationShadowedByVarDeclaration3.ts]
// Ensure only checking for const declarations shadowed by vars
class Rule {
    public regex: RegExp = new RegExp('');
    public name: string = '';

    constructor(name: string) {
        this.name = name;
    }
}

//// [constDeclarationShadowedByVarDeclaration3.js]
// Ensure only checking for const declarations shadowed by vars
var Rule = /** @class */ (function () {
    function Rule(name) {
        this.regex = new RegExp('');
        this.name = '';
        this.name = name;
    }
    return Rule;
}());
