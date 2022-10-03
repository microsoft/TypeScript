interface IPropertySet {

    [index: string]: any;

}


var ps: IPropertySet = null;
var index: any = "hello";
ps[index] = 12;


interface indexErrors {
    [p2?: string];
    [...p3: any[]];
    [p4: string, p5?: string];
    [p6: string, ...p7: any[]];
}