// @Filename: file1.ts
export namespace App {
    export namespace Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

// @Filename: file2.ts
// @module: amd
import appJs = require("file1");
import Services = appJs.App.Services;
var x = new Services.UserServices().getUserName();
