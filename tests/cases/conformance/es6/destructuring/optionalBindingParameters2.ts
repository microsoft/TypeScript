
function foo({ x, y, z }?: { x: string; y: number; z: boolean }) {

}

foo({ x: "", y: 0, z: false });

foo({ x: false, y: 0, z: "" });