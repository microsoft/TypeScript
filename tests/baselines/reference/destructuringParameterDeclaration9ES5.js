//// [destructuringParameterDeclaration9ES5.ts]

function three({} = {}) {}

function four([] = []) {}

// should not be an error

three(undefined);

three(null);

four(undefined);

four(null)

//// [destructuringParameterDeclaration9ES5.js]
function three(_a) {
    var _a = {};
}
function four(_a) {
    var _a = [];
}
// should not be an error
three(undefined);
three(null);
four(undefined);
four(null);
