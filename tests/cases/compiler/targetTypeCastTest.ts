declare var Point: { new(x:number, y:number): {x: number; y: number; }; }

function Point(x, y) {
    this.x = x;
    this.y = y;   
}

interface Adder {
    (x: number, y: number): number;   
}

var add = <Adder>function(x,y) {    return x+ y;   }


interface Adder2 {
    (x: number, y: number): number;   
}

var add2: Adder2 = function(x,y) {
    return 0;
}

function add3(x,y) {x}