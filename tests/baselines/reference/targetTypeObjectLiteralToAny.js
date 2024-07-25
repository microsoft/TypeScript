//// [tests/cases/compiler/targetTypeObjectLiteralToAny.ts] ////

//// [targetTypeObjectLiteralToAny.ts]
function suggest(){ 
	var TypeScriptKeywords:string[];  
	var result:any;	
					
	TypeScriptKeywords.forEach(function(keyword) {						
		result.push({text:keyword, type:"keyword"}); // this should not cause a crash - push should be typed to any
	});			
}



//// [targetTypeObjectLiteralToAny.js]
function suggest() {
    var TypeScriptKeywords;
    var result;
    TypeScriptKeywords.forEach(function (keyword) {
        result.push({ text: keyword, type: "keyword" }); // this should not cause a crash - push should be typed to any
    });
}
