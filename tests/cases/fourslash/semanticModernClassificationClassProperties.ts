//// class A { 
////   private y: number;
////   constructor(public x : number, _y : number) { this.y = _y; }
////   get z() : number { return this.x + this.y; }
////   set a(v: number) { }
//// }

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "A"), 
    c2.semanticToken("property.declaration", "y"), 
    c2.semanticToken("parameter.declaration", "x"), 
    c2.semanticToken("parameter.declaration", "_y"), 
    c2.semanticToken("property", "y"), 
    c2.semanticToken("parameter", "_y"), 
    c2.semanticToken("property.declaration", "z"), 
    c2.semanticToken("property", "x"), 
    c2.semanticToken("property", "y"), 
    c2.semanticToken("property.declaration", "a"), 
    c2.semanticToken("parameter.declaration", "v"), 
);;