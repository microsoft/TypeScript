//@target: ES5
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
declare class C {
    [Symbol.isRegExp]: string;
}