/// <reference path='fourslash.ts' />

//// 
//// class Foo   <   
////  T1   extends unknown,
////   T2   
////     > {
////     public method    <  
////  T3,
////     >   (a: T1,   b: Array    < 
////      string 
////      > ):   Map <
////           T1 ,
////       Array < T3    >  
////           > { throw new Error(); } 
//// }
//// 
//// interface IFoo<
////        T, 
////   > {
////     new < T
////       > ( a: T);
////     op?< 
////    T,
////       M
////     > (a: T, b : M );
////     <
////      T,
////       >(x: T): T;
//// }
//// 
//// type foo<
////   T
////    > = Foo   <
////   number, Array <   number  >  > ;
//// 
//// function bar <
//// T, U extends T
////  >  () {
////     return class  < 
////        T2,
////   > {
////     }
//// }
//// 
//// bar<
//// string, 
////      "s"
////      > ();
//// 
//// declare const func: <
//// T   extends number[], 
////                        > (x: T) => new <
////        U
////                           > () => U;
//// 
//// class A < T > extends bar <  
////         T,number
////  >( )  <  T
////      > {
//// }
//// 
//// function s<T, U>(x: TemplateStringsArray, ...args: any[]) { return x.join(); }
//// 
//// const t = s<
////       number , 
////   string[] & ArrayLike<any>
////       >`abc${1}def` ;
//// 


format.document();

verify.currentFileContentIs(`
class Foo<
    T1 extends unknown,
    T2
> {
    public method<
        T3,
    >(a: T1, b: Array<
        string
    >): Map<
        T1,
        Array<T3>
    > { throw new Error(); }
}

interface IFoo<
    T,
> {
    new <T
    >(a: T);
    op?<
        T,
        M
    >(a: T, b: M);
    <
        T,
    >(x: T): T;
}

type foo<
    T
> = Foo<
    number, Array<number>>;

function bar<
    T, U extends T
>() {
    return class <
        T2,
    > {
    }
}

bar<
    string,
    "s"
>();

declare const func: <
    T extends number[],
> (x: T) => new <
    U
> () => U;

class A<T> extends bar<
    T, number
>()<T
> {
}

function s<T, U>(x: TemplateStringsArray, ...args: any[]) { return x.join(); }

const t = s<
    number,
    string[] & ArrayLike<any>
>\`abc\${1}def\`;
`);
