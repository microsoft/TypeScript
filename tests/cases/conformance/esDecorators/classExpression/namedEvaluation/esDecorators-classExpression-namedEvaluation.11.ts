// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

// No NamedEvaluation, no class name

(@dec class {});
(class { @dec y: any });

// No NamedEvaluation, class name

(@dec class C {});
(class C { @dec y: any });
