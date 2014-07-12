//// [castExpressionParentheses.ts]
declare var a;

// parentheses should be omitted
// literals
(<any>{a:0});  
(<any>[1,3,]); 
(<any>"string"); 
(<any>23.0); 
(<any>/regexp/g); 
(<any>false); 
(<any>true); 
(<any>null); 
// names and dotted names
(<any>this); 
(<any>this.x); 
(<any>(<any>a).x);
(<any><any>a);
(<any>a[0]);
(<any>a.b["0"]);
(<any>a()).x;

declare var A;

// should keep the parentheses in emit
(<any>new A).foo; 
(<any>typeof A).x; 
(<any>-A).x; 
new (<any>A());
(<any>()=> {})();
(<any>function foo() { })();
(<any><number><any>-A).x; 

// nested cast, should keep one pair of parenthese
(<any><number>(<any>-A)).x; 

// nested parenthesized expression, should keep one pair of parenthese
(<any>(A)) 



//// [castExpressionParentheses.js]
// parentheses should be omitted
// literals
{ a: 0 };
[1, 3];
"string";
23.0;
/regexp/g;
false;
true;
null;

// names and dotted names
this;
this.x;
a.x;
a;
a[0];
a.b["0"];
a().x;

// should keep the parentheses in emit
(new A).foo;
(typeof A).x;
(-A).x;
new (A());
(function () {
})();
(function foo() {
})();
(-A).x;

// nested cast, should keep one pair of parenthese
(-A).x;

// nested parenthesized expression, should keep one pair of parenthese
(A);
