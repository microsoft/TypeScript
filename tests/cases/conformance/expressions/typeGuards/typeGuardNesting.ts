let strOrBool: string|boolean;
if ((typeof strOrBool === 'boolean' && !strOrBool) || typeof strOrBool === 'string') {
	var label: string = (typeof strOrBool === 'string') ? strOrBool : "other string";
}