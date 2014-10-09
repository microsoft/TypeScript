/// <reference path='fourslash.ts'/>
////interface Collection<T> {
////    length: number;
////    add(x: T): void;
////    remove(x: T): boolean;
////}

////interface Combinators {
////    map<T, U>(c: Collection<T>, f: (x: T) => U): Collection<U>;
////    map<T>(c: Collection<T>, f: (x: T) => any): Collection<any>;
////}

////class A {
////    foo<T>() { return this; }
////}

////class B<T> {
////    foo(x: T): T { return null; }
////}

////var c2: Collection<number>;
////var c3: Collection<Collection<number>>;
////var c4: Collection<A>;
////var c5: Collection<B<any>>;

////var _: Combinators;
////var rf1 = (x: number) => { return x.toFixed() };
////var rf2 = (x: Collection<number>) => { return x.length };
////var rf3 = (x: A) => { return x.foo() };

////var /*9*/r1a = _.map(c2, (/*1*/x) => { return x.toFixed() });
////var /*10*/r1b = _.map(c2, rf1);

////var /*11*/r2a = _.map(c3, (/*2*/x: Collection<number>) => { return x.length });
////var /*12*/r2b = _.map(c3, rf2);

////var /*13*/r3a = _.map(c4, (/*3*/x) => { return x.foo() });
////var /*14*/r3b = _.map(c4, rf3);

////var /*15*/r4a = _.map(c5, (/*4*/x) => { return x.foo(1) });

////var /*17*/r5a = _.map<number, string>(c2, (/*5*/x) => { return x.toFixed() });
////var /*18*/r5b = _.map<number, string>(c2, rf1);

////var /*19*/r6a = _.map<Collection<number>, number>(/*6*/c3, (x: Collection<number>) => { return x.length });
////var /*20*/r6b = _.map<Collection<number>, number>(c3, rf2);

////var /*21*/r7a = _.map<A, A>(c4, (/*7*/x: A) => { return x.foo() });
////var /*22*/r7b = _.map<A, A>(c4, rf3);

////var /*23*/r8a = _.map</*error1*/B/*error2*/, string>(c5, (/*8*/x) => { return x.foo() });

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('1');
verify.quickInfoIs('(parameter) x: number');
goTo.marker('2');
verify.quickInfoIs('(parameter) x: Collection<number>');
goTo.marker('3');
verify.quickInfoIs('(parameter) x: A');
goTo.marker('4');
verify.quickInfoIs('(parameter) x: B<any>');
goTo.marker('5');
verify.quickInfoIs('(parameter) x: number');
goTo.marker('6');
verify.quickInfoIs('(var) c3: Collection<Collection<number>>');
goTo.marker('7');
verify.quickInfoIs('(parameter) x: A');
goTo.marker('8');
verify.quickInfoIs('(parameter) x: any'); // Specialized to any because no type argument was specified
goTo.marker('9');
verify.quickInfoIs('(var) r1a: Collection<string>');
goTo.marker('10');
verify.quickInfoIs('(var) r1b: Collection<string>');
goTo.marker('11');
verify.quickInfoIs('(var) r2a: Collection<number>');
goTo.marker('12');
verify.quickInfoIs('(var) r2b: Collection<number>');
goTo.marker('13');
verify.quickInfoIs('(var) r3a: Collection<A>');
goTo.marker('14');
verify.quickInfoIs('(var) r3b: Collection<A>');
goTo.marker('15');
verify.quickInfoIs('(var) r4a: Collection<any>');
goTo.marker('17');
verify.quickInfoIs('(var) r5a: Collection<string>');
goTo.marker('18');
verify.quickInfoIs('(var) r5b: Collection<string>');
goTo.marker('19');
verify.quickInfoIs('(var) r6a: Collection<number>');
goTo.marker('20');
verify.quickInfoIs('(var) r6b: Collection<number>');
goTo.marker('21');
verify.quickInfoIs('(var) r7a: Collection<A>');
goTo.marker('22');
verify.quickInfoIs('(var) r7b: Collection<A>');
goTo.marker('23');
verify.quickInfoIs('(var) r8a: Collection<string>');

verify.errorExistsBetweenMarkers('error1', 'error2');