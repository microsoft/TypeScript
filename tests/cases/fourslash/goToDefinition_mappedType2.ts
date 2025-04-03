///<reference path="fourslash.ts"/>

////interface Foo {
////    /*def*/property: string
////}
////
////type JustMapIt<T> = {[P in keyof T]: 0}
////type MapItWithRemap<T> = {[P in keyof T as P extends string ? `mapped_${P}` : never]: 0}
////
////{
////    let gotoDef!: JustMapIt<Foo>
////    gotoDef.property
////}
////
////{
////    let gotoDef!: MapItWithRemap<Foo>
////    gotoDef.[|/*ref*/mapped_property|]
////}


verify.baselineGoToDefinition("ref");
