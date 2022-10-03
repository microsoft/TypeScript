//// [recursiveInheritanceGeneric.ts]
interface I5<T> extends I5<T> { 
    foo():void;
}  

//// [recursiveInheritanceGeneric.js]
