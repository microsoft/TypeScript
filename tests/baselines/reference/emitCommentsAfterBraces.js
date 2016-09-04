//// [emitCommentsAfterBraces.ts]
if (true) {//validation and tokenization
	let a = 42;
}

if (true) {/*comment*/ let a = 42;}


//// [emitCommentsAfterBraces.js]
if (true) { //validation and tokenization
    var a = 42;
}
if (true) { /*comment*/ 
    var a = 42;
}
