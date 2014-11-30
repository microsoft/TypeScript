//// [functionTypeDeclarations.ts]

module schema {
    export function createValidator(schema: any): <T>(data: T) => T {
        return <T>(data: T) => {
            return data;
        }
    }
}

//// [functionTypeDeclarations.js]
var schema;
(function (_schema) {
    function createValidator(schema) {
        return function (data) {
            return data;
        };
    }
    _schema.createValidator = createValidator;
})(schema || (schema = {}));


//// [functionTypeDeclarations.d.ts]
declare module schema {
    function createValidator(schema: any): <T>(data: T) => T;
}
