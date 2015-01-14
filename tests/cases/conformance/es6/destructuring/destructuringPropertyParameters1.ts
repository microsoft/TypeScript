class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 = [string, number, boolean];

class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }

class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

var c1 = new C1([]);
c1 = new C1(["larry", "{curly}", "moe"]);
var useC1Properties = c1.x === c1.y && c1.y === c1.z;

var c2 = new C2(["10", 10, !!10]);
var [c2_x, c2_y, c2_z] = [c2.x, c2.y, c2.z];

var c3 = new C3({x: 0, y: "", z: false});
c3 = new C3({x: 0, "y": "y", z: true});
var [c3_x, c3_y, c3_z] = [c3.x, c3.y, c3.z];