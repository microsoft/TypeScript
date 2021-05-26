
``` ts
class MySet<T extends string> extends Set<number> {
}

class MySet2<T extends string,T> extends Set<T> {
}

// interface HKT<Functor2<Generic<T extends string> extends MySet<number>> extends Monod < MySet<number> >> extends AnotherHKT < Functor2 >
// {
//     HKT#Functor2: ;
//     HKT#Functor2#Generic: ;
//     HKT#Functor2#Generic#T: ;
// }

interface HKT1<Generic<T extends string> extends Set<T>> extends HKT1_Concentrate<Generic>{}

interface HKT1<U extends string, Generic<T extends U>>{
    f1(para:Generic<U>){} // --> create Mapper{T-->U}, check constraint for T, instance_T(U) is U, pass!
    f2(para:Generic<int>){} // --> create Mapper{T-->int}, check constraint for T, instance_T(int) is not U, fail!
    f3(para:Generic<string>){} // --> create Mapper{T-->int}, check constraint for T, instance_T(string) is U, pass!
} // allowed
HKT1<number,Set>; // --> create Mapper{U-->number,Generic-->Set}, check constraint for U and Generic(No constraint)
                  //     If no error, Merge Mapper, Mapper for `<number,Set>` is {U-->number,Generic-->Set,T-->U}

interface HKT1<U extends string, Generic<T> extends Set<U>>{
    // check constraint declaration: whether Set<U> is proper Set, that is to say, check U meet the constraint in Set.
    // check typeParameter and constraint kind: the kind of constraint must be the same with typeparameter. The kind in here means ((*->*)->(*->*))->*, not just proper, one or two.

    f1(para:Generic<U>){} // --> create Mapper{T-->U}, check typeParameter constraint for T, instance_T(U) is U, pass!
    f2(para:Generic<int>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(int) is not U, fail!
    f3(para:Generic<string>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(string) is U, pass!
} // allowed

HKT1<number,Set>;   // --> create Mapper{U-->number,Generic-->Set}, check constraint for U(wrong), instance_Generic(Set) is Set, pass!
                    //     If no error, Merge Mapper, Mapper for `<number,Set>` is {U-->number,Generic-->Set,T-->U}

interface HKT1<U1 extends string,U2 extends string, Generic<T> extends (Set<U1>|Array<U2>)>{
    // check constraint declaration: whether Set<U> is proper Set, that is to say, check U1 meet the constraint in Set and U2 meet the constraint in Array.
    // check typeParameter and constraint kind: the kind of constraint must be the same with typeparameter. The kind in here means ((*->*)->(*->*))->*, not just proper, one or two.

    f1(para:Generic<U1>){} // --> create Mapper{T-->U}, check typeParameter constraint for T, instance_T(U) is U, pass!
    f1_2(para:Generic<U1|U2>){} // --> create Mapper{T-->U}, check typeParameter constraint for T, instance_T(U) is U, pass!
    f2(para:Generic<int>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(int) is not U, fail!
    f3(para:Generic<string>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(string) is U, pass!
} // allowed
HKT1<number,Set>;   // --> create Mapper{U-->number,Generic-->Set}, check constraint for U(wrong), instance_Generic(Set) is Set, pass!
                    //     If no error, Merge Mapper, Mapper for `<number,Set>` is {U-->number,Generic-->Set,T-->U}

interface HKT1<U1 extends string,U2 extends number, Generic<T> extends (Set<U1>|&Array<U2>)>{
    // check constraint declaration: whether Set<U> is proper Set, that is to say, check U1 meet the constraint in Set and U2 meet the constraint in Array.
    // check typeParameter and constraint kind: the kind of constraint must be the same with typeparameter. The kind in here means ((*->*)->(*->*))->*, not just proper, one or two.
    f1(para:Generic<U1>){} // --> create Mapper{T-->U}, check typeParameter constraint for T, instance_T(U1) is U, pass!
    f1_2(para:Generic<U1|U2>){} // --> create Mapper{T-->U}, check typeParameter constraint for T, instance_T(U) is U, pass!
    f2(para:Generic<int>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(int) is not U, fail!
    f3(para:Generic<string>){} // --> create Mapper{T-->int}, check typeParameter constraint for T, instance_T(string) is U, pass!
} // allowed
HKT1<string,number,Set>;   // --> create Mapper{U-->number,Generic-->Set}, check constraint for U(wrong), instance_Generic(Set) is Set, pass!
                    //     If no error, Merge Mapper, Mapper for `<number,Set>` is {U-->number,Generic-->Set,T-->U}



interface HKT1<Generic<T extends string> extends Set<int>> extends HKT1_Concentrate<Generic>{}
// error                                         ^^^ expected a one kind type, but here is proper type

interface HKT1<U, Generic<T extends string> extends Set<T>> extends HKT1_Concentrate<U, Generic>{}


interface HKT1<U, Generic<T extends U> extends Set<T>> extends HKT1_Concentrate<U, Generic>{}

interface HKT1<U extends string, Generic<T extends string> extends Set<U>> extends HKT1_Concentrate<U, Generic>{

}
HKT1<string,Set>; // --> create Mapper{U-->string, Generic-->Set} check constraint for U, instance_U(string) is string,

interface HKT2<U extends string, Functor<Generic<T extends string> extends MySet<U>> extends Monod<Generic>> extends AnotherHKT<Functor>{
    f(para1: )
}

interface HKT<Functor2<Generic<T extends string> extends MySet<T>> extends Monod<Generic>> extends AnotherHKT<Functor2>
{
    Functor2
    HKT#Functor2: ;
    HKT#Functor2#Generic: ;
    HKT#Functor2#Generic#T: ;
}

// T<:A, upper bound, T is the subtype of A

interface Type { };

interface Lambda {
    parameterCount: number;
    // If it is undefined, it is not explictly declared. Try to infer it then put it back.  Or we could just add another property like resolvedParameterVariances
    parameterVariances: VarianceState | undefined[];
    parameterUpperBounds: Type|Lambda[]; // Or just constraint.
    parameterKind: Lambda[];// proper type is 0 kind.
    applyUpperBounds: Type|Lambda;
}

enum VarianceState {
    Invariance = 0,
    Covariance = 1 << 0,
    Contravariance = 1 << 1,
    Bivariance = Covariance | Contravariance
}
// Merge TypeMapper until it could get the final one. When merge conflict, throw error.
// If A is the subtype of B, A is `smaller` than B.

// NOTE
// 1. when using in TypeParameters, `extends` is constraint. And when using outside, `extends` is inheritance.


// Problem
// 1. Union Type and Intersection Type
// This is similar to inheritance condition, here is an example:
// interface HKT1<U1 extends string, U2 extends number, Generic<T> extends (Set<U1>|&Array<U2>)>{
//     f1(para:Generic<U1>){}
//     f1_2(para:Generic<U1|U2>){}
//     f1_3(para:Generic<U1&U2>){}
//     f2(para:Generic<int>){}
//     f3(para:Generic<string>){}
// }
// Here is a big problem: which function is allowed?
// It seems the judgement have to be delayed the instance. Some instance could use part of the functions while others not.
// But this looks wired. Perhaps this is not that wired if we have one more keyword to declare we not check the functions without instances?
```

### scala example

``` scala
object HelloWorld {
    def main(args: Array[String]) {
       var q: List[Int] = List(1, 2, 3, 4)
       var w: Array[Boolean] = Array(true)
       var t = getData(q,q)
    }
    def getData1[T<:Int,U<:Int,C[X<:Int]<:List[_]](a:C[T],b:C[U]) = 1/2
    def getData2[T,U,C[X],B[Q[_]]](a:C[T],b:C[U],c:B[C]) = 1/2
    def getData3[T<:String,C[X<:T]](a:C[T]) = 1/2
    def getData4[T<:String,C[X]<:List[_<:T]](a:C[T]) = 1/2
}
class MyClass[T<:String,C[X<:T]]{
    def f[V<:T>](a:C[V])= 1/2
}
```

### Checker

when in type parameter declarations:
1. check constraint declaration itself:
    - the declaration should be an instance type, its argument should meet the constraints it declared.
    - constraint could not be a Union or Insection.(Maybe too strong, could be lossen by same type parameters)

2. check typeParameter and constraint relation:
    - kind: the kind of constraint must be the same with typeparameter. The kind in here means ((*->*)->(*->*))->*, not just proper, one or two.

``` ts
interface HKT3<Functor<Generic<T,U> extends Map<T,U>> extends SomeFunctor<Generic>>{}
interface HKT3<Functor<Generic<T,U> extends Map<U,T>> extends SomeFunctor<Generic>>{}
interface HKT3<Functor<Generic<T,U> extends Map<U,T>|Map2<U,T>> extends SomeFunctor<Generic>>{}
interface HKT3<Functor<Generic<T,U> extends Map<T,U>|Map2<U,T>> extends SomeFunctor<Generic>>{}
// not works
interface HKT3<OT,Functor<Generic<T> extends Set<OT>|Set2<OT>> extends SomeFunctor<Generic>>{}
interface HKT3<OT1,OT2,Functor<Generic<T> extends Set<OT1>|Set2<OT2>> extends SomeFunctor<Generic>>{}
// not works
```

start analytics
``` ts
class HKT<T extends Set<string>, U extends T> {
    f(p1: T, p2: U): number {
        return 1;
    }
}
const q = new HKT<string, number>();// Error: number is not string // create Mapper{U-->}

class HKT<T extends Set<U>, U extends T> {
    f1(p1: T, p2: U): T {
        return p2;
    }
    f2(p1: T, p2: U): U {
        return p2;
    }
}
// always error

class HKT<T extends Set<X>, U extends T,X> {
    f1(p1: T, p2: U): T {
        return p2;
    }
    f2(p1: T, p2: U): U {
        return p2;
    }
}
const q = new HKT<MySet<string>, Set<string>,string>();
const w = new HKT<Set<string>, MySet<string>,string>();

// (*, *->*) -> *
interface HKT2<T extends string,Generic<U exntends T>>{
    f1<V>          (para1:Generic<V>){} // Should error, V does not have upper bound T. Mapper{Generic-->}
    f2<V extends T>(para1:Generic<V>){} // Mapper{Generic-->}
}

interface SomeFunctor<G<GU>>{
    sf(parameter1: G<int>)
}

// (*, (*->*)->*) -> *
interface HKT3<U,Functor<Generic<T> extends Set<U>> extends SomeFunctor<Generic>>{
    f<V>(parameter1: Functor<Set>){} //Mapper{Generic-->Set, }
}
HKT3<int, SomeFunctor> // Mapper{U-->int, Functor-->SomeFunctor}
```


``` scala
class SomeFunctor[G[GU<:String]<:List[_<:String]]{
//                                     ^ here is an anoymous type parameter.
//    SomeFunctor[Anonymous1<:String, G[GU<:String>]<:List[Anonymous1]]{
    def f(para1:G[String]) = 1
}
class HKT3[U,Functor[Generic[T]] <: SomeFunctor[Generic]]{
// error: Type argument Generic does not conform to upper bound [GU <: String] =>> List[? <: String]
    def f2(para2:Functor[List])=1
}
// ------
class SomeFunctor[G[GU<:String]]{
    def f(para1:G[String]) = 1
}
class HKT3[U,Functor[Generic[T]] <: SomeFunctor[Generic]]{
    def f2(para2:Functor[List])=1
}
// -------
class SomeFunctor[G[GU<:String]<:List[GU]]{
    def f(para1:G[String]) = 1
}

class HKT3[U,Functor[Generic[T<:String]<:List[_<:String]] <: SomeFunctor[Generic]]{
// class HKT3[U,Functor[Generic[T<:String]<:List[T]] <: SomeFunctor[Generic]]{  this pass well
    // error: Type argument Generic does not conform to upper bound [GU <: String] =>> List[GU]
    def f2(para2:Functor[List])=1
    // error: Type argument List does not conform to upper bound [T] =>> List[? <: String]
}
```

### Binder

binder:
    - Question1: type parameter scope. The type parameter declared in another type parameter could only be used in the constraint.

``` ts
interface HKT3<Functor<Generic<T> extends Set<T>> extends SomeFunctor<Generic>>{}
// works, of course.
interface HKT3<U,Functor<Generic<T> extends Set<T>> extends SomeFunctor<Generic>>{}
// works, of course.
interface HKT3<U,Functor<Generic<T> extends Set<U>> extends SomeFunctor<Generic>>{}
// also works, at least for this case.
interface HKT3<U,Functor<Generic<U> extends Set<U>> extends SomeFunctor<Generic>>{}
//             ^1                ^2             ^2
// this is shadow or duplicated error?
// reference to Scala, this is shadowed.
```

<!--
interface HKT3<Functor<Generic1<T1>, T2> <: Set<T1>, T3>
                                                ^ could not find this
-->

<!--
interface HKT3<Functor<Generic1<T1>, T2> <: Set<T2>>    // OK. Is this a little suprised?
{
  f(p:Functor<Set, number>)
}

class HKT3[Functor[Generic1[T1],T2] <: Set[T2]]
-->

###

``` scala
// This is OK
object test1:
  class FunctorImpl[Generic1[T] <: Iterable[T]]{}
  class HKT3_1[Functor[Generic2[T] <: Set[T]]]{}
  var h = new HKT3_1[FunctorImpl]();

// This is has error
object test2:
  class FunctorImpl[Generic1[T] <: Iterable[T]]{}
  class HKT3_1[Functor[Generic2[T <: String] <: Set[T]]]{}
  var h = new HKT3_1[FunctorImpl]();  // Error: Type argument FunctorImpl does not conform to upper bound [Generic2[T] <: Set[T]] =>> Any

[Generic2[T<:String]<:Set[T]] = [Generic1[T] <: Iterable[T]]

Explanation
===========

I tried to show that
  test2.FunctorImpl
conforms to
  [Generic2[T] <: Set[T]] =>> Any
but the comparison trace ended with `false`:

  ==> test2.FunctorImpl  <:  [Generic2[T] <: Set[T]] =>> Any
    ==> test2.FunctorImpl  <:  [Generic2[T] <: Set[T]] =>> Any (recurring)
      ==> type bounds [[T] <: Set[T]]  <:  type bounds [[T] <: Iterable[T]]
        ==> type bounds [[T] <: Set[T]]  <:  type bounds [[T] <: Iterable[T]] (recurring)
          ==> [T <: String] =>> Set[T]  <:  [U]=>>Iterable[U]
            ==> [T <: String] =>> Set[T]  <:  [U]=>>Iterable[U] (recurring)
              ==> type bounds []  <:  type bounds [ <: String]
                ==> type bounds []  <:  type bounds [ <: String] (recurring)
                  ==> Any  <:  String
                    ==> Any  <:  String (recurring)
                      ==> Any  <:  String (recurring)
                      <== Any  <:  String (recurring) = false
                    <== Any  <:  String (recurring) = false
                  <== Any  <:  String = false
                <== type bounds []  <:  type bounds [ <: String] (recurring) = false
              <== type bounds []  <:  type bounds [ <: String] = false
            <== [T <: String] =>> Set[T]  <:  Iterable (recurring) = false
          <== [T <: String] =>> Set[T]  <:  Iterable = false
        <== type bounds [[T] <: Set[T]]  <:  type bounds [[T] <: Iterable[T]] (recurring) = false
      <== type bounds [[T] <: Set[T]]  <:  type bounds [[T] <: Iterable[T]] = false
    <== test2.FunctorImpl  <:  [Generic2[T] <: Set[T]] =>> Any (recurring) = false
  <== test2.FunctorImpl  <:  [Generic2[T] <: Set[T]] =>> Any = false

The tests were made under the empty constraint
```