// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63560

type AnyConstructor<T extends object = object> = new (...args: any[]) => T;
type ClassStatics<C> = Omit<C, "prototype">;
type RuntimeMixinClass<RequiredBase extends object = object> = { readonly marker?: RequiredBase };

class Mixin0 extends (Object as unknown as AnyConstructor & RuntimeMixinClass) {
    public value0_0: number = 0;
}

interface __Mixin1Base extends Mixin0 {}
class __Mixin1Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & RuntimeMixinClass) {}
class Mixin1 extends __Mixin1Base implements Mixin0 {
    public value1_0: number = 1000;
}

interface __Mixin2Base extends Mixin1, Mixin0 {}
class __Mixin2Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & RuntimeMixinClass) {}
class Mixin2 extends __Mixin2Base implements Mixin1, Mixin0 {
    public value2_0: number = 2000;
}

interface __Mixin3Base extends Mixin2, Mixin1, Mixin0 {}
class __Mixin3Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & RuntimeMixinClass) {}
class Mixin3 extends __Mixin3Base implements Mixin2, Mixin1, Mixin0 {
    public value3_0: number = 3000;
}

interface __Mixin4Base extends Mixin3, Mixin2, Mixin1, Mixin0 {}
class __Mixin4Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & RuntimeMixinClass) {}
class Mixin4 extends __Mixin4Base implements Mixin3, Mixin2, Mixin1, Mixin0 {
    public value4_0: number = 4000;
}

interface __Mixin5Base extends Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {}
class __Mixin5Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & RuntimeMixinClass) {}
class Mixin5 extends __Mixin5Base implements Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {
    public value5_0: number = 5000;
}

interface __Mixin6Base extends Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {}
class __Mixin6Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & RuntimeMixinClass) {}
class Mixin6 extends __Mixin6Base implements Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {
    public value6_0: number = 6000;
}

interface __Mixin7Base extends Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {}
class __Mixin7Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & RuntimeMixinClass) {}
class Mixin7 extends __Mixin7Base implements Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {
    public value7_0: number = 7000;
}

interface __Mixin8Base extends Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {}
class __Mixin8Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & RuntimeMixinClass) {}
class Mixin8 extends __Mixin8Base implements Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1, Mixin0 {
    public value8_0: number = 8000;
}

interface __Mixin9Base extends Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1 {}
class __Mixin9Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & RuntimeMixinClass) {}
class Mixin9 extends __Mixin9Base implements Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2, Mixin1 {
    public value9_0: number = 9000;
}

interface __Mixin10Base extends Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2 {}
class __Mixin10Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & RuntimeMixinClass) {}
class Mixin10 extends __Mixin10Base implements Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3, Mixin2 {
    public value10_0: number = 10000;
}

interface __Mixin11Base extends Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3 {}
class __Mixin11Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & RuntimeMixinClass) {}
class Mixin11 extends __Mixin11Base implements Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4, Mixin3 {
    public value11_0: number = 11000;
}

interface __Mixin12Base extends Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4 {}
class __Mixin12Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & RuntimeMixinClass) {}
class Mixin12 extends __Mixin12Base implements Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5, Mixin4 {
    public value12_0: number = 12000;
}

interface __Mixin13Base extends Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5 {}
class __Mixin13Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & RuntimeMixinClass) {}
class Mixin13 extends __Mixin13Base implements Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6, Mixin5 {
    public value13_0: number = 13000;
}

interface __Mixin14Base extends Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6 {}
class __Mixin14Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & RuntimeMixinClass) {}
class Mixin14 extends __Mixin14Base implements Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7, Mixin6 {
    public value14_0: number = 14000;
}

interface __Mixin15Base extends Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7 {}
class __Mixin15Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & RuntimeMixinClass) {}
class Mixin15 extends __Mixin15Base implements Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8, Mixin7 {
    public value15_0: number = 15000;
}

interface __Mixin16Base extends Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8 {}
class __Mixin16Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & RuntimeMixinClass) {}
class Mixin16 extends __Mixin16Base implements Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9, Mixin8 {
    public value16_0: number = 16000;
}

interface __Mixin17Base extends Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9 {}
class __Mixin17Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & RuntimeMixinClass) {}
class Mixin17 extends __Mixin17Base implements Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10, Mixin9 {
    public value17_0: number = 17000;
}

interface __Mixin18Base extends Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10 {}
class __Mixin18Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & RuntimeMixinClass) {}
class Mixin18 extends __Mixin18Base implements Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11, Mixin10 {
    public value18_0: number = 18000;
}

interface __Mixin19Base extends Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11 {}
class __Mixin19Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & RuntimeMixinClass) {}
class Mixin19 extends __Mixin19Base implements Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12, Mixin11 {
    public value19_0: number = 19000;
}

interface __Mixin20Base extends Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12 {}
class __Mixin20Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & RuntimeMixinClass) {}
class Mixin20 extends __Mixin20Base implements Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13, Mixin12 {
    public value20_0: number = 20000;
}

interface __Mixin21Base extends Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13 {}
class __Mixin21Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & RuntimeMixinClass) {}
class Mixin21 extends __Mixin21Base implements Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14, Mixin13 {
    public value21_0: number = 21000;
}

interface __Mixin22Base extends Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14 {}
class __Mixin22Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & RuntimeMixinClass) {}
class Mixin22 extends __Mixin22Base implements Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15, Mixin14 {
    public value22_0: number = 22000;
}

interface __Mixin23Base extends Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15 {}
class __Mixin23Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & RuntimeMixinClass) {}
class Mixin23 extends __Mixin23Base implements Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16, Mixin15 {
    public value23_0: number = 23000;
}

interface __Mixin24Base extends Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16 {}
class __Mixin24Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & ClassStatics<typeof Mixin23> & RuntimeMixinClass) {}
class Mixin24 extends __Mixin24Base implements Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17, Mixin16 {
    public value24_0: number = 24000;
}

interface __Mixin25Base extends Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17 {}
class __Mixin25Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & ClassStatics<typeof Mixin23> & ClassStatics<typeof Mixin24> & RuntimeMixinClass) {}
class Mixin25 extends __Mixin25Base implements Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18, Mixin17 {
    public value25_0: number = 25000;
}

interface __Mixin26Base extends Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18 {}
class __Mixin26Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & ClassStatics<typeof Mixin23> & ClassStatics<typeof Mixin24> & ClassStatics<typeof Mixin25> & RuntimeMixinClass) {}
class Mixin26 extends __Mixin26Base implements Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19, Mixin18 {
    public value26_0: number = 26000;
}

interface __Mixin27Base extends Mixin26, Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19 {}
class __Mixin27Base extends (Object as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & ClassStatics<typeof Mixin23> & ClassStatics<typeof Mixin24> & ClassStatics<typeof Mixin25> & ClassStatics<typeof Mixin26> & RuntimeMixinClass) {}
class Mixin27 extends __Mixin27Base implements Mixin26, Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20, Mixin19 {
    public value27_0: number = 27000;
}

class __ConsumerEmpty {}
interface __ConsumerBase extends Mixin27, Mixin26, Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20 {}
class __ConsumerBase extends (__ConsumerEmpty as unknown as AnyConstructor & ClassStatics<typeof Mixin0> & ClassStatics<typeof Mixin1> & ClassStatics<typeof Mixin2> & ClassStatics<typeof Mixin3> & ClassStatics<typeof Mixin4> & ClassStatics<typeof Mixin5> & ClassStatics<typeof Mixin6> & ClassStatics<typeof Mixin7> & ClassStatics<typeof Mixin8> & ClassStatics<typeof Mixin9> & ClassStatics<typeof Mixin10> & ClassStatics<typeof Mixin11> & ClassStatics<typeof Mixin12> & ClassStatics<typeof Mixin13> & ClassStatics<typeof Mixin14> & ClassStatics<typeof Mixin15> & ClassStatics<typeof Mixin16> & ClassStatics<typeof Mixin17> & ClassStatics<typeof Mixin18> & ClassStatics<typeof Mixin19> & ClassStatics<typeof Mixin20> & ClassStatics<typeof Mixin21> & ClassStatics<typeof Mixin22> & ClassStatics<typeof Mixin23> & ClassStatics<typeof Mixin24> & ClassStatics<typeof Mixin25> & ClassStatics<typeof Mixin26> & RuntimeMixinClass) {}
class Consumer extends __ConsumerBase implements Mixin27, Mixin26, Mixin25, Mixin24, Mixin23, Mixin22, Mixin21, Mixin20 {}
const consumer = new Consumer();
void consumer.value27_0;
void consumer.value26_0;
void consumer.value25_0;
void consumer.value24_0;
void consumer.value23_0;
void consumer.value22_0;
void consumer.value21_0;
void consumer.value20_0;
