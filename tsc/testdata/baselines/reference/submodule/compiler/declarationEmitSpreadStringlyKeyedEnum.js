//// [tests/cases/compiler/declarationEmitSpreadStringlyKeyedEnum.ts] ////

//// [declarationEmitSpreadStringlyKeyedEnum.ts]
enum AgeGroups { "0-17" , "18-22" , "23-27" , "28-34" , "35-44" , "45-59" , "60-150" }
export const SpotifyAgeGroupEnum = { ...AgeGroups };

//// [declarationEmitSpreadStringlyKeyedEnum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAgeGroupEnum = void 0;
var AgeGroups;
(function (AgeGroups) {
    AgeGroups[AgeGroups["0-17"] = 0] = "0-17";
    AgeGroups[AgeGroups["18-22"] = 1] = "18-22";
    AgeGroups[AgeGroups["23-27"] = 2] = "23-27";
    AgeGroups[AgeGroups["28-34"] = 3] = "28-34";
    AgeGroups[AgeGroups["35-44"] = 4] = "35-44";
    AgeGroups[AgeGroups["45-59"] = 5] = "45-59";
    AgeGroups[AgeGroups["60-150"] = 6] = "60-150";
})(AgeGroups || (AgeGroups = {}));
exports.SpotifyAgeGroupEnum = { ...AgeGroups };
