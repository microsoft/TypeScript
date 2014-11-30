// @declaration: true

module schema {
    export function createValidator(schema: any): <T>(data: T) => T {
        return <T>(data: T) => {
            return data;
        }
    }
}