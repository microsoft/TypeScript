module m {
  export class variable{
    s: string;
  }
  export function doSomething(v: m.variable) {
    
  }
}

class variable {
 t: number;
}


var v: variable = new variable();
m.doSomething(v);