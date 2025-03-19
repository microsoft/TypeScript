//// [tests/cases/compiler/es6ClassTest8.ts] ////

//// [es6ClassTest8.ts]
function f1(x:any) {return x;}

class C {
    constructor() {
        var bar:any = (function() {
            return bar; // 'bar' should be resolvable
        });
        var b = f1(f1(bar));
    }
  
}

class Vector {
    static norm(v:Vector):Vector {return null;}
    static minus(v1:Vector, v2:Vector):Vector {return null;}
    static times(v1:Vector, v2:Vector):Vector {return null;}
    static cross(v1:Vector, v2:Vector):Vector {return null;}

    constructor(public x: number,
                public y: number,
                public z: number) { 
    }

    static dot(v1:Vector, v2:Vector):Vector {return null;}    

}              

class Camera {
    public forward: Vector;
    public right: Vector;
    public up: Vector;
    constructor(public pos: Vector, lookAt: Vector) { 
        var down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt,this.pos));
        this.right = Vector.times(down, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(down, Vector.norm(Vector.cross(this.forward, this.right)));    
    }
}



//// [es6ClassTest8.js]
function f1(x) { return x; }
class C {
    constructor() {
        var bar = (function () {
            return bar; // 'bar' should be resolvable
        });
        var b = f1(f1(bar));
    }
}
class Vector {
    x;
    y;
    z;
    static norm(v) { return null; }
    static minus(v1, v2) { return null; }
    static times(v1, v2) { return null; }
    static cross(v1, v2) { return null; }
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static dot(v1, v2) { return null; }
}
class Camera {
    pos;
    forward;
    right;
    up;
    constructor(pos, lookAt) {
        this.pos = pos;
        var down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt, this.pos));
        this.right = Vector.times(down, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(down, Vector.norm(Vector.cross(this.forward, this.right)));
    }
}
