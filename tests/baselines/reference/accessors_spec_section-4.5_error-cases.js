//// [tests/cases/compiler/accessors_spec_section-4.5_error-cases.ts] ////

//// [accessors_spec_section-4.5_error-cases.ts]
class LanguageSpec_section_4_5_error_cases {
    public set AnnotatedSetter_SetterFirst(a: number) { }
    public get AnnotatedSetter_SetterFirst() { return ""; }

    public get AnnotatedSetter_SetterLast() { return ""; }
    public set AnnotatedSetter_SetterLast(a: number) { }

    public get AnnotatedGetter_GetterFirst(): string { return ""; }
    public set AnnotatedGetter_GetterFirst(aStr) { aStr = 0; }

    public set AnnotatedGetter_GetterLast(aStr) { aStr = 0; }
    public get AnnotatedGetter_GetterLast(): string { return ""; }
}

//// [accessors_spec_section-4.5_error-cases.js]
class LanguageSpec_section_4_5_error_cases {
    set AnnotatedSetter_SetterFirst(a) { }
    get AnnotatedSetter_SetterFirst() { return ""; }
    get AnnotatedSetter_SetterLast() { return ""; }
    set AnnotatedSetter_SetterLast(a) { }
    get AnnotatedGetter_GetterFirst() { return ""; }
    set AnnotatedGetter_GetterFirst(aStr) { aStr = 0; }
    set AnnotatedGetter_GetterLast(aStr) { aStr = 0; }
    get AnnotatedGetter_GetterLast() { return ""; }
}
