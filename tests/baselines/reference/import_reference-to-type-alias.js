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
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App;
    (function (App) {
        let Services;
        (function (Services) {
            class UserServices {
                getUserName() {
                    return "Bill Gates";
                }
            }
            Services.UserServices = UserServices;
        })(Services = App.Services || (App.Services = {}));
    })(App || (exports.App = App = {}));
});
//// [file2.js]
define(["require", "exports", "file1"], function (require, exports, appJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services = appJs.App.Services;
    var x = new Services.UserServices().getUserName();
});
