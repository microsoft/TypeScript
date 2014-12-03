//// [parserSyntaxWalker.generated.ts]
//declare module "fs" {
//    export class File {
//        constructor(filename: string);
//        public ReadAllText(): string;
//    }
//    export interface IFile {
//        [index: number]: string;
//    }
//}

//import fs = module("fs");


//module TypeScriptAllInOne {
//    export class Program {
//        static Main(...args: string[]) {
//            try {
//                var bfs = new BasicFeatures();
//                var retValue: number = 0;

//                retValue = bfs.VARIABLES();
//                if (retValue != 0) {

//                    return 1;
//                }

//                retValue = bfs.STATEMENTS(4);
//                if (retValue != 0) {

//                    return 1;
//                }


//                retValue = bfs.TYPES();
//                if (retValue != 0) {

//                    return 1;
//                }

//                retValue = bfs.OPERATOR();
//                if (retValue != 0) {

//                    return 1;
//                }
//            }
//            catch (e) {
//                console.log(e);
//            }
//            finally {

//            }

//            console.log('Done');

//            return 0;

//        }
//    }

//    class BasicFeatures {
//        /// <summary>
//        /// Test various of variables. Including nullable,key world as variable,special format
//        /// </summary>
//        /// <returns></returns>
//        public VARIABLES(): number {
//            var local = Number.MAX_VALUE;
//            var min = Number.MIN_VALUE;
//            var inf = Number.NEGATIVE_INFINITY;
//            var nan = Number.NaN;
//            var undef = undefined;

//            var п = local;
//            var м = local;

//            var local5 = <fs.File>null;
//            var local6 = local5 instanceof fs.File;

//            var hex = 0xBADC0DE, Hex = 0XDEADBEEF;
//            var float = 6.02e23, float2 = 6.02E-23
//            var char = 'c', \u0066 = '\u0066', hexchar = '\x42';
//            var quoted = '"', quoted2 = "'";
//            var reg = /\w*/;
//            var objLit = { "var": number = 42, equals: function (x) { return x["var"] === 42; }, toString: () => 'objLit{42}' };
//            var weekday = Weekdays.Monday;

//            var con = char + f + hexchar + float.toString() + float2.toString() + reg.toString() + objLit + weekday;

//            //
//            var any = 0;
//            var boolean = 0;
//            var declare = 0;
//            var constructor = 0;
//            var get = 0;
//            var implements = 0;
//            var interface = 0;
//            var let = 0;
//            var module = 0;
//            var number = 0;
//            var package = 0;
//            var private = 0;
//            var protected = 0;
//            var public = 0;
//            var set = 0;
//            var static = 0;
//            var string = 0;
//            var yield = 0;

//            var sum3 = any + boolean + declare + constructor + get + implements + interface + let + module + number + package + private + protected + public + set + static + string + yield;

//            return 0;
//        }

//        /// <summary>
//        /// Test different statements. Including if-else,swith,foreach,(un)checked,lock,using,try-catch-finally
//        /// </summary>
//        /// <param name="i"></param>
//        /// <returns></returns>
//        STATEMENTS(i: number): number {
//            var retVal = 0;
//            if (i == 1)
//                retVal = 1;
//            else
//                retVal = 0;
//            switch (i) {
//                case 2:
//                    retVal = 1;
//                    break;
//                case 3:
//                    retVal = 1;
//                    break;
//                default:
//                    break;
//            }

//            for (var x in { x: 0, y: 1 }) {
//            }

//            try {
//                throw null;
//            }
//            catch (Exception) {
//            }
//            finally {
//                try { }
//                catch (Exception) { }
//            }

//            return retVal;
//        }

//        /// <summary>
//        /// Test types in ts language. Including class,struct,interface,delegate,anonymous type
//        /// </summary>
//        /// <returns></returns>
//        public TYPES(): number {
//            var retVal = 0;
//            var c = new CLASS();
//            var xx: IF = c;
//            retVal += c.Property;
//            retVal += c.Member();
//            retVal += xx ^= Foo() ? 0 : 1;

//            //anonymous type
//            var anony = { a: new CLASS() };

//            retVal += anony.a.d();

//            return retVal;
//        }


//        ///// <summary>
//        ///// Test different operators
//        ///// </summary>
//        ///// <returns></returns>
//        public OPERATOR(): number {
//            var a: number[] = [1, 2, 3, 4,  implements , ];/*[] bug*/ // YES []
//            var i = a[1];/*[]*/
//            i = i + i - i * i / i % i & i | i ^ i;/*+ - * / % & | ^*/
//            var b = true && false || true ^ false;/*& | ^*/
//            b = !b;/*!*/
//            i = ~i;/*~i*/
//            b = i < (i -  continue ) && (i + 1) > i;/*< && >*/
//            var f = true ? 1 : 0;/*? :*/   // YES :
//            i++;/*++*/
//            i--;/*--*/
//            b = true && false || true;/*&& ||*/
//            i = i << 5;/*<<*/
//            i = i >> 5;/*>>*/
//            var j = i;
//            b = i == j && i != j && i <= j && i >= j;/*= == && != <= >=*/
//            i += <number>5.0;/*+=*/
//            i -= i;/*-=*/
//            i *= i;/**=*/
//            if (i == 0)
//                i++;
//            i /= i;/*/=*/
//            i %= i;/*%=*/
//            i &= i;/*&=*/
//            i |= i;/*|=*/
//            i ^= i;/*^=*/
//            i <<= i;/*<<=*/
//            i >>= i;/*>>=*/

//            if (i == 0 && !b && f == 1)
//                return 0;
//            else return 1;
//        }

//    }

//    interface IF {
//        Foo <!-- ): boolean;
//    }

//    class CLASS implements IF {

//        public d = () =>  '  return 0; };
//        public get Property() { return 0; }
//        public Member() {
//            return 0;
//        }
//        public Foo(): boolean {
//            var myEvent = () => { return 1; };
//            if (myEvent() == 1)
//                return true;
//            else
//                return false;
//        }
//    }


//    // todo: use these
//    class A {
//        public method1(val:number) {
//            return val;
//        }
//        public method2() {
//            return 2 * this.method1(2);
//        }
//    }

//    class B extends A {

//        public method2() {
//            return this.method1(2);
//        }
//    }

//    class Overloading {

//        private otherValue = 42;

//        constructor(private value: number, public name: string) { }
       
//        public Overloads(value: string);
//        public Overloads(value: string, ...rest: string[]) { }

//        public DefaultValue(value?: string = "Hello") { }
//    }
//}

//enum Weekdays {
//    Monday,
//    Tuesday,
//    Weekend,
//}

//enum Fruit {
//    Apple,
//    Pear
//}

//interface IDisposable {
//    Dispose(): void;
//}

//TypeScriptAllInOne.Program.Main();


//// [parserSyntaxWalker.generated.js]
//declare module "fs" {
//    export class File {
//        constructor(filename: string);
//        public ReadAllText(): string;
//    }
//    export interface IFile {
//        [index: number]: string;
//    }
//}
//import fs = module("fs");
//module TypeScriptAllInOne {
//    export class Program {
//        static Main(...args: string[]) {
//            try {
//                var bfs = new BasicFeatures();
//                var retValue: number = 0;
//                retValue = bfs.VARIABLES();
//                if (retValue != 0) {
//                    return 1;
//                }
//                retValue = bfs.STATEMENTS(4);
//                if (retValue != 0) {
//                    return 1;
//                }
//                retValue = bfs.TYPES();
//                if (retValue != 0) {
//                    return 1;
//                }
//                retValue = bfs.OPERATOR();
//                if (retValue != 0) {
//                    return 1;
//                }
//            }
//            catch (e) {
//                console.log(e);
//            }
//            finally {
//            }
//            console.log('Done');
//            return 0;
//        }
//    }
//    class BasicFeatures {
//        /// <summary>
//        /// Test various of variables. Including nullable,key world as variable,special format
//        /// </summary>
//        /// <returns></returns>
//        public VARIABLES(): number {
//            var local = Number.MAX_VALUE;
//            var min = Number.MIN_VALUE;
//            var inf = Number.NEGATIVE_INFINITY;
//            var nan = Number.NaN;
//            var undef = undefined;
//            var п = local;
//            var м = local;
//            var local5 = <fs.File>null;
//            var local6 = local5 instanceof fs.File;
//            var hex = 0xBADC0DE, Hex = 0XDEADBEEF;
//            var float = 6.02e23, float2 = 6.02E-23
//            var char = 'c', \u0066 = '\u0066', hexchar = '\x42';
//            var quoted = '"', quoted2 = "'";
//            var reg = /\w*/;
//            var objLit = { "var": number = 42, equals: function (x) { return x["var"] === 42; }, toString: () => 'objLit{42}' };
//            var weekday = Weekdays.Monday;
//            var con = char + f + hexchar + float.toString() + float2.toString() + reg.toString() + objLit + weekday;
//            //
//            var any = 0;
//            var boolean = 0;
//            var declare = 0;
//            var constructor = 0;
//            var get = 0;
//            var implements = 0;
//            var interface = 0;
//            var let = 0;
//            var module = 0;
//            var number = 0;
//            var package = 0;
//            var private = 0;
//            var protected = 0;
//            var public = 0;
//            var set = 0;
//            var static = 0;
//            var string = 0;
//            var yield = 0;
//            var sum3 = any + boolean + declare + constructor + get + implements + interface + let + module + number + package + private + protected + public + set + static + string + yield;
//            return 0;
//        }
//        /// <summary>
//        /// Test different statements. Including if-else,swith,foreach,(un)checked,lock,using,try-catch-finally
//        /// </summary>
//        /// <param name="i"></param>
//        /// <returns></returns>
//        STATEMENTS(i: number): number {
//            var retVal = 0;
//            if (i == 1)
//                retVal = 1;
//            else
//                retVal = 0;
//            switch (i) {
//                case 2:
//                    retVal = 1;
//                    break;
//                case 3:
//                    retVal = 1;
//                    break;
//                default:
//                    break;
//            }
//            for (var x in { x: 0, y: 1 }) {
//            }
//            try {
//                throw null;
//            }
//            catch (Exception) {
//            }
//            finally {
//                try { }
//                catch (Exception) { }
//            }
//            return retVal;
//        }
//        /// <summary>
//        /// Test types in ts language. Including class,struct,interface,delegate,anonymous type
//        /// </summary>
//        /// <returns></returns>
//        public TYPES(): number {
//            var retVal = 0;
//            var c = new CLASS();
//            var xx: IF = c;
//            retVal += c.Property;
//            retVal += c.Member();
//            retVal += xx ^= Foo() ? 0 : 1;
//            //anonymous type
//            var anony = { a: new CLASS() };
//            retVal += anony.a.d();
//            return retVal;
//        }
//        ///// <summary>
//        ///// Test different operators
//        ///// </summary>
//        ///// <returns></returns>
//        public OPERATOR(): number {
//            var a: number[] = [1, 2, 3, 4,  implements , ];/*[] bug*/ // YES []
//            var i = a[1];/*[]*/
//            i = i + i - i * i / i % i & i | i ^ i;/*+ - * / % & | ^*/
//            var b = true && false || true ^ false;/*& | ^*/
//            b = !b;/*!*/
//            i = ~i;/*~i*/
//            b = i < (i -  continue ) && (i + 1) > i;/*< && >*/
//            var f = true ? 1 : 0;/*? :*/   // YES :
//            i++;/*++*/
//            i--;/*--*/
//            b = true && false || true;/*&& ||*/
//            i = i << 5;/*<<*/
//            i = i >> 5;/*>>*/
//            var j = i;
//            b = i == j && i != j && i <= j && i >= j;/*= == && != <= >=*/
//            i += <number>5.0;/*+=*/
//            i -= i;/*-=*/
//            i *= i;/**=*/
//            if (i == 0)
//                i++;
//            i /= i;/*/=*/
//            i %= i;/*%=*/
//            i &= i;/*&=*/
//            i |= i;/*|=*/
//            i ^= i;/*^=*/
//            i <<= i;/*<<=*/
//            i >>= i;/*>>=*/
//            if (i == 0 && !b && f == 1)
//                return 0;
//            else return 1;
//        }
//    }
//    interface IF {
//        Foo <!-- ): boolean;
//    }
//    class CLASS implements IF {
//        public d = () =>  '  return 0; };
//        public get Property() { return 0; }
//        public Member() {
//            return 0;
//        }
//        public Foo(): boolean {
//            var myEvent = () => { return 1; };
//            if (myEvent() == 1)
//                return true;
//            else
//                return false;
//        }
//    }
//    // todo: use these
//    class A {
//        public method1(val:number) {
//            return val;
//        }
//        public method2() {
//            return 2 * this.method1(2);
//        }
//    }
//    class B extends A {
//        public method2() {
//            return this.method1(2);
//        }
//    }
//    class Overloading {
//        private otherValue = 42;
//        constructor(private value: number, public name: string) { }
//        public Overloads(value: string);
//        public Overloads(value: string, ...rest: string[]) { }
//        public DefaultValue(value?: string = "Hello") { }
//    }
//}
//enum Weekdays {
//    Monday,
//    Tuesday,
//    Weekend,
//}
//enum Fruit {
//    Apple,
//    Pear
//}
//interface IDisposable {
//    Dispose(): void;
//}
//TypeScriptAllInOne.Program.Main();
