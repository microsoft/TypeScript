export function clone<T>(obj: T): T {
	if (!obj || typeof obj !== 'object') {
		return obj;
	}
	var result = (Array.isArray(obj)) ? <any>[] : <any>{};
	Object.keys(obj).forEach((key) => {
		if (obj[key] && typeof obj[key] === 'object') {
			result[key] = clone(obj[key]);
		} else {
			result[key] = obj[key];
		}
	});
	return result;
}