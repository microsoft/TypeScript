//// class A {
////   static x = 9;
////   f = 9;
////   async m() { return A.x + await this.m(); };
////   get s() { return this.f; 
////   static t() { return new A().f; };
////   constructor() {}
//// }

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "A"), 
    c2.semanticToken("property.declaration.static", "x"), 
    c2.semanticToken("property.declaration", "f"), 
    c2.semanticToken("member.declaration.async", "m"), 
    c2.semanticToken("class", "A"), 
    c2.semanticToken("property.static", "x"), 
    c2.semanticToken("member.async", "m"), 
    c2.semanticToken("property.declaration", "s"), 
    c2.semanticToken("property", "f"), 
    c2.semanticToken("member.declaration.static", "t"), 
    c2.semanticToken("class", "A"), 
    c2.semanticToken("property", "f"), 
);;