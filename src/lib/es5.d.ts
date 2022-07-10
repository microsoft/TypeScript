/// <reference lib="es2009.array" />
/// <reference lib="es2009.arraybuffer" />
/// <reference lib="es2009.boolean" />
/// <reference lib="es2009.core" />
/// <reference lib="es2009.dataview" />
/// <reference lib="es2009.date" />
/// <reference lib="es2009.error" />
/// <reference lib="es2009.evalerror" />
/// <reference lib="es2009.float32array" />
/// <reference lib="es2009.float64array" />
/// <reference lib="es2009.function" />
/// <reference lib="es2009.int16array" />
/// <reference lib="es2009.int32array" />
/// <reference lib="es2009.int8array" />
/// <reference lib="es2009.intl" />
/// <reference lib="es2009.json" />
/// <reference lib="es2009.math" />
/// <reference lib="es2009.number" />
/// <reference lib="es2009.object" />
/// <reference lib="es2009.promise" />
/// <reference lib="es2009.rangeerror" />
/// <reference lib="es2009.referenceerror" />
/// <reference lib="es2009.regexp" />
/// <reference lib="es2009.string" />
/// <reference lib="es2009.symbol" />
/// <reference lib="es2009.syntaxerror" />
/// <reference lib="es2009.typeerror" />
/// <reference lib="es2009.uint16array" />
/// <reference lib="es2009.uint32array" />
/// <reference lib="es2009.uint8array" />
/// <reference lib="es2009.uint8clampedarray" />
/// <reference lib="es2009.urierror" />
/// <reference lib="utils.import" />
/// <reference lib="utils.modifiers" />

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
