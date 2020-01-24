// @target: esnext
// @declaration: true

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