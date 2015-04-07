interface IPropertySet {
    [index: string]: any;
}

var ps: IPropertySet = null;
var index: any = "hello";
ps[index] = 12;

enum Val {
    a = 1,
    b = 2
}

type Val2 = Val;
type Val3 = number;
 
interface IEnum {
    [index: Val]: Val;
}

interface IEnum2 {
    [index: Val2]: Val2;
}
interface IEnum3 {
    [index: Val3]: Val3;
}

var pe: IEnum = null;

pe[1] = null
pe[3] = null
pe[Val.b] = 5

pe[true] = null



interface indexErrors {
    [p2?: string];
    [...p3: any[]];
    [p4: string, p5?: string];
    [p6: string, ...p7: any[]];
}