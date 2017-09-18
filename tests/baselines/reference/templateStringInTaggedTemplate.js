//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
("I AM THE " + "TAG" + " " + " PORTION")(_a || (_a = __makeTemplateObject(["I ", " THE TEMPLATE PORTION"], ["I ", " THE TEMPLATE PORTION"])), "AM");
var _a;
