// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true
declare let dec: any, obj: any, x: any;

// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?

({ y: x = @dec class { } } = obj);
({ y: x = class { @dec y: any; } } = obj);
