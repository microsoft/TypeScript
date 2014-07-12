interface List<T> {
    data: T;
    next: List<T>; // will be recursive reference when OwnerList is expanded
    owner: OwnerList<T>;
}

interface OwnerList<U> extends List<List<U>> {
    name: string;
}

interface OwnerList2<U> extends List<List<U>> {
    name: string;
}

var o1: OwnerList<number>;
var o2: OwnerList2<number>;

o1 = o2; // should not error