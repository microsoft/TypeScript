class IPropertySet {
    [index: string]: any
}

var ps: IPropertySet = null;
var index: any = "hello";
// 766379
//ps[index] = 12;

// BUG 765883
interface indexErrors {
    [p2?: string]
    [...p3: any[]]
    [p4: string, p5?: string]
    [p6: string, ...p7: any[]]
}