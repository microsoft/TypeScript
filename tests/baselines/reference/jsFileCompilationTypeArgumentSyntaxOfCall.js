//// [a.jsx]
Foo<number>();
Foo<number>``;
<Foo<number>></Foo>;
<Foo<number>/>;

//// [a.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Foo();
Foo(templateObject_5381_1 || (templateObject_5381_1 = __makeTemplateObject([""], [""])));
<Foo></Foo>;
<Foo />;
var templateObject_5381_1;
