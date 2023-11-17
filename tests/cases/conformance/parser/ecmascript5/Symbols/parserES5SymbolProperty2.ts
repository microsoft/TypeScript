//@target: ES5
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
interface I {
    [Symbol.unscopables](): string;
}