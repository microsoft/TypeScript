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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    var App;
    (function (App) {
        var Services;
        (function (Services) {
            var UserServices = (function () {
                function UserServices() {
                }
                UserServices.prototype.getUserName = function () {
                    return "Bill Gates";
                };
                __names(UserServices.prototype, ["getUserName"]);
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
    exports.__esModule = true;
    var Services = appJs.Services;
    var UserServices = Services.UserServices;
    var x = new UserServices().getUserName();
});
