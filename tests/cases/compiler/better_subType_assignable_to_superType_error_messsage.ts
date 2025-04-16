function parameterExtendsOtherParameter<SuperType, SubType extends SuperType, SubType2 extends SubType>(superType: SuperType, subtype: SubType, subType2: SubType2) {
  //ensures that supertypes are not assignable to subtypes
  subtype = superType;//error
  
  //ensures that supertypes are not assignable to 'grandchild' subtypes
  subType2 = superType;//error

  superType = subType2;//ok
}
