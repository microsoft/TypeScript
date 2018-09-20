declare var a;

// parentheses should be omitted
// literals
(<any>{a:0});  
(<any>[1,3,]); 
(<any>"string"); 
(<any>23.0); 
(<any>1); 
(<any>1.);
(<any>1.0);
(<any>12e+34);
(<any>0xff);
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
(<any>1).foo;
(<any>1.).foo;
(<any>1.0).foo;
(<any>12e+34).foo;
(<any>0xff).foo;

declare var A;

// should keep the parentheses in emit
(<any>(1.0)); 
(<any>new A).foo; 
(<any>typeof A).x; 
(<any>-A).x; 
new (<any>A());
(<Tany>()=> {})();
(<any>function foo() { })();
(<any><number><any>-A).x; 

// nested cast, should keep one pair of parenthese
(<any><number>(<any>-A)).x; 

// nested parenthesized expression, should keep one pair of parenthese
(<any>(A)) 

