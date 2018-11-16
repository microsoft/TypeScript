/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


declare namespace Intl {
    interface PluralRulesOptions {
        localeMatcher?: 'lookup' | 'best fit';
        type?: 'cardinal' | 'ordinal';
    }

    interface ResolvedPluralRulesOptions {
        locale: string;
        pluralCategories: string[];
        type: 'cardinal' | 'ordinal';
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits: number;
        maximumSignificantDigits: number;
    }

    interface PluralRules {
        resolvedOptions(): ResolvedPluralRulesOptions;
        select(n: number): string;
    }

    const PluralRules: {
        new (locales?: string | string[], options?: PluralRulesOptions): PluralRules;
        (locales?: string | string[], options?: PluralRulesOptions): PluralRules;
        supportedLocalesOf(
            locales: string | string[],
            options?: PluralRulesOptions,
        ): string[];
    };
}
