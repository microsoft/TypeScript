// @target: es6
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}