//// [overloadsWithTypePredicates02.ts]

interface Nil {
}

interface Cons<T> {
    value: T;
    next: List<T>;
}

type List<T> = Cons<T> | Nil;
const nil: Nil = {};
function cons<T>(value: T, next: List<T>) {
    return { value, next };
}

function hasElements<T>(list: Cons<T>): list is Cons<T>;
function hasElements<T>(list: List<T>): list is Cons<T>;
function hasElements<T>(list: List<T>): list is Cons<T> {
    return !!(list as Cons<T>).next;
}

function isEmpty(list: Nil): list is Nil;
function isEmpty<T>(list: List<T>): list is Nil;
function isEmpty<T>(list: List<T>): boolean {
    return !isEmpty(list);
}

let listA = cons(1, cons(2, cons(3, nil)));
let listB = nil;
let listC: List<number> = listA || listB;

if (isEmpty(listA)) {
    let a = listA;
}
else {
    let a = listA;
}

if (hasElements(listC)) {
    let { value } = listC;
}
else {
    let myNil: Nil = listC;
}

if (hasElements(listB)) {
    let somehowCons: Cons<any> = listB;
}
else {
    let myNil: Nil = listB;
}

//// [overloadsWithTypePredicates02.js]
var nil = {};
function cons(value, next) {
    return { value: value, next: next };
}
function hasElements(list) {
    return !!list.next;
}
function isEmpty(list) {
    return !isEmpty(list);
}
var listA = cons(1, cons(2, cons(3, nil)));
var listB = nil;
var listC = listA || listB;
if (isEmpty(listA)) {
    var a = listA;
}
else {
    var a = listA;
}
if (hasElements(listC)) {
    var value = listC.value;
}
else {
    var myNil = listC;
}
if (hasElements(listB)) {
    var somehowCons = listB;
}
else {
    var myNil = listB;
}


//// [overloadsWithTypePredicates02.d.ts]
interface Nil {
}
interface Cons<T> {
    value: T;
    next: List<T>;
}
declare type List<T> = Cons<T> | Nil;
declare const nil: Nil;
declare function cons<T>(value: T, next: List<T>): {
    value: T;
    next: Cons<T> | Nil;
};
declare function hasElements<T>(list: Cons<T>): list is Cons<T>;
declare function hasElements<T>(list: List<T>): list is Cons<T>;
declare function isEmpty(list: Nil): list is Nil;
declare function isEmpty<T>(list: List<T>): list is Nil;
declare let listA: {
    value: number;
    next: Cons<number> | Nil;
};
declare let listB: Nil;
declare let listC: List<number>;
