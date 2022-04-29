interface IPoint {
    x:number;
    y:number;
}

class Point implements IPoint {
    constructor(public x,public y){}
    public move(xo:number,yo:number) {
	this.x+=xo;
	this.y+=yo;
	return this;
    }
    public toString() {
	return ("("+this.x+","+this.y+")");
    }
}

var result="";
result+=(new Point(3,4).move(2,2));

module M {
    export var origin=new Point(0,0);
}

result+=(M.origin.move(1,1));

