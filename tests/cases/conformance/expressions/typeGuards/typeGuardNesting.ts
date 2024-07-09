let strOrBool: string|boolean;
if ((typeof strOrBool === 'boolean' && !strOrBool) || typeof strOrBool === 'string') {
	let label: string = (typeof strOrBool === 'string') ? strOrBool : "string";
	let bool: boolean = (typeof strOrBool === 'boolean') ? strOrBool : false;
	let label2: string = (typeof strOrBool !== 'boolean') ? strOrBool : "string";
	let bool2: boolean = (typeof strOrBool !== 'string') ? strOrBool : false;
}

if ((typeof strOrBool !== 'string' && !strOrBool) || typeof strOrBool !== 'boolean') {
	let label: string = (typeof strOrBool === 'string') ? strOrBool : "string";
	let bool: boolean = (typeof strOrBool === 'boolean') ? strOrBool : false;
	let label2: string = (typeof strOrBool !== 'boolean') ? strOrBool : "string";
	let bool2: boolean = (typeof strOrBool !== 'string') ? strOrBool : false;
}
