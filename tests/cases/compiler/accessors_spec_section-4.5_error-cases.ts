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