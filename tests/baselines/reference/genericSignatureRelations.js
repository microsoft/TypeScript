//// [genericSignatureRelations.ts]
// Repro from #48070

type S<X> = <T>() => T extends X ? 1 : '2';

type Foo1 = S<'s1'>;
type Foo2 = S<'s2'>;

type Result1 = Foo1 extends Foo2 ? true : false;
type Result2 = S<'s1'> extends S<'s2'> ? true : false;


//// [genericSignatureRelations.js]
"use strict";
// Repro from #48070


//// [genericSignatureRelations.d.ts]
declare type S<X> = <T>() => T extends X ? 1 : '2';
declare type Foo1 = S<'s1'>;
declare type Foo2 = S<'s2'>;
declare type Result1 = Foo1 extends Foo2 ? true : false;
declare type Result2 = S<'s1'> extends S<'s2'> ? true : false;
