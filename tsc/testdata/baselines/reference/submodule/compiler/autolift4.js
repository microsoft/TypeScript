//// [tests/cases/compiler/autolift4.ts] ////

//// [autolift4.ts]
class Point {

    constructor(public x: number, public y: number) {

    }
    getDist() { 
        return Math.sqrt(this.x*this.x + this.y*this.y); 
    }
    static origin = new Point(0,0);
}

class Point3D extends Point {

    constructor(x: number, y: number, public z: number, m:number) {
        super(x, y);
    }
    
    getDist() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.m);
    }        
}



//// [autolift4.js]
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getDist() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    static origin = new Point(0, 0);
}
class Point3D extends Point {
    z;
    constructor(x, y, z, m) {
        super(x, y);
        this.z = z;
    }
    getDist() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.m);
    }
}
