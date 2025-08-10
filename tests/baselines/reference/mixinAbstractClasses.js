//// [tests/cases/conformance/classes/mixinAbstractClasses.ts] ////

//// [mixinAbstractClasses.ts]
interface Mixin {
    mixinMethod(): void;
}

function Mixin<TBaseClass extends abstract new (...args: any) => any>(baseClass: TBaseClass): TBaseClass & (abstract new (...args: any) => Mixin) {
    abstract class MixinClass extends baseClass implements Mixin {
        mixinMethod() {
        }
    }
    return MixinClass;
}

class ConcreteBase {
    baseMethod() {}
}

abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}

class DerivedFromConcrete extends Mixin(ConcreteBase) {
}

const wasConcrete = new DerivedFromConcrete();
wasConcrete.baseMethod();
wasConcrete.mixinMethod();

class DerivedFromAbstract extends Mixin(AbstractBase) {
    abstractBaseMethod() {}
}

const wasAbstract = new DerivedFromAbstract();
wasAbstract.abstractBaseMethod();
wasAbstract.mixinMethod();

//// [mixinAbstractClasses.js]
function Mixin(baseClass) {
    class MixinClass extends baseClass {
        mixinMethod() {
        }
    }
    return MixinClass;
}
class ConcreteBase {
    baseMethod() { }
}
class AbstractBase {
}
class DerivedFromConcrete extends Mixin(ConcreteBase) {
}
const wasConcrete = new DerivedFromConcrete();
wasConcrete.baseMethod();
wasConcrete.mixinMethod();
class DerivedFromAbstract extends Mixin(AbstractBase) {
    abstractBaseMethod() { }
}
const wasAbstract = new DerivedFromAbstract();
wasAbstract.abstractBaseMethod();
wasAbstract.mixinMethod();


//// [mixinAbstractClasses.d.ts]
interface Mixin {
    mixinMethod(): void;
}
declare function Mixin<TBaseClass extends abstract new (...args: any) => any>(baseClass: TBaseClass): TBaseClass & (abstract new (...args: any) => Mixin);
declare class ConcreteBase {
    baseMethod(): void;
}
declare abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}
declare class DerivedFromConcrete extends ({} as typeof ConcreteBase & (abstract new (...args: any) => Mixin)) {
}
declare const wasConcrete: DerivedFromConcrete;
declare class DerivedFromAbstract extends ({} as typeof AbstractBase & (abstract new (...args: any) => Mixin)) {
    abstractBaseMethod(): void;
}
declare const wasAbstract: DerivedFromAbstract;
