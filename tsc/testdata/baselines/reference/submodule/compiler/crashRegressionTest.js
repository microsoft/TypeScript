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
    let Util;
    (function (Util) {
        let TemplateEngine;
        (function (TemplateEngine) {
            "use strict";
            "use strict";
            class StringTemplate {
                _templateStorage;
                constructor(templateStorage) {
                    this._templateStorage = templateStorage;
                }
                text(value) {
                    this._templateStorage.templateSources[this._name] = value;
                }
            }
            class TemplateStorage {
                templateSources = {};
                templateData = {};
            }
            TemplateEngine.TemplateStorage = TemplateStorage;
        })(TemplateEngine = Util.TemplateEngine || (Util.TemplateEngine = {}));
    })(Util = MsPortal.Util || (MsPortal.Util = {}));
})(MsPortal || (MsPortal = {}));
