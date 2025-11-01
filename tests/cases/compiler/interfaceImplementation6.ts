//@module: amd
interface I1 {
    item:number;
}

class C1 implements I1 {
    public item:number;
}

class C2 implements I1 {
    private item:number;
}

class C3 implements I1 {
    constructor() {
       var item: number;
    }
}
 
export class Test {
    private pt: I1 = { item: 1 };
}


