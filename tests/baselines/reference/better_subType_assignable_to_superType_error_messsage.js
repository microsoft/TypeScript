//// [tests/cases/compiler/temp/better_subType_assignable_to_superType_error_messsage.ts] ////

//// [better_subType_assignable_to_superType_error_messsage.ts]
function parameterExtendsOtherParameter<SuperType, SubType extends SuperType, SubType2 extends SubType>(superType: SuperType, subType2: SubType2) {
  // TS 3.3: Type 'SuperType' is not assignable to type 'SubType'.
  //
  // TS 3.5: Type 'SuperType' is not assignable to type 'SubType'. 
  //         'SuperType' is assignable to the constraint of type 'SubType', but 'SubType' could be instantiated with a different subtype of constraint '{}'.
  //
  // TS 3.9: Type 'SuperType' is not assignable to type 'SubType'.
  //         'SubType' could be instantiated with an arbitrary type which could be unrelated to 'SuperType'.
  //
  // TS 4.8: Type 'SuperType' is not assignable to type 'SubType'.
  //         'SubType' could be instantiated with an arbitrary type which could be unrelated to 'SuperType'.
  //         input.tsx(1, 41): This type parameter might need an `extends V` constraint.
  subType2 = superType;
}


//// [better_subType_assignable_to_superType_error_messsage.js]
function parameterExtendsOtherParameter(superType, subType2) {
    // TS 3.3: Type 'SuperType' is not assignable to type 'SubType'.
    //
    // TS 3.5: Type 'SuperType' is not assignable to type 'SubType'. 
    //         'SuperType' is assignable to the constraint of type 'SubType', but 'SubType' could be instantiated with a different subtype of constraint '{}'.
    //
    // TS 3.9: Type 'SuperType' is not assignable to type 'SubType'.
    //         'SubType' could be instantiated with an arbitrary type which could be unrelated to 'SuperType'.
    //
    // TS 4.8: Type 'SuperType' is not assignable to type 'SubType'.
    //         'SubType' could be instantiated with an arbitrary type which could be unrelated to 'SuperType'.
    //         input.tsx(1, 41): This type parameter might need an `extends V` constraint.
    subType2 = superType;
}
