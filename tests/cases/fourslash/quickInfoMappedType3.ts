/// <reference path="./fourslash.ts"/>

////type Getters<Type> =  /** @inheritDoc desc on Getters */  {
////  [Property in keyof Type as `get${Capitalize<
////    string & Property
////  >}`]: () => Type[Property];
////};
////
////interface Person {
////  // ✅ When hovering here, the documentation is displayed, as it should.
////  /**
////   * Person's name.
////   * @example "John Doe"
////   */
////  name: string;
////
////  // ✅ When hovering here, the documentation is displayed, as it should.
////  /**
////   * Person's Age.
////   * @example 30
////   */
////  age: number;
////
////  // ✅ When hovering here, the documentation is displayed, as it should.
////  /**
////   * Person's Location.
////   * @example "Brazil"
////   */
////  location: string;
////}
////
////type LazyPerson = Getters<Person>;
////
////const me: LazyPerson = {
////  // ❌ When hovering here, the documentation is NOT displayed.
////  /*1*/getName: () => "Jake Carter",
////  // ❌ When hovering here, the documentation is NOT displayed.
////  /*2*/getAge: () => 35,
////  // ❌ When hovering here, the documentation is NOT displayed.
////  /*3*/getLocation: () => "United States",
////};
////
////// ❌ When hovering here, the documentation is NOT displayed.
////me./*4*/getName();

verify.baselineQuickInfo();
