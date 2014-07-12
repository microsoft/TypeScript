/// <reference path='fourslash.ts'/>

////interface Collection<T, U> {
////    length: number;
////    add(x: T, y: U): void ;
////    remove(x: T, y: U): boolean;
////}
////}
////interface Combinators {
////    map<T, U, V>(c: Collection<T, U>, f: (x: T, y: U) => V): Collection<T, V>;
////    map<T, U>(c: Collection<T, U>, f: (x: T, y: U) => any): Collection<any, any>;
////}
////}
////class A {
////    foo<T>(): T { return null; }
////}
////}
////class B<T> {
////    foo(x: T): T { return null; }
////}
////}
////var c1: Collection<any, any>;
////var c2: Collection<number, string>;
////var c3: Collection<Collection<number, number>, string>;
////var c4: Collection<number, A>;
////var c5: Collection<number, B<any>>;
////}
////var _: Combinators;
////// param help on open paren for arg 2 should show 'number' not T or 'any'
////// x should be contextually typed to number
////var rf1 = (x: number, y: string) => { return x.toFixed() };
////var rf2 = (x: Collection<number, number>, y: string) => { return x.length };
////var rf3 = (x: number, y: A) => { return y.foo() };
////}
////var r1a/*9*/  = _.map/*1c*/(c2, (x/*1a*/, y/*1b*/) => { return x.toFixed() });
////var r1b/*10*/ = _.map(c2, rf1);
////}
////var r2a/*11*/ = _.map(c3, (x/*2a*/, y/*2b*/) => { return x.length });
////var r2b/*12*/ = _.map(c3, rf2);
////}
////var r3a/*13*/ = _.map(c4, (x/*3a*/, y/*3b*/) => { return y.foo() });
////var r3b/*14*/ = _.map(c4, rf3);
////}
////var r4a/*15*/ = _.map(c5, (x/*4a*/, y/*4b*/) => { return y.foo() });
////}
////var r5a/*17*/ = _./*17error1*/map/*17error2*/<number, string, Date>(c2, (x/*5a*/, y/*5b*/) => { return x.toFixed() }); 
////var rf1b = (x: number, y: string) => { return new Date() };
////var r5b/*18*/ = _.map<number, string, Date>(c2, rf1b);
////
////var r6a/*19*/ = _.map<Collection<number, number>, string, Date>(c3, (x/*6a*/,y/*6b*/) => { return new Date(); });
////var rf2b = (x: Collection<number, number>, y: string) => { return new Date(); };
////var r6b/*20*/ = _.map<Collection<number, number>, string, Date>(c3, rf2b);
////
////var r7a/*21*/ = _./*21error1*/map/*21error2*/<number, A, string>(c4, (x/*7a*/,y/*7b*/) => { return y.foo() });
////var r7b/*22*/ = _./*22error1*/map/*22error2*/<number, A, string>(c4, rf3);
////
////var r8a/*23*/ = _.map<number, /*error1*/B/*error2*/, string>(c5, (x/*8a*/,y/*8b*/) => { return y.foo() }); 

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('2a');
verify.quickInfoIs('Collection<number, number>');
goTo.marker('2b');
verify.quickInfoIs('string');

goTo.marker('3a');
verify.quickInfoIs('number');
goTo.marker('3b');
verify.quickInfoIs('A');

goTo.marker('4a');
verify.quickInfoIs('number');
goTo.marker('4b');
verify.quickInfoIs('B<any>');

goTo.marker('5a');
verify.quickInfoIs('number');
goTo.marker('5b');
verify.quickInfoIs('string');

goTo.marker('6a');
verify.quickInfoIs('Collection<number, number>');
goTo.marker('6b');
verify.quickInfoIs('string');

goTo.marker('7a');
verify.quickInfoIs('number');
goTo.marker('7b');
verify.quickInfoIs('A');

goTo.marker('8a');
verify.quickInfoIs('number');
goTo.marker('8b');
verify.quickInfoIs('B<any>'); // Specialized to any because no type argument was specified

goTo.marker('9');
verify.quickInfoIs('Collection<number, string>');
goTo.marker('10');
verify.quickInfoIs('Collection<number, string>');
goTo.marker('11');
verify.quickInfoIs('Collection<Collection<number, number>, number>');
goTo.marker('12');
verify.quickInfoIs('Collection<Collection<number, number>, number>');
goTo.marker('13');
verify.quickInfoIs('Collection<number, {}>');
goTo.marker('14');
verify.quickInfoIs('Collection<number, {}>');
goTo.marker('15');
verify.quickInfoIs('Collection<number, any>');

goTo.marker('17');
verify.quickInfoIs('any'); // This is actually due to an error because toFixed does not return a Date

goTo.marker('18');
verify.quickInfoIs('Collection<number, Date>');

goTo.marker('19');
verify.quickInfoIs('Collection<Collection<number, number>, Date>');

goTo.marker('20');
verify.quickInfoIs('Collection<Collection<number, number>, Date>');

goTo.marker('21');
verify.quickInfoIs('any'); // This call is an error because y.foo() does not return a string

goTo.marker('22');
verify.quickInfoIs('any'); // This call is an error because y.foo() does not return a string

goTo.marker('23');
verify.quickInfoIs('Collection<number, string>');

verify.errorExistsBetweenMarkers('error1', 'error2');
verify.errorExistsBetweenMarkers('17error1', '17error2');
verify.errorExistsBetweenMarkers('21error1', '21error2');
verify.errorExistsBetweenMarkers('22error1', '22error2');