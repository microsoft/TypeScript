//// [tests/cases/conformance/es6/templates/templateStringInTaggedTemplate.ts] ////

//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
"I AM THE ".concat("".concat("TAG", " "), " PORTION")(__makeTemplateObject(["I ", " THE TEMPLATE PORTION"], ["I ", " THE TEMPLATE PORTION"]), "AM");
