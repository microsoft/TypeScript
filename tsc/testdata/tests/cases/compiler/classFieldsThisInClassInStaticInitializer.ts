// @target: es2015, es2022
// @useDefineForClassFields: true, false
// @noTypesAndSymbols: true

// `this` in an instance field initializer of a class defined in a static initializer is the instance of that
// class, also when the class is emitted through a temp and its constructor is synthesized.

class C {
    static f = 1;
    static x = class { static s = 1; f = 10; a = this.f + 3; };
    static y = class { #p = 1; f = 20; a = this.f + 3; };
    static z = class { static s = 1; f = 30; a = this.f + 3; constructor() {} };
}
