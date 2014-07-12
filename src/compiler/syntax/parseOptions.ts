///<reference path='references.ts' />

module TypeScript {
    export class ParseOptions {
        private _languageVersion: LanguageVersion;
        private _allowAutomaticSemicolonInsertion: boolean;

        constructor(languageVersion: LanguageVersion,
                    allowAutomaticSemicolonInsertion: boolean) {
            this._languageVersion = languageVersion;
            this._allowAutomaticSemicolonInsertion = allowAutomaticSemicolonInsertion;
        }


        public toJSON(key: any) {
            return { allowAutomaticSemicolonInsertion: this._allowAutomaticSemicolonInsertion };
         }

        public languageVersion(): LanguageVersion {
            return this._languageVersion;
        }

        public allowAutomaticSemicolonInsertion(): boolean {
            return this._allowAutomaticSemicolonInsertion;
        }
    }
}