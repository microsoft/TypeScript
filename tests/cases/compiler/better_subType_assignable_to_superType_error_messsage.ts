function parameterExtendsOtherParameter<SuperType, SubType extends SuperType, SubType2 extends SubType>(superType: SuperType, subType2: SubType2) {

  subType2 = superType;
}
