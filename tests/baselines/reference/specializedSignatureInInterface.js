//// [specializedSignatureInInterface.ts]
interface A {
  (key:string):void;
}

interface B extends A {
  (key:'foo'):string;
  (key:'bar'):string;
}

//// [specializedSignatureInInterface.js]
