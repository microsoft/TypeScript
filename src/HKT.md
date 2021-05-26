

Convert `Type Constructor Instance` to `Type Lambda`
`List = [T] =>> List[T]`

Convert `apply constraint` to `Type Lambda`
`type T[X] >: L <: U` convert to `type T >: ([X] =>> L) <: ([X] =>> U)`

Define `<:` on `TypeLambda`:
`type TL1  =  [X >: L1 <: U1] =>> R1`
`type TL2  =  [X >: L2 <: U2] =>> R2`
`TL1 <: TL2` if
  - the type interval `L2..U2` is contained in the type interval `L1..U1` (i.e. `L1 <: L2` and `U2 <: U1`) and
  - `R1 <: R2`
The conditions are reasonable: assume we have `interface F[G[T<:U1] <: G1[T]]`, `G[Timpl]`, so `Timpl <: U1`,
then we replace `G[T]` with `Gimpl[U<:U2] <: G2[U]`, if the U is stricter(`U2<:U1`), Timpl might not meet `Timpl <: U2`;
And we use functions in `G1[T]`, if `G2[U] <: G1[T]` these functions might not exist.

`List[List[T]]`
`Functor[List]`
^ Object ^ TypeLambdaInstance

If `A <: B`
`A` and `B` both have met the contraints.
TypeLambda[A] = TypeLambda[B] is valid if TypeLambda[+T];
TypeLambda[B] = TypeLambda[A] is valid if TypeLambda[-T];

Whether one proper type `A` is the subtype of another type `B`?

- A: *
- B: *
- A <: B?

1. A and B are not applicated by TypeLambda.
    Only inheritance.
    A <: B iff A inheritances B

2. A and B are applicated by TypeLambda, like `List<number>`
    A is like TypeLambda_A$a0$a1...
    B is like TypeLambda_B$b0$b1...
    $ai and $bi is the typeArgument

    we could assume there are only two parameters
    So, we want:

    TypeLambda_A$a0$a1 <: TypeLambda_B$b0$b1

    If we have
    1. TypeLambda_A extends TypeLambda_Ii... extends TypeLambda_B

    2. And we assume we have got a variance array of type argument(this array might be infered, might be annotation from A, might be annotation from B, anyway, we have got one.)

    if variance of i is covariance, we need $ai <: $bi
    if variance of i is cotravariance, we need $bi <: $ai

    It is obvious we could get TypeLambda_A$a0$a1 <: TypeLambda_B$b0$b1 if 1 and 2 are both true.

    TypeLambda_A$a0$a1 <: TypeLambda_B$a0$a1 <: TypeLambda_B$b0$b1


Let us define declaration and instance here:
As long as it is not a declaration, it is a  instance.
only one type first appear, it is a declaration.
interface II<Generic<X> extends Set<X>>
                                ^   ^ both are instance
                                ^   This is a proper type Set<X>

You might thought this is not enough! But in scala, it is OK to see following code:
    class Derived1{}
    class Derived2 extends Derived1{}
    class Derived3 extends Derived2{}
    class C1[Generic[X <: Derived2] <: Set[U], U <: Derived1]{}
    class C2[Generic[X <: Derived2] <: Set[U], U <: Derived2]{}
    class C3[Generic[X <: Derived2] <: Set[U], U <: Derived3]{}
    class C4[Generic[X <: Derived1] <: Set[U], U <: Derived2]{}
    class C5[Generic[X <: Derived2] <: Set[U], U <: Derived2]{}
    class C6[Generic[X <: Derived3] <: Set[U], U <: Derived2]{}
    class C7[Generic[X <: Derived2] <: Set[X], U <: Derived2]{}

    var v1 = new C1[Set, Derived1]();
    var v2 = new C2[Set, Derived2]();
    var v3 = new C3[Set, Derived3]();
    var v4 = new C4[Set, Derived2]();
    var v5 = new C5[Set, Derived2]();
    var v6 = new C6[Set, Derived2]();
    var v7 = new C7[List, Derived2]();

Type argument List does not conform to upper bound [X <: test2.Derived2] =>> Set[X]
Constraint(
 uninstVars = ;
 constrained types =
 bounds =
 ordering =
)
Subtype trace:
  ==> List <:< [X <: test2.Derived2] =>> Set[X]
    ==> List <:< [X <: test2.Derived2] =>> Set[X] recur
      ==> List <:< [X <: test2.Derived2] =>> Set[X] recur
        ==>  <: test2.Derived2 <:<
          ==>  <: test2.Derived2 <:<  recur
          <==  <: test2.Derived2 <:<  recur  = true
        <==  <: test2.Derived2 <:<    = true
        ==> List[A] <:< Set[A]
          ==> List[A] <:< Set[A] recur
          <== List[A] <:< Set[A] recur  = false
        <== List[A] <:< Set[A]   = false
      <== List <:< [X <: test2.Derived2] =>> Set[X] recur  = false
    <== List <:< [X <: test2.Derived2] =>> Set[X] recur  = false
  <== List <:< [X <: test2.Derived2] =>> Set[X]   = false

```
isProperTypeLessThan(Type type1, Type type2){
  // assume0/TODO: We have checked constraints!
  // assume1/TODO: type1 and type2 are proper type!
  // assume2/TODO: type are interface/class, if it is Object, it should pass its `target` until it is one of these.
  // assume3/TODO: type1 and type2 have the same type argument amount.
  const isType1TypeLambdaInstance = isTypeLambdaInstance(type1);
  const isType2TypeLambdaInstance = isTypeLambdaInstance(type2);
  if(!isType1TypeLambdaInstance && !isType2TypeLambdaInstance){
    return isInheritance(type1, type2);
  }else if(isType1TypeLambdaInstance != isType2TypeLambdaInstance){
    reportError();
    return false;
  }else{
    const isInheritance = isInheritance(type1, type2);
    if(!isInheritance)
      // report error?
      return false;
    const variances[] = gotVariance(type1,type2); // maybe we do not need pass both of these two. Here is just a placeHolder.
    for(let i = 0; i< variances.lenght; ++i){
      const v = variances[i];
      const parameter1 = gettypeParameter(type1, i);
      const parameter2 = gettypeParameter(type2, i);
      if(isBiVariance(v)){
        result = isTypeLessThan(type1, type2) || isTypeLessThan(type1, type2);
        if(result === false){
          return result;
        }
      }else...
    }
  }
}

// We assume all Types have been resolved. `resolved` here means typeParameter is replaced with actual typeArgument when check constraint
isTypeLambdaLessThan(Type A, Type B){
  // some assumptions, similar to isProperTypeLessThan
  if(isTypeArgumentA(A) && isTypeParameter(B)){
    var typeLambdaDeclarationType_A = getDeclarationTypeOfTypeLambdaInstance(A);
    var typeParameters_A = getTypeParametersOfTypeParameter(typeLambdaDeclarationType_A);
    var typeParameters_B = getTypeParametersOfTypeParameter(typeLambdaDeclarationType_B);
    if(typeParameters_A.length == typeParameters_B.length){reportError("kind not match");return false;}
    // type parameter constraint is cotravariance
    for(let i =0;i<typeParameters_A.length; i++){
      var curTypeParameter_A = typeParameters_A[i];
      var curTypeParameter_B = typeParameters_B[i];
      isTypeLambda_A = isTypeLambda(curTypeParameter);
      isTypeLambda_B = isTypeLambda(curTypeParameter);
      if(isTypeLambda_A && isTypeLambda_B){
        const curRes = isTypeLambdaLessThan(B,A);
        if(!curRes){reportError();return false;}
      }
    }
    // Apply constraint is covariance
  }
}
```

```
isTypeLessThan(Type t1, Type t2){

}
```


Issues:

0. binder
    - bind type with hk declared type parameter(done)

        ```
        interface II<Generic<X> extends Set<X>, X>
        ```

1. checker
    - constraints check valid rules(done)
    - resolve type parameter with type arguments
    - express hk constraint
    - Error message and error conditions
    - compatibility, what about infer and conditional?

2. transformer
    - emit hk type parameters correctly

3. IDE support
    - quick info
        - how to express hk constraints?
    - auto complete

# Mapper

For Generic, mapper is a simple and effective way.

``` ts
interface Generic<Q,W,E>{

}
const foo: Generic<number, string, boolean>;
    foo.
//  ^ here, this `Generic` object got the mapper.
```

But for hk, it is not that good.

``` ts
interface Functor1<Generic<T>, U>{
    a:Generic<U>
}

const foo: Functor1<Set, number>
//    ^ here, this got the mapper Generic --> Set, U --> number
```
So, how `a` get the correct type?

mapping recursively is a direct idea. like DFS, if it could be mapped, then map. each time go up, if up or bottom is mapped, create a new object.

But let us see the real `higher kinded`

``` ts
interface HKT3<Functor<Generic<T>>, Generic2<U>, Generic3<W>, V>{
    a: Functor<Generic2>
    b: Functor<Set>
    xxx: Set<V>
    c: Generic2<Generic2<V>> // mapper U to what?
    d: Generic3<Generic2<V>> // map W to Generic2<V>
    e: Functor<Functor<Generic2>> // This would be an error, kind not match! But we could still ask: map Generic to what?
}

const foo: HKT3<Functor1, Set, V> // check whether these type argument meet constraints; Do we need to initiate the type here? or it could be lazyed?
foo.a;  //
foo.b;
```

