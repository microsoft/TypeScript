type ObjType1 = { x: number; y: string; z: boolean }
type TupleType1 = [ObjType1, number, string]

class C1 {
    constructor(public [{ x1, x2, x3 }, y, z]: TupleType1) {
        var foo: any = x1 || x2 || x3 || y || z;
        var bar: any = this.x1 || this.x2 || this.x3 || this.y || this.z;
    }
}

var a = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
var [a_x1, a_x2, a_x3, a_y, a_z] = [a.x1, a.x2, a.x3, a.y, a.z];