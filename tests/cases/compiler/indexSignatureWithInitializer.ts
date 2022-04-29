// These used to be indexers, now they are computed properties
interface I {
    [x = '']: string;
}

class C {
    [x = 0]: string
}