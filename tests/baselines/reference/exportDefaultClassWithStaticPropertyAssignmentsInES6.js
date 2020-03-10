//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.ts]
export default class {
    static z: string = "Foo";
}

//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.js]
let default_1 = /** @class */ (() => {
    class default_1 {
    }
    default_1.z = "Foo";
    return default_1;
})();
export default default_1;
