//// [tests/cases/conformance/classes/mixinAbstractClassesReturnTypeInference.ts] ////

//// [mixinAbstractClassesReturnTypeInference.ts]
interface Mixin1 {
    mixinMethod(): void;
}

abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}

function Mixin2<TBase extends abstract new (...args: any[]) => any>(baseClass: TBase) {
    // must be `abstract` because we cannot know *all* of the possible abstract members that need to be
    // implemented for this to be concrete.
    abstract class MixinClass extends baseClass implements Mixin1 {
        mixinMethod(): void {}
        static staticMixinMethod(): void {}
    }
    return MixinClass;
}

class DerivedFromAbstract2 extends Mixin2(AbstractBase) {
    abstractBaseMethod() {}
}


//// [mixinAbstractClassesReturnTypeInference.js]
class AbstractBase {
}
function Mixin2(baseClass) {
    // must be `abstract` because we cannot know *all* of the possible abstract members that need to be
    // implemented for this to be concrete.
    class MixinClass extends baseClass {
        mixinMethod() { }
        static staticMixinMethod() { }
    }
    return MixinClass;
}
class DerivedFromAbstract2 extends Mixin2(AbstractBase) {
    abstractBaseMethod() { }
}


//// [mixinAbstractClassesReturnTypeInference.d.ts]
interface Mixin1 {
    mixinMethod(): void;
}
declare abstract class AbstractBase {
    abstract abstractBaseMethod(): void;
}
declare function Mixin2<TBase extends abstract new (...args: any[]) => any>(baseClass: TBase): ((abstract new (...args: any[]) => {
    [x: string]: any;
    mixinMethod(): void;
}) & {
    staticMixinMethod(): void;
}) & TBase;
declare const DerivedFromAbstract2_base: ((abstract new (...args: any[]) => {
    [x: string]: any;
    mixinMethod(): void;
}) & {
    staticMixinMethod(): void;
}) & typeof AbstractBase;
declare class DerivedFromAbstract2 extends DerivedFromAbstract2_base {
    abstractBaseMethod(): void;
}
