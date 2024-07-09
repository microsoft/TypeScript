/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: index.js
////// Data table
/////**
////    @typedef DataTableThing
////    @type {Object}
////    @property {function(TagCollection, Location, string, string, Infotable):void} AddDataTableEntries - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) Add multiple data table entries.
////    @property {function(TagCollection, Location, string, string, Infotable):string} AddDataTableEntry - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) Add a new data table entry.
////    @property {function(TagCollection, Location, string, string, Infotable):void} AddOrUpdateDataTableEntries - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) Add or update multiple data table entries.
////    @property {function(TagCollection, Location, string, string, Infotable):string} AddOrUpdateDataTableEntry - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values)  Add a new data table entry, or if it exists, update an existing entry.
////    @property {function(TagCollection, Location, string, string, Infotable):void} AssignDataTableEntries - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) Replaces existing data table entries.
////    @property {function():Infotable} CreateValues - Create an empty info table of the correct datashape for this data table.
////    @property {function(*):Infotable} CreateValuesWithData - (arg0: values as JSONObject) Create an info table of the correct datashape for this stream and include data values.
////    @property {function(Infotable):void} DeleteDataTableEntries - (arg0: values as Infotable) Delete all table entries that match the provided values.
////    @property {function(TagCollection, Location, string, string, Infotable, *):void} DeleteDataTableEntriesWithQuery - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values, arg5: query as JSONObject) Delete multiple data table entries based on a query.
////    @property {function(Infotable):void} DeleteDataTableEntry - (arg0: values as Infotable) Delete an existing data table entry
////    @property {function(string):void} DeleteDataTableEntryByKey - (arg0: key) Delete an existing data table entry using its key value.
////    @property {function(Infotable):Infotable} FindDataTableEntries - (arg0: values as Infotable) Retrieve all table entries that match the provided values.
////    @property {function():DataShapeDefinition} getDataShape
////    @property {function():string} GetDataShape - Get the currently assigned data shape.
////    @property {function():string} getDataShapeName
////    @property {function(number):Infotable} GetDataTableEntries - (arg0: maxItems) Retrieve all table entries up to max items number.
////    @property {function(Infotable):Infotable} GetDataTableEntry - (arg0: values as Infotable) Get an existing data table entry.
////    @property {function(string):Infotable} GetDataTableEntryByKey - (arg0: key) Get an existing data table entry using its key value.
////    @property {function():number} GetDataTableEntryCount - Get an count of data table entries.
////    @property {function():ThingworxRelationshipTypes} getDataType
////    @property {function():EntityReferenceTypeMap} getDependencies
////    @property {function():IDataEntryCloseableIterator} getEntryIterator - Returns an iterator over all entries inside this data table thing.
////    @property {function():Infotable} GetFieldNames - Retrieve a list of field names for the data shape associated with this stream.
////    @property {function(string):Infotable} GetFieldNamesByType - (arg0: key) Retrieve a list of field names for the data shape associated with this stream, of a specific type.
////    @property {function():string} getItemCollectionName
////    @property {function():string} getItemEntityName
////    @property {function():ThingworxRelationshipTypes} getItemEntityType
////    @property {function():void} initializeEntity
////    @property {function():void} initializeThing
////    @property {function():boolean}	isStoredAsEncrypted
////    @property {function():void} PurgeDataTableEntries - Remove all data table entries.
////    @property {function(Infotable, number, TagCollection, string, *):Infotable} QueryDataTableEntries - (arg0: values, arg1: maxItems, arg2: tags, arg3: source, arg4: query as JSONObject) Retrieve all table entries that match the query parameters.
////    @property {function():void} Reindex - Reindex the custom indexes on the data table.
////    @property {function(number, string, TagCollection, *, string):Infotable} SearchDataTableEntries - (arg0: maxItems, arg1: searchExpression, arg2: tags, arg3: query as JSONObject, arg4: source)  Retrieve all table entries that match the search query parameters.
////    @property {function(string):void} SetDataShape - (arg0: name) Sets the data shape.
////    @property {function(TagCollection, Location, string, string, Infotable):void} UpdateDataTableEntries - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) Update multiple data table entries.
////    @property {function(TagCollection, Location, string, string, Infotable, *, Infotable):void} UpdateDataTableEntriesWithQuery - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values, arg5: query as JSONObject, arg6: updatValues) Add or update multiple data table entries based on a query.
////    @property {function(TagCollection, Location, string, string, Infotable):void} UpdateDataTableEntry - (arg0: tags, arg1: location, arg2: source, arg3: sourceType, arg4: values) update an existing data table entry.
////    @property {function(ImportedEntityCollection):void} validateConfiguration - (arg0: importedEntityCollections)
////*/
////
/////**
////    @typedef Infotable
////    @type {object}
////    @property {boolean} isCompressed
////    @property {DataShape} dataShape
////    @property {function(FieldDefinition):int} addField - Adds a field to the DataShapeDefinition of this InfoTable, given a FieldDefinition
////    @property {function(*):void} AddField - *FROM SNIPPET* adds a new field definition to the datashape (arg0 is an object that should match with datashape)
////    @property {function(object):void} AddRow - *FROM SNIPPET* adds a row to the infotable (arg0 is an object that should match with datashape)
////    @property {function(ValueCollection):int} addRow - Adds a row to this InfoTable's ValueCollectionList given a ValueCollection
////    @property {ValueCollectionList} rows - returns the ValueCollectionList of the rows in this InfoTable
////    @property {function(Infotable, boolean):int} addRowsFrom - Adds the rows from an InfoTable to this InfoTable given: the InfoTable to be copied from and a Boolean indicating whether the copied values should be references or cloned values. (arg 0: infotable, arg1: clone)
////    @property {function():Infotable} clone
////    @property {function():Infotable} cloneStructure
////    @property {function():ValueCollection} currentRow - Returns the current row in this InfoTable as a ValueCollection
////    @property {function(object):void} Delete - *FROM SNIPPET* delete rows by value filter (arg0 is an object that should match with datashape)
////    @property {function(IFilter):int} delete
////    @property {function(ValueCollection):int} delete - Creates an AndFilterCollection based on the given ValueCollection and deletes all rows falling within the parameters of that filter
////    @property {function(IFilter):Infotable} deleteRowsToNewTable
////    @property {function(object):void} Filter - *FROM SNIPPET* filters the infotable (arg0 is an object that should match with datashape)
////    @property {function(ValueCollection):void} filter - Creates an AndFilterCollection based on the given ValueCollection and applies it to this InfoTable
////    @property {function(IFilter):void} filterRows
////    @property {function(IFilter):Infotable} filterRowsToNewTable
////    @property {function(*):Infotable} FilterToNewTable - Finds rows in this InfoTable with values that match the values given as a JSONObject and returns them as a new InfoTable
////    @property {function(object):void} Find - *FROM SNIPPET* retrieve rows by value filter (arg0 is an object that should match with datashape)
////    @property {function(IFilter):ValueCollection} find - Finds and returns a row from this InfoTable that falls within the parameters of the given IFilter
////    @property {function(ValueCollection):ValueCollection} find - Finds and returns a row from this InfoTable that matches the values of all fields given as a (ValueCollection)
////    @property {function(ValueCollection, string[]):ValueCollection} find - Finds and returns a row in this InfoTable given the fields to search as a String Array and the values to match as a ( ValueCollection)
////    @property {function(ValueCollection):int} findIndex - Finds and returns the index of a row from this InfoTable that matches the values of all fields given as a ( ValueCollection)
////    @property {function(*):Infotable} fromJSON
////    @property {function():DataShapeDefinition} getDataShape - Returns the DataShapeDefinition for this InfoTable
////    @property {function(string):FieldDefinition} getField - Returns a FieldDefinition from this InfoTable's DataShapeDefinition, given the name of the field as a String
////    @property {function():int} getFieldCount - Returns the number of fields in this InfoTable's DataShape as an int
////    @property {function():ValueCollection} getFirstRow - Returns the first row (ValueCollection) of this InfoTable
////    @property {function():InfoTableRowIndex} getIndex -
////    @property {function():ValueCollection} getLastRow - Returns the last row in this InfoTable as a ValueCollection
////    @property {function():number} getLength - Returns the number of rows in this InfoTable as an Integer
////    @property {function():DataShapeDefinition} getPublicDataShape - Returns a DataShapeDefinition for this InfoTable containing only the public fields
////    @property {function():*} getReturnValue - Returns the first value of the first field in the first row of this InfoTable
////    @property {function(number):ValueCollection} getRow - *FROM SNIPPET* retrieves a row by index
////    @property {function():number} getRowCount - *FROM SNIPPET* gets the count of rows
////    @property {function():ValueCollectionList} getRows - Returns a ValueCollectionList of the rows in this InfoTable
////    @property {function(string):IPrimitiveType} getRowValue - Returns a value as an IPrimitiveType from the first row of this InfoTable, given a field name as a String
////    @property {function(string):boolean} hasField - Verifies a field exists in this InfoTable's DataShape given the field name as a String
////    @property {function(string[],boolean):void} indexOn
////    @property {function(string, boolean):void} indexOn
////    @property {function():boolean} isEmpty - Returns a boolean indicating whether this InfoTable has a size of zero
////    @property {function(BaseTypes):boolean} isType
////    @property {function():void} moveToFirst - Moves to the first row of this InfoTable.
////    @property {function():ValueCollection} nextRow - Returns the row after the current row in this InfoTable as a ValueCollection
////    @property {function(string):void} quickSort - (arg0: fieldName)
////    @property {function(string, boolean):void} quickSort - (arg0: fieldName, arg1: isAscending)
////    @property {function():void} RemoveAllRows - *FROM SNIPPET* remove all rows from infotable
////    @property {function():void} removeAllRows - remove all rows from infotable
////    @property {function(string):void} RemoveField - *FROM SNIPPET* remove a datashape field by name
////    @property {function(number):void} RemoveRow - *FROM SNIPPET* removes a row by index
////    @property {function(number):void} removeRow - Removes a ValueCollection from the InfoTable given the row as an int
////    @property {function(DataShapeDefinition):void} setDataShape - Sets DataShapeDefinition for this InfoTable
////    @property {function():void} setRow - Sets a single row in this InfoTable given a ValueCollection as a row and the index of the row to be replaced
////    @property {function(ValueCollectionList):void} setRows - Sets the rows in this InfoTable given a ValueCollectionList
////    @property {function(Sort):void} Sort - *FROM SNIPPET* sorts the table
////    @property {function(ISort):void} sortRows
////    @property {function():Infotable} sortRowsToNewTable
////    @property {function():*} toJSON
////    @property {function():JsonInfotable} ToJSON - *FROM SNIPPET* returns the table as JsonInfotable
////    @property {function(number):void} topN - (arg0: maxItems)
////    @property {function(number):Infotable} topNToNewTable - (arg0: maxItems)
////    @property {function(IFIlter, ValueCollection):Infotable} updateRowsToNewTable - (arg0: filters, arg1: values)
////*/
////
/////**
////    @typedef DataShapeDefinition
////    @type {object}
////    @property {function(FieldDefinition):void} addFieldDefinition - Adds a new field definition to this data shape definition.
////    @property {function():DataShapeDefinition} clone - Creates a deep clone of this data shape definition
////    @property {function():FieldDefinition} getFieldDefinition - Returns the field definition with the specified name.
////    @property {function():FieldDefinitionCollection} getFields - Returns the collection of field definitions belonging to this data shape definition.
////    @property {function():boolean} hasField - Tests if the field named exists in this definition.
////    @property {function():boolean} hasPrimaryKey - Tests if this definition contains any fields that are designated as primary keys.
////    @property {function():boolean} matches - Determines if this data shape definition has the same fields with the same base types as the provided data shape definition.
////    @property {function():void} setFields - Replaces the fields belonging to this data shape definition with the fields provided in the specified collection.
////    @property {function():*} toJSON - Serializes this data shape definition into JSON format.
////*/
////
/////**
////    @typedef FieldDefinition
////    @type {object}
////    @property {function(AspectCollection):boolean} aspectsMatch - Determines whether or not the aspects assigned to this field are equivalent to the aspects in the provided collection.
////    @property {function():FieldDefinition} clone - Creates a deep clone of this field definition.
////    @property {function():AspectCollection} getAspects - Returns the collection of aspects belonging to this field.
////    @property {function():BaseTypes} getBaseType - Returns the base type assigned to this field.
////    @property {function():string} getDataShapeName - Returns the data shape name assigned to the ASPECT_DATASHAPE aspect, if the base type for this field is set to INFOTABLE.
////    @property {function():IPrimitiveType} getDefaultValue - Returns the default value assigned to this field, if one has been defined according to the ASPECT_DEFAULTVALUE aspect.
////    @property {function():number} getOrdinal - Returns the ordinal value assigned to this field.
////    @property {function():boolean} hasDataShape - Determines if, when the base type of this field is an INFOTABLE, a data shape has been assigned.
////    @property {function():boolean} hasDefaultValue - Determines if this field has a default value according to the ASPECT_DEFAULTVALUE aspect.
////    @property {function():boolean} isDataTableEntry - Determines if, when the base type of this field is an INFOTABLE, the contents of the info table will be derived from a data table entry.
////    @property {function():boolean} isPrimaryKey - Determines if this field has the ASPECT_ISPRIMARYKEY aspect set to true.
////    @property {function():boolean} isPrivate - Determines if this field has the ASPECT_ISPRIVATE aspect set to true.
////    @property {function():boolean} isRequired - Determines if this field has the ASPECT_ISREQUIRED aspect set to true.
////    @property {function():boolean} isStreamEntry - Determines if, when the base type of this field is an INFOTABLE, the contents of the info table will be derived from a stream entry.
////    @property {function(AspectCollection):void} setAspects - Replaces all aspects on this field with the aspects in the specified collection.
////    @property {function(BaseTypes):void} setBaseType - Assigns the specified base type to this field.
////    @property {function(number):void} setOrdinal - Sets the ordinal value for this field.
////*/
////
/////**
////    @typedef ValueCollectionList
////    @type {ArrayList}
////    @property {function():Infotable} convertToTypedInfoTable
////    @property {function():ValueCollection} currentRow
////    @property {function(ValueCollection):ValueCollection} find - arg0: values
////    @property {function(ValueCollection, string[]):ValueCollection} find - arg0: values, arg1: columns
////    @property {function(ValueCollection):number} findIndex
////    @property {function():ValueCollection} getFirstRow
////    @property {function():ValueCollection} getLastRow
////    @property {function():number} getLength
////    @property {function(number):ValueCollection} getRow - arg0: index
////    @property {function():number} getRowCount
////    @property {function(string):IPrimitiveType} getRowValue - arg0: name
////    @property {function():void} moveToFirst
////    @property {function():ValueCollection} nextRow
////*/
////
/////**
////    @typedef ValueCollection
////    @type {NamedObject}
////    @property {function():ValueCollection} clone
////    @property {function(*,DataShapeDefinition):ValueCollection} fromJSONTyped
////    @property {function(string):*} 	getJSONSerializedValue
////    @property {function(string):IPrimitiveType}  getPrimitive
////    @property {function(string):string}  getStringValue
////    @property {function(string):*} getValue
////    @property {function(string):boolean} has
////    @property {function(ValueCollection):boolean} matches
////    @property {function():Infotable} toInfoTable
////    @property {function():*} toJSON
////    @property {function(DataShapeDefinition):*} toJSONTyped
////    @property {function():NamedValueCollection} toNamedValueCollection
////*/
////
////
/////**
//// * Do something
//// * @param {DataTableThing} dataTable
//// */
////var doSome/*1*/thing = function (dataTable) {
////};
////
/////**
//// * @callback SomeCallback
//// * @param {number} foo
//// * @param {string} bar
//// */
////
//// /**
////  * Another thing
////  * @type {SomeCallback}
////  */
////var anotherThing/*2*/ = function(a, b) {}

verify.quickInfoAt("1", "var doSomething: (dataTable: DataTableThing) => void", "Do something");
verify.quickInfoAt("2", "var anotherThing: SomeCallback", "Another thing");
