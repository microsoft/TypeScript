//// [typeGuardNesting.ts]
let strOrBool: string|boolean;
if ((typeof strOrBool === 'boolean' && !strOrBool) || typeof strOrBool === 'string') {
	var label: string = (typeof strOrBool === 'string') ? strOrBool : "other string";
}

//// [typeGuardNesting.js]
var strOrBool;
if ((typeof strOrBool === 'boolean' && !strOrBool) || typeof strOrBool === 'string') {
    var label = (typeof strOrBool === 'string') ? strOrBool : "other string";
}
