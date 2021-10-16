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
declare const DerivedFromConcrete_base: typeof ConcreteBase & (abstract new (...args: any) => Mixin);
declare class DerivedFromConcrete extends DerivedFromConcrete_base {
}
declare const wasConcrete: DerivedFromConcrete;
declare const DerivedFromAbstract_base: typeof AbstractBase & (abstract new (...args: any) => Mixin);
declare class DerivedFromAbstract extends DerivedFromAbstract_base {
    abstractBaseMethod(): void;
}
declare const wasAbstract: DerivedFromAbstract;
