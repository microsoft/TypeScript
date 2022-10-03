// @declaration: true
// @filename: foo.ts
class Conn {
    constructor() { }
    item = 3;
    method() { }
}

export = Conn;
// @filename: usage.ts
type Conn = import("./foo");
declare var x: Conn;

export class Wrap {
    connItem: number;
    constructor(c = x) {
        this.connItem = c.item;
    }
}
