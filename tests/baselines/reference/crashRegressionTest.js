//// [crashRegressionTest.ts]
module MsPortal.Util.TemplateEngine {
    "use strict";
 
    interface TemplateKeyValue {
        [name: string]: string;
    }
 
    class StringTemplate {
        private _templateStorage: TemplateStorage;
 
        constructor(templateStorage: TemplateStorage) {
            this._templateStorage = templateStorage;
        }
 
        public text(value?: string): any {
            this._templateStorage.templateSources[this._name] = value;
        }
    }
 
    export class TemplateStorage {
        public templateSources: TemplateKeyValue = {};
        public templateData: TemplateKeyValue = {};
    }
}


//// [crashRegressionTest.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var MsPortal;
(function (MsPortal) {
    var Util;
    (function (Util) {
        var TemplateEngine;
        (function (TemplateEngine) {
            "use strict";
            var StringTemplate = (function () {
                function StringTemplate(templateStorage) {
                    this._templateStorage = templateStorage;
                }
                StringTemplate.prototype.text = function (value) {
                    this._templateStorage.templateSources[this._name] = value;
                };
                __names(StringTemplate.prototype, ["text"]);
                return StringTemplate;
            }());
            var TemplateStorage = (function () {
                function TemplateStorage() {
                    this.templateSources = {};
                    this.templateData = {};
                }
                return TemplateStorage;
            }());
            TemplateEngine.TemplateStorage = TemplateStorage;
        })(TemplateEngine = Util.TemplateEngine || (Util.TemplateEngine = {}));
    })(Util = MsPortal.Util || (MsPortal.Util = {}));
})(MsPortal || (MsPortal = {}));
