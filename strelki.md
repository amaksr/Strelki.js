

<!-- Start strelki.js -->

StrelkiJS module

## IndexedArray

Create new IndexArray object

## setOrdered(ordered)

Set flag that indicates whether array should be ordered by "id" or not

### Params:

* **boolean** *ordered* 

## createIndex(fieldName)

Creates hash index on array using fieldName property of the elements

### Params:

* **String** *fieldName* 

## getData()

Returns hash array of objects

### Return:

* **[object Object]** 

## loadArray(array)

Puts all the elements from array

### Params:

* **Array** *array* 

## dropIndex(fieldName)

Drops index fieldName

### Params:

* **String** *fieldName* 

## dropAllIndexes(fieldName)

Drops all indexes

### Params:

* *fieldName* 

## length()

Returns number of elements in the array

### Return:

* **Number** 

## empty()

Delete all data in the array

## get(id)

Returns record by "id" field

### Params:

* *id* 

### Return:

* 

## getAt(pos)

Returns record at given position

### Params:

* **Number** *pos* - position of element

### Return:

* 

## put(element)

Stores element with unique "id" to array. If element with given "id" was already there, it will be overriden with the new element

### Params:

* *element* 

## del(id)

Delete element by "id"

### Params:

* *id* 

## delMany(ids)

Delete multimple elements by array of ids

### Params:

* **Array** *ids* 

## toArray()

Returns IndexedArray converted to regular Array

### Return:

* **Array** 

## findIdsByIndex(filedName, value)

Find elements by index value, and return their ids

### Params:

* **String** *filedName* - index name
* **String** *value* - index value

### Return:

* **Array** - array of ids, empty array if not found

## doLookups(el, joinInfoArray)

For element el perform lookups according to joinInfoArray, and return all related records

### Params:

* *el* - element
* **Array** *joinInfoArray* 

## query(joinInfoArray)

Join other IndexedArrays according to joinInfoArray
<pre>
joinInfoArray = [
 	{
 		from_col:   mandatory field name in 'el' element
 		to_table:   mandatory reference to IndexedArray
 		to_col:     mandatory id or other indexed field in referenced IndexedArray
 	        type:       'outer' for outer join, null for inner join
 	        join:       optional nested joinInfoArray structure
 	},

 ]
 </pre>

### Params:

* *joinInfoArray* 

### Return:

* **Array** - array of records, where each record is an array of joined elements

## where(fieldName, value, filterCallback)

Search array by index, and then by filterCallback function

### Params:

* *fieldName* - name of the index, null to select all elements
* *value* - value of the index
* *filterCallback* - filter function that eccepts element as a parameter, and returns true or false

### Return:

* **IndexedArray** - new IndexedArray with selected records

<!-- End strelki.js -->

