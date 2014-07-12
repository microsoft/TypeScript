//// [variableDeclaratorResolvedDuringContextualTyping.js]
var WinJS;
(function (WinJS) {
})(WinJS || (WinJS = {}));

var Errors;
(function (Errors) {
    var ConnectionError = (function () {
        function ConnectionError(request) {
        }
        return ConnectionError;
    })();
    Errors.ConnectionError = ConnectionError;
})(Errors || (Errors = {}));

var FileService = (function () {
    function FileService() {
    }
    FileService.prototype.uploadData = function () {
        var _this = this;
        var path = "";
        return this.requestService.makeRequest({
            url: this.requestService.getRequestUrl('root', path),
            type: 'POST',
            headers: {},
            data: "someData"
        }).then(function (response) {
            var result = {
                stat: _this.jsonToStat(newFilePath, "someString"),
                isNew: response.status === 201
            };

            return WinJS.TPromise.as(result);
        }, function (xhr) {
            return WinJS.Promise.wrapError(new Errors.ConnectionError(xhr));
        });
    };
    return FileService;
})();
