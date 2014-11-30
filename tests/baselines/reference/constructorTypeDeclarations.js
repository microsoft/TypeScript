//// [constructorTypeDeclarations.ts]

module schema {
    export function createValidator(schema: any): new <T>(data: T) => T {
        return undefined;
    }
}

//// [constructorTypeDeclarations.js]
var schema;
(function (_schema) {
    function createValidator(schema) {
        return undefined;
    }
    _schema.createValidator = createValidator;
})(schema || (schema = {}));


//// [constructorTypeDeclarations.d.ts]
declare module schema {
    function createValidator(schema: any): new <T>(data: T) => T;
}
