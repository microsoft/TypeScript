//// [crashRegressionTest.js]
var MsPortal;
(function (MsPortal) {
    (function (Util) {
        (function (TemplateEngine) {
            "use strict";

            var StringTemplate = (function () {
                function StringTemplate(templateStorage) {
                    this._templateStorage = templateStorage;
                }
                StringTemplate.prototype.text = function (value) {
                    this._templateStorage.templateSources[this._name] = value;
                };
                return StringTemplate;
            })();

            var TemplateStorage = (function () {
                function TemplateStorage() {
                    this.templateSources = {};
                    this.templateData = {};
                }
                return TemplateStorage;
            })();
            TemplateEngine.TemplateStorage = TemplateStorage;
        })(Util.TemplateEngine || (Util.TemplateEngine = {}));
        var TemplateEngine = Util.TemplateEngine;
    })(MsPortal.Util || (MsPortal.Util = {}));
    var Util = MsPortal.Util;
})(MsPortal || (MsPortal = {}));
