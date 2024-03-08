//// [tests/cases/compiler/usedImportNotElidedInJs.ts] ////

//// [test.js]
import * as moment from 'moment';
import rollupMoment__default from 'moment';
export const moment = rollupMoment__default || moment;


//// [test.js]
import * as moment from 'moment';
import rollupMoment__default from 'moment';
export const moment = rollupMoment__default || moment;
