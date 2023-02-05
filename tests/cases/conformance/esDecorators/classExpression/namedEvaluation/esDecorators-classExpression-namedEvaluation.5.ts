// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true
declare let dec: any, obj: any, x: any;

// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
//   AssignmentProperty : IdentifierReference Initializer?

({ x = @dec class { } } = obj);
({ x = class { @dec y: any; } } = obj);
