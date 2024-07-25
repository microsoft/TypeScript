// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true
declare let dec: any;

let x: any, f: any;

// 13.2.5.5 RS: PropertyDefinitionEvaluation
//  PropertyAssignment : PropertyName `:` AssignmentExpression

({ x: @dec class { } });
({ x: class { @dec y: any; } });

({ "x": @dec class { } });
({ "x": class { @dec y: any; } });

({ 0: @dec class { } });
({ 0: class { @dec y: any; } });

({ ["x"]: @dec class { } });
({ ["x"]: class { @dec y: any; } });

({ [0]: @dec class { } });
({ [0]: class { @dec y: any; } });

({ [f()]: @dec class { } });
({ [f()]: class { @dec y: any; } });

// __proto__ setters do not perform NamedEvaluation
({ __proto__: @dec class { } });
({ "__proto__": @dec class { } });

// "__proto__" in a computed property name *does* perform NamedEvaluation
({ ["__proto__"]: @dec class { } });