//// interface Pos { x: number, y: number };
//// const p = { x: 1, y: 2 } as Pos;
//// const foo = (o: Pos) => o.x + o.y;

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("interface.declaration", "Pos"), 
    c2.semanticToken("property.declaration", "x"), 
    c2.semanticToken("property.declaration", "y"), 
    c2.semanticToken("variable.declaration.readonly", "p"), 
    c2.semanticToken("property.declaration", "x"), 
    c2.semanticToken("property.declaration", "y"), 
    c2.semanticToken("interface", "Pos"), 
    c2.semanticToken("function.declaration.readonly", "foo"), 
    c2.semanticToken("parameter.declaration", "o"), 
    c2.semanticToken("interface", "Pos"), 
    c2.semanticToken("parameter", "o"), 
    c2.semanticToken("property", "x"), 
    c2.semanticToken("parameter", "o"), 
    c2.semanticToken("property", "y"), 
);;