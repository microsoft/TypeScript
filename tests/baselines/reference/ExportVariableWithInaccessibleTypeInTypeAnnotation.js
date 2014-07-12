//// [ExportVariableWithInaccessibleTypeInTypeAnnotation.js]
var A;
(function (A) {
    // valid since Point is exported
    A.Origin = { x: 0, y: 0 };

    // invalid Point3d is not exported
    A.Origin3d = { x: 0, y: 0, z: 0 };
})(A || (A = {}));
