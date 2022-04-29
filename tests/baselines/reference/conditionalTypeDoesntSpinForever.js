//// [conditionalTypeDoesntSpinForever.ts]
// A *self-contained* demonstration of the problem follows...
// Test this by running `tsc --target es6` on the command-line, rather than through another build tool such as Gulp, Webpack, etc.

export enum PubSubRecordIsStoredInRedisAsA {
    redisHash = "redisHash",
    jsonEncodedRedisString = "jsonEncodedRedisString"
  }
  
  export interface PubSubRecord<NAME extends string, RECORD, IDENTIFIER extends Partial<RECORD>> {
    name: NAME;
    record: RECORD;
    identifier: IDENTIFIER;
    storedAs: PubSubRecordIsStoredInRedisAsA;
    maxMsToWaitBeforePublishing: number;
  }
  
  type NameFieldConstructor<SO_FAR> =
    SO_FAR extends {name: any} ? {} : {
      name: <TYPE>(t?: TYPE) => BuildPubSubRecordType<SO_FAR & {name: TYPE}>
    }
  
  const buildNameFieldConstructor = <SO_FAR>(soFar: SO_FAR) => (
    "name" in soFar ? {} : {
      name: <TYPE>(instance: TYPE = undefined) =>
        buildPubSubRecordType(Object.assign({}, soFar, {name: instance as TYPE}) as SO_FAR & {name: TYPE}) as BuildPubSubRecordType<SO_FAR & {name: TYPE}>
    }
  );
  
  type StoredAsConstructor<SO_FAR> =
    SO_FAR extends {storedAs: any} ? {} : {
      storedAsJsonEncodedRedisString: () => BuildPubSubRecordType<SO_FAR & {storedAs: PubSubRecordIsStoredInRedisAsA.jsonEncodedRedisString}>;
      storedRedisHash: () => BuildPubSubRecordType<SO_FAR & {storedAs: PubSubRecordIsStoredInRedisAsA.redisHash}>;
    }
  
  const buildStoredAsConstructor = <SO_FAR>(soFar: SO_FAR) => (
    "storedAs" in soFar ? {} : {
      storedAsJsonEncodedRedisString: () =>
        buildPubSubRecordType(Object.assign({}, soFar, {storedAs: PubSubRecordIsStoredInRedisAsA.jsonEncodedRedisString})) as
          BuildPubSubRecordType<SO_FAR & {storedAs: PubSubRecordIsStoredInRedisAsA.jsonEncodedRedisString}>,
      storedAsRedisHash: () =>
        buildPubSubRecordType(Object.assign({}, soFar, {storedAs: PubSubRecordIsStoredInRedisAsA.redisHash})) as
          BuildPubSubRecordType<SO_FAR & {storedAs: PubSubRecordIsStoredInRedisAsA.redisHash}>,
    }
  );
  
  type IdentifierFieldConstructor<SO_FAR> =
    SO_FAR extends {identifier: any} ? {} :
    SO_FAR extends {record: any} ? {
      identifier: <TYPE extends Partial<SO_FAR["record"]>>(t?: TYPE) => BuildPubSubRecordType<SO_FAR & {identifier: TYPE}>
    } : {}
  
  const buildIdentifierFieldConstructor = <SO_FAR>(soFar: SO_FAR) => (
    "identifier" in soFar || (!("record" in soFar)) ? {} : {
      identifier: <TYPE>(instance: TYPE = undefined) =>
        buildPubSubRecordType(Object.assign({}, soFar, {identifier: instance as TYPE}) as SO_FAR & {identifier: TYPE}) as BuildPubSubRecordType<SO_FAR & {identifier: TYPE}>
    }
  );
  
  type RecordFieldConstructor<SO_FAR> =
    SO_FAR extends {record: any} ? {} : {
      record: <TYPE>(t?: TYPE) => BuildPubSubRecordType<SO_FAR & {record: TYPE}>
    }
  
  const buildRecordFieldConstructor = <SO_FAR>(soFar: SO_FAR) => (
    "record" in soFar ? {} : {
      record: <TYPE>(instance: TYPE = undefined) =>
        buildPubSubRecordType(Object.assign({}, soFar, {record: instance as TYPE}) as SO_FAR & {record: TYPE}) as BuildPubSubRecordType<SO_FAR & {record: TYPE}>
    }
  );
  
  type MaxMsToWaitBeforePublishingFieldConstructor<SO_FAR> =
    SO_FAR extends {maxMsToWaitBeforePublishing: any} ? {} : {
      maxMsToWaitBeforePublishing: (t: number) => BuildPubSubRecordType<SO_FAR & {maxMsToWaitBeforePublishing: number}>,
      neverDelayPublishing: () => BuildPubSubRecordType<SO_FAR & {maxMsToWaitBeforePublishing: 0}>,
    }
  
  const buildMaxMsToWaitBeforePublishingFieldConstructor = <SO_FAR>(soFar: SO_FAR): MaxMsToWaitBeforePublishingFieldConstructor<SO_FAR> => (
    "maxMsToWaitBeforePublishing" in soFar ? {} : {
      maxMsToWaitBeforePublishing: (instance: number = 0) =>
        buildPubSubRecordType(Object.assign({}, soFar, {maxMsToWaitBeforePublishing: instance})) as BuildPubSubRecordType<SO_FAR & {maxMsToWaitBeforePublishing: number}>,
      neverDelayPublishing: () =>
        buildPubSubRecordType(Object.assign({}, soFar, {maxMsToWaitBeforePublishing: 0})) as BuildPubSubRecordType<SO_FAR & {maxMsToWaitBeforePublishing: 0}>,
    }
  ) as MaxMsToWaitBeforePublishingFieldConstructor<SO_FAR>;
  
  type TypeConstructor<SO_FAR> =
    SO_FAR extends {identifier: any, record: any, maxMsToWaitBeforePublishing: number, storedAs: PubSubRecordIsStoredInRedisAsA} ? {
      type: SO_FAR,
      fields: Set<keyof SO_FAR>,
      hasField: (fieldName: string | number | symbol) => fieldName is keyof SO_FAR
    } : {}
  
  const buildType = <SO_FAR>(soFar: SO_FAR) => (
    "identifier" in soFar && "object" in soFar && "maxMsToWaitBeforePublishing" in soFar && "PubSubRecordIsStoredInRedisAsA" in soFar ? {} : {
      type: soFar,
      fields: () => new Set(Object.keys(soFar) as (keyof SO_FAR)[]),
      hasField: (fieldName: string | number | symbol) => fieldName in soFar
    }
  );
  
  type BuildPubSubRecordType<SO_FAR> =
    NameFieldConstructor<SO_FAR> &
    IdentifierFieldConstructor<SO_FAR> &
    RecordFieldConstructor<SO_FAR> &
    StoredAsConstructor<SO_FAR> & // infinite loop goes away when you comment out this line
    MaxMsToWaitBeforePublishingFieldConstructor<SO_FAR> &
    TypeConstructor<SO_FAR>
  
  const buildPubSubRecordType = <SO_FAR>(soFar: SO_FAR) => Object.assign(
    {},
    buildNameFieldConstructor(soFar),
    buildIdentifierFieldConstructor(soFar),
    buildRecordFieldConstructor(soFar),
    buildStoredAsConstructor(soFar),
    buildMaxMsToWaitBeforePublishingFieldConstructor(soFar),
    buildType(soFar)
  ) as BuildPubSubRecordType<SO_FAR>;
  const PubSubRecordType = buildPubSubRecordType({});

//// [conditionalTypeDoesntSpinForever.js]
// A *self-contained* demonstration of the problem follows...
// Test this by running `tsc --target es6` on the command-line, rather than through another build tool such as Gulp, Webpack, etc.
export var PubSubRecordIsStoredInRedisAsA;
(function (PubSubRecordIsStoredInRedisAsA) {
    PubSubRecordIsStoredInRedisAsA["redisHash"] = "redisHash";
    PubSubRecordIsStoredInRedisAsA["jsonEncodedRedisString"] = "jsonEncodedRedisString";
})(PubSubRecordIsStoredInRedisAsA || (PubSubRecordIsStoredInRedisAsA = {}));
const buildNameFieldConstructor = (soFar) => ("name" in soFar ? {} : {
    name: (instance = undefined) => buildPubSubRecordType(Object.assign({}, soFar, { name: instance }))
});
const buildStoredAsConstructor = (soFar) => ("storedAs" in soFar ? {} : {
    storedAsJsonEncodedRedisString: () => buildPubSubRecordType(Object.assign({}, soFar, { storedAs: PubSubRecordIsStoredInRedisAsA.jsonEncodedRedisString })),
    storedAsRedisHash: () => buildPubSubRecordType(Object.assign({}, soFar, { storedAs: PubSubRecordIsStoredInRedisAsA.redisHash })),
});
const buildIdentifierFieldConstructor = (soFar) => ("identifier" in soFar || (!("record" in soFar)) ? {} : {
    identifier: (instance = undefined) => buildPubSubRecordType(Object.assign({}, soFar, { identifier: instance }))
});
const buildRecordFieldConstructor = (soFar) => ("record" in soFar ? {} : {
    record: (instance = undefined) => buildPubSubRecordType(Object.assign({}, soFar, { record: instance }))
});
const buildMaxMsToWaitBeforePublishingFieldConstructor = (soFar) => ("maxMsToWaitBeforePublishing" in soFar ? {} : {
    maxMsToWaitBeforePublishing: (instance = 0) => buildPubSubRecordType(Object.assign({}, soFar, { maxMsToWaitBeforePublishing: instance })),
    neverDelayPublishing: () => buildPubSubRecordType(Object.assign({}, soFar, { maxMsToWaitBeforePublishing: 0 })),
});
const buildType = (soFar) => ("identifier" in soFar && "object" in soFar && "maxMsToWaitBeforePublishing" in soFar && "PubSubRecordIsStoredInRedisAsA" in soFar ? {} : {
    type: soFar,
    fields: () => new Set(Object.keys(soFar)),
    hasField: (fieldName) => fieldName in soFar
});
const buildPubSubRecordType = (soFar) => Object.assign({}, buildNameFieldConstructor(soFar), buildIdentifierFieldConstructor(soFar), buildRecordFieldConstructor(soFar), buildStoredAsConstructor(soFar), buildMaxMsToWaitBeforePublishingFieldConstructor(soFar), buildType(soFar));
const PubSubRecordType = buildPubSubRecordType({});
