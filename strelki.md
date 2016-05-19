# StrelkiJS

StrelkiJS module



* * *

## Class: IndexedArray
Create new IndexArray object

### StrelkiJS.IndexedArray.setOrdered(ordered) 

Set flag that indicates whether array should be ordered by "id" or not

**Parameters**

**ordered**: `boolean`, Set flag that indicates whether array should be ordered by "id" or not


### StrelkiJS.IndexedArray.createIndex(fieldName) 

Creates hash index on array using fieldName property of the elements

**Parameters**

**fieldName**: `String`, Creates hash index on array using fieldName property of the elements


### StrelkiJS.IndexedArray.getData() 

Returns hash array of objects

**Returns**: `Object | *`

### StrelkiJS.IndexedArray.loadArray(array) 

Puts all the elements from array

**Parameters**

**array**: `Array`, Puts all the elements from array


### StrelkiJS.IndexedArray.dropIndex(fieldName) 

Drops index fieldName

**Parameters**

**fieldName**: `String`, Drops index fieldName


### StrelkiJS.IndexedArray.dropAllIndexes(fieldName) 

Drops all indexes

**Parameters**

**fieldName**: , Drops all indexes


### StrelkiJS.IndexedArray.length() 

Returns number of elements in the array

**Returns**: `Number`

### StrelkiJS.IndexedArray.empty() 

Delete all data in the array


### StrelkiJS.IndexedArray.get(id) 

Returns record by "id" field

**Parameters**

**id**: , Returns record by "id" field

**Returns**: `*`

### StrelkiJS.IndexedArray.getAt(pos) 

Returns record at given position

**Parameters**

**pos**: `Number`, position of element

**Returns**: `*`

### StrelkiJS.IndexedArray.put(element) 

Stores element with unique "id" to array. If element with given "id" was already there, it will be overriden with the new element

**Parameters**

**element**: , Stores element with unique "id" to array. If element with given "id" was already there, it will be overriden with the new element


### StrelkiJS.IndexedArray.del(id) 

Delete element by "id"

**Parameters**

**id**: , Delete element by "id"


### StrelkiJS.IndexedArray.delMany(ids) 

Delete multimple elements by array of ids

**Parameters**

**ids**: `Array`, Delete multimple elements by array of ids


### StrelkiJS.IndexedArray.toArray() 

Returns IndexedArray converted to regular Array

**Returns**: `Array`

### StrelkiJS.IndexedArray.findIdsByIndex(filedName, value) 

Find elements by index value, and return their ids

**Parameters**

**filedName**: `String`, index name

**value**: `String`, index value

**Returns**: `Array`, - array of ids, empty array if not found

### StrelkiJS.IndexedArray.doLookups(el, joinInfoArray) 

For element el perform lookups according to joinInfoArray, and return all related records

**Parameters**

**el**: , element

**joinInfoArray**: `Array`, For element el perform lookups according to joinInfoArray, and return all related records


### StrelkiJS.IndexedArray.query(joinInfoArray) 

Join other IndexedArrays according to joinInfoArray<pre>joinInfoArray = [ 	{ 		from_col:   mandatory field name in 'el' element 		to_table:   mandatory reference to IndexedArray 		to_col:     mandatory id or other indexed field in referenced IndexedArray 	        type:       'outer' for outer join, null for inner join 	        join:       optional nested joinInfoArray structure 	}, ] </pre>

**Parameters**

**joinInfoArray**: , Join other IndexedArrays according to joinInfoArray<pre>joinInfoArray = [ 	{ 		from_col:   mandatory field name in 'el' element 		to_table:   mandatory reference to IndexedArray 		to_col:     mandatory id or other indexed field in referenced IndexedArray 	        type:       'outer' for outer join, null for inner join 	        join:       optional nested joinInfoArray structure 	}, ] </pre>

**Returns**: `Array`, - array of records, where each record is an array of joined elements

### StrelkiJS.IndexedArray.where(fieldName, value, filterCallback) 

Search array by index, and then by filterCallback function

**Parameters**

**fieldName**: , name of the index, null to select all elements

**value**: , value of the index

**filterCallback**: , filter function that eccepts element as a parameter, and returns true or false

**Returns**: `IndexedArray`, - new IndexedArray with selected records



* * *










