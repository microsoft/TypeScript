//// [ExportInterfaceWithInaccessibleTypeInTypeParameterConstraint.js]
var A;
(function (A) {
    A.Origin = { x: 0, y: 0 };

    A.Origin3d = { x: 0, y: 0, z: 0 };
})(A || (A = {}));
