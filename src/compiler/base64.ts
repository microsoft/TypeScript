//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module TypeScript {
    class Base64Format {
        static encodedValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        static encode(inValue: number) {
            if (inValue < 64) {
                return Base64Format.encodedValues.charAt(inValue);
            }
            throw TypeError(inValue + ": not a 64 based value");
        }

        static decodeChar(inChar: string) {
            if (inChar.length === 1) {
                return Base64Format.encodedValues.indexOf(inChar);
            }
            else {
                throw TypeError('"' + inChar + '" must have length 1');
            }
        }
    }

    export class Base64VLQFormat {
        static encode(inValue: number) {
            // Add a new least significant bit that has the sign of the value.
            // if negative number the least significant bit that gets added to the number has value 1
            // else least significant bit value that gets added is 0
            // eg. -1 changes to binary : 01 [1] => 3
            //     +1 changes to binary : 01 [0] => 2
            if (inValue < 0) {
                inValue = ((-inValue) << 1) + 1;
            }
            else {
                inValue = inValue << 1;
            }

            // Encode 5 bits at a time starting from least significant bits
            var encodedStr = "";
            do {
                var currentDigit = inValue & 31; // 11111
                inValue = inValue >> 5;
                if (inValue > 0) {
                    // There are still more digits to decode, set the msb (6th bit)
                    currentDigit = currentDigit | 32; 
                }
                encodedStr = encodedStr + Base64Format.encode(currentDigit);
            } while (inValue > 0);

            return encodedStr;
        }

        static decode(inString: string) {
            var result = 0;
            var negative = false;

            var shift = 0;
            for (var i = 0; i < inString.length; i++) {
                var byte = Base64Format.decodeChar(inString[i]);
                if (i === 0) {
                    // Sign bit appears in the LSBit of the first value
                    if ((byte & 1) === 1) {
                        negative = true;
                    }
                    result = (byte >> 1) & 15; // 1111x
                }
                else {
                    result = result | ((byte & 31) << shift); // 11111
                }

                shift += (i === 0) ? 4 : 5;

                if ((byte & 32) === 32) {
                    // Continue
                }
                else {
                    return { value: negative ? -(result) : result, rest: inString.substr(i + 1) };
                }
            }

            throw new Error(getDiagnosticMessage(DiagnosticCode.Base64_value_0_finished_with_a_continuation_bit, [inString]));
        }
    }
}
