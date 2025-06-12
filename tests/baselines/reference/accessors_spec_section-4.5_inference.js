//// [tests/cases/compiler/accessors_spec_section-4.5_inference.ts] ////

//// [accessors_spec_section-4.5_inference.ts]
class A { }
class B extends A { }

class LanguageSpec_section_4_5_inference {

    public set InferredGetterFromSetterAnnotation(a: A) { }
    public get InferredGetterFromSetterAnnotation() { return new B(); }

    public get InferredGetterFromSetterAnnotation_GetterFirst() { return new B(); }
    public set InferredGetterFromSetterAnnotation_GetterFirst(a: A) { }
    

    public get InferredFromGetter() { return new B(); }
    public set InferredFromGetter(a) { }

    public set InferredFromGetter_SetterFirst(a) { }
    public get InferredFromGetter_SetterFirst() { return new B(); }

    public set InferredSetterFromGetterAnnotation(a) { }
    public get InferredSetterFromGetterAnnotation() : A { return new B(); }

    public get InferredSetterFromGetterAnnotation_GetterFirst() : A { return new B(); }
    public set InferredSetterFromGetterAnnotation_GetterFirst(a) { }
}

//// [accessors_spec_section-4.5_inference.js]
class A {
}
class B extends A {
}
class LanguageSpec_section_4_5_inference {
    set InferredGetterFromSetterAnnotation(a) { }
    get InferredGetterFromSetterAnnotation() { return new B(); }
    get InferredGetterFromSetterAnnotation_GetterFirst() { return new B(); }
    set InferredGetterFromSetterAnnotation_GetterFirst(a) { }
    get InferredFromGetter() { return new B(); }
    set InferredFromGetter(a) { }
    set InferredFromGetter_SetterFirst(a) { }
    get InferredFromGetter_SetterFirst() { return new B(); }
    set InferredSetterFromGetterAnnotation(a) { }
    get InferredSetterFromGetterAnnotation() { return new B(); }
    get InferredSetterFromGetterAnnotation_GetterFirst() { return new B(); }
    set InferredSetterFromGetterAnnotation_GetterFirst(a) { }
}
