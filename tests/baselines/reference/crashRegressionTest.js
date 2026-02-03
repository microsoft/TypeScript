//// [tests/cases/compiler/crashRegressionTest.ts] ////

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
var MsPortal;
(function (MsPortal) {
    var Util;
    (function (Util) {
        var TemplateEngine;
        (function (TemplateEngine) {
            "use strict";
            var StringTemplate = /** @class */ (function () {
                function StringTemplate(templateStorage) {
                    this._templateStorage = templateStorage;
                }
                StringTemplate.prototype.text = function (value) {
                    this._templateStorage.templateSources[this._name] = value;
                };
                return StringTemplate;
            }());
            var TemplateStorage = /** @class */ (function () {
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
