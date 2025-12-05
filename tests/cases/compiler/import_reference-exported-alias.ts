// @Filename: file1.ts
namespace App {
    export namespace Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

import Mod = App;
export = Mod;

// @Filename: file2.ts
// @module: amd
import appJs = require("file1");
import Services = appJs.Services;
import UserServices = Services.UserServices;
var x = new UserServices().getUserName();
