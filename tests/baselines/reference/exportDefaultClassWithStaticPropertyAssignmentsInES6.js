//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.ts]
export default class {
    static z: string = "Foo";
}

//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.js]
export default class default_1 {
}
(function () {
    default_1.z = "Foo";
}).call(default_1);
