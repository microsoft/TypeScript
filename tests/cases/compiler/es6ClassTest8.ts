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

