//@module: amd
// @Filename: memberAccessMustUseModuleInstances_0.ts
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

// @Filename: memberAccessMustUseModuleInstances_1.ts
///<reference path='memberAccessMustUseModuleInstances_0.ts'/>
import WinJS = require('memberAccessMustUseModuleInstances_0');

WinJS.Promise.timeout(10);
