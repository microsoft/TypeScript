class Linq {
    public static select<T, S>(values: T[], func: (v: T) => A): any[] {
        var result = new Array(values.length);
 
        for (var i = 0; i < values.length; i++) {
            result[i] = func(values[i]);
        }
 
        return result;
    }
}
