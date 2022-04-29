interface I {
    x: number;
}
class C implements I {
    private x = 0; // should raise error at class decl
}