// Repro from #53589

type Example1 = string 
     extends string ? true : false;

type Example2 = `${string
     extends string ? true : false}`;

type Example3 = Array<string
     extends string ? true : false>;

type Example4<K extends string
     extends string ? true : false> = string;

type Example5<K = string
     extends string ? true : false> = string;

function foo(a: string
     extends string ? true : false): void {};

type Example6<A> = {
  foo: string
     extends string ? true : false;
};