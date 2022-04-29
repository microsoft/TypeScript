function makePoint(x: number) { 
 return { 
  get x() { return x; } 
 } 
}; 
var x = makePoint(2).x;
var y: number = makePoint(2).x;