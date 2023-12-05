//// [tests/cases/compiler/import_reference-exported-alias.ts] ////

//// [file1.ts]
module App {
    export module Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

import Mod = App;
export = Mod;

//// [file2.ts]
import appJs = require("file1");
import Services = appJs.Services;
import UserServices = Services.UserServices;
var x = new UserServices().getUserName();


//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var App;
    (function (App) {
        var Services;
        (function (Services) {
            var UserServices = /** @class */ (function () {
                function UserServices() {
                }
                UserServices.prototype.getUserName = function () {
                    return "Bill Gates";
                };
                return UserServices;
            }());
            Services.UserServices = UserServices;
        })(Services = App.Services || (App.Services = {}));
    })(App || (App = {}));
    var Mod = App;
    return Mod;
});
//// [file2.js]
define(["require", "exports", "file1"], function (require, exports, appJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services = appJs.Services;
    var UserServices = Services.UserServices;
    var x = new UserServices().getUserName();
});
