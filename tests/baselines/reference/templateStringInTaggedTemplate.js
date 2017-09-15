//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
("I AM THE " + "TAG" + " " + " PORTION")(_a || (_a = __getTemplateObject(["I ", " THE TEMPLATE PORTION"], ["I ", " THE TEMPLATE PORTION"])), "AM");
var _a;
