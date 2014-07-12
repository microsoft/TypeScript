///<reference path='languageService.ts'/>

module TypeScript.Services {
    export interface ILanguageServicesDiagnostics {
        log(content: string): void;
    }
}
