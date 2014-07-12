//// [tests/cases/compiler/import_reference-to-type-alias.ts] ////

//// [file1.ts]
export module App {
    export module Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

//// [file2.ts]
import appJs = require("file1");
import Services = appJs.App.Services;
var x = new Services.UserServices().getUserName();


//// [file1.js]
define(["require", "exports"], function (require, exports) {
    (function (App) {
        (function (Services) {
            var UserServices = (function () {
                function UserServices() {
                }
                UserServices.prototype.getUserName = function () {
                    return "Bill Gates";
                };
                return UserServices;
            })();
            Services.UserServices = UserServices;
        })(App.Services || (App.Services = {}));
        var Services = App.Services;
    })(exports.App || (exports.App = {}));
    var App = exports.App;
});
//// [file2.js]
define(["require", "exports", "file1"], function (require, exports, appJs) {
    var Services = appJs.App.Services;
    var x = new Services.UserServices().getUserName();
});
