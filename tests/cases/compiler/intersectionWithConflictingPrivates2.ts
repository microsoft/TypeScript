declare class A {
  private a: number;

}
type B = Pick<{ a: number }, 'a'> & A;