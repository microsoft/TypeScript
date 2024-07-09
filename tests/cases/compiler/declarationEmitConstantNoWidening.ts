// @declaration: true
export const FOO = 'FOO'; 
export class Bar {
    readonly type = FOO; // Should be widening literal "FOO" - so either `typeof "FOO"` or = "FOO"
}