//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
("I AM THE " + "TAG" + " " + " PORTION")(templateObject_4828094090_1 || (templateObject_4828094090_1 = __makeTemplateObject(["I ", " THE TEMPLATE PORTION"], ["I ", " THE TEMPLATE PORTION"])), "AM");
var templateObject_4828094090_1;
