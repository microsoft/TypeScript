// @declaration: true

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