// @target: es2015
type A = {
    [key: string,]: string;
};

interface B {
    [key: string,]: string;
}

class C {
    [key: string,]: null;
}
