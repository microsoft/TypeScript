//// [tests/cases/compiler/better_subType_assignable_to_superType_error_messsage.ts] ////

//// [better_subType_assignable_to_superType_error_messsage.ts]
function parameterExtendsOtherParameter<SuperType, SubType extends SuperType, SubType2 extends SubType>(superType: SuperType, subtype: SubType, subType2: SubType2) {
  //ensures that supertypes are not assignable to subtypes
  subtype = superType;//error
  
  //ensures that supertypes are not assignable to 'grandchild' subtypes
  subType2 = superType;//error

  superType = subType2;//ok
}


//// [better_subType_assignable_to_superType_error_messsage.js]
function parameterExtendsOtherParameter(superType, subtype, subType2) {
    //ensures that supertypes are not assignable to subtypes
    subtype = superType; //error
    //ensures that supertypes are not assignable to 'grandchild' subtypes
    subType2 = superType; //error
    superType = subType2; //ok
}
