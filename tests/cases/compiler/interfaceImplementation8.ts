/*
    1
*/
interface i1 {
    name: string;
}

class C1 implements i1 {
    public name:string;
}

class C2 implements i1 {
    private name:string;
}

class C3 {
    private name:any;
}

class C4 extends C1 implements i1{ }
class C5 extends C2 implements i1{ }
class C6 extends C3 implements i1{ }

/*
    2
*/

interface i2 {
    name: string;
    age: number;
}

class C7 {
    public name:string;
}

class C8 extends C7 implements i2{
    public age:number;
}
