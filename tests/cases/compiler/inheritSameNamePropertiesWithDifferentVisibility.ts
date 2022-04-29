class C {
    public x: number;
}

class C2 {
    private x: number;
}

interface A extends C, C2 { // error
    y: string;
}