interface i1 { name:string; }
 
// should be an error 
class c1 implements i1 { private name:string; }
 
// should be ok 
class c2 implements i1 { public name:string; }

 