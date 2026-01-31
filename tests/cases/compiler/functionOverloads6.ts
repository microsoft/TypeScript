// @target: es2015
// @strict: false
class foo { 
   static fnOverload();
   static fnOverload(foo:string);
   static fnOverload(foo?: any){ }
}
