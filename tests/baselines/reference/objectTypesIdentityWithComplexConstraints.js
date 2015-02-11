//// [objectTypesIdentityWithComplexConstraints.ts]
interface A {
      <T extends {
            <S extends A>(x: T, y: S): void
      }>(x: T, y: T): void
}

interface B {
      <U extends B>(x: U, y: U): void
}

// ok, not considered identical because the steps of contextual signature instantiation create fresh type parameters
function foo(x: A);
function foo(x: B); // error after constraints above made illegal
function foo(x: any) { }

//// [objectTypesIdentityWithComplexConstraints.js]
function foo(x) { }
