module A {

  function b() {}

  export function a(){  A.b();  } // A.b should be an unresolved symbol error

}

A.a();
