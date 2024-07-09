//// [tests/cases/conformance/classes/mixinAbstractClasses.2.ts] ////

//// [mixinAbstractClasses.2.ts]
interface Mixin {
    mixinMethod(): void;
}

function Mixin<TBaseClass extends abstract new (...args: any) => any>(baseClass: TBaseClass): TBaseClass & (abstract new (...args: any) => Mixin) {
    // error expected: A mixin class that extends from a type variable containing an abstract construct signature must also be declared 'abstract'.
    class MixinClass extends baseClass implements Mixin {
        mixinMethod() {
        }
    }
    return MixinClass;
}

abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}

const MixedBase = Mixin(AbstractBase);

// error expected: Non-abstract class 'DerivedFromAbstract' does not implement inherited abstract member 'abstractBaseMethod' from class 'AbstractBase & Mixin'.
class DerivedFromAbstract extends MixedBase {
}

// error expected: Cannot create an instance of an abstract class.
new MixedBase();

//// [mixinAbstractClasses.2.js]
function Mixin(baseClass) {
    // error expected: A mixin class that extends from a type variable containing an abstract construct signature must also be declared 'abstract'.
    class MixinClass extends baseClass {
        mixinMethod() {
        }
    }
    return MixinClass;
}
class AbstractBase {
}
const MixedBase = Mixin(AbstractBase);
// error expected: Non-abstract class 'DerivedFromAbstract' does not implement inherited abstract member 'abstractBaseMethod' from class 'AbstractBase & Mixin'.
class DerivedFromAbstract extends MixedBase {
}
// error expected: Cannot create an instance of an abstract class.
new MixedBase();


//// [mixinAbstractClasses.2.d.ts]
interface Mixin {
    mixinMethod(): void;
}
declare function Mixin<TBaseClass extends abstract new (...args: any) => any>(baseClass: TBaseClass): TBaseClass & (abstract new (...args: any) => Mixin);
declare abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}
declare const MixedBase: typeof AbstractBase & (abstract new (...args: any) => Mixin);
declare class DerivedFromAbstract extends MixedBase {
}
