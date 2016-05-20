"use strict";

/**
 * StrelkiJS module
 * @module StrelkiJS
 * @author A. Maximov amaksr
 */
(function(exports){

    /**
     * Create new IndexArray object
     * @class
     * IndexedArray is a hybrid array with multiple hash indexes.
     * It can have additional "indexes": hash objects that point to elements and that can be quickly accessed by index value.
     * Elements also can be accessed by position.
     * @name IndexedArray
     * @constructor
     */
    var IndexedArray = function() {
        this.data = {};
        this.data_ids = null;
        this.indexData = {};
        this.ordered = false;
    }

    /**
     * Set flag that indicates whether array should be ordered by "id" or not
     * @param {boolean} ordered
     */
    IndexedArray.prototype.setOrdered = function(ordered) {
        this.ordered = ordered;
        if(this.ordered && this.data_ids)
            this.data_ids.sort();
    };

    IndexedArray.prototype._getDataIds = function() {
        if(!this.data_ids) {
            this.data_ids = Object.keys(this.data);
            if(this.ordered)
                this.data_ids.sort();
        }
        return this.data_ids;
    };

    /**
     * Creates hash index on array using fieldName property of the elements
     * @param {String} fieldName
     */
    IndexedArray.prototype.createIndex = function(fieldName) {
        if(fieldName === 'id')
            return;

        var idxData = {};
        var dataKeys = this._getDataIds();
        for(var i=0; i<dataKeys.length; i++) {
            var id = dataKeys[i];
            var e = this.data[id];
            var fv = e[fieldName];
            if(!idxData[fv])
                idxData[fv] = {};

            idxData[fv][id] = 1;
        }
        this.indexData[fieldName] = idxData;
    };

    /**
     * Returns hash array of objects
     * @returns {{}|*}
     */
    IndexedArray.prototype.getData = function() {
        return this.data;
    };

    /**
     * Puts all the elements from array
     * @param {Array} array
     */
    IndexedArray.prototype.loadArray = function(array) {
        if(!array || !array.length)
            return;
        for(var i=0; i<array.length; i++)
            this.put(array[i]);
    };

    /**
     * Drops index fieldName
     * @param {String} fieldName
     */
    IndexedArray.prototype.dropIndex = function(fieldName) {
        delete this.indexData[fieldName];
    };

    /**
     * Drops all indexes
     * @param fieldName
     */
    IndexedArray.prototype.dropAllIndexes = function(fieldName) {
        this.indexData={};
    };

    /**
     * Returns number of elements in the array
     * @returns {Number}
     */
    IndexedArray.prototype.length = function() {
        return this._getDataIds().length;
    };

    /**
     * Delete all data in the array
     */
    IndexedArray.prototype.empty = function() {
        this.data = {};
        this.data_ids = null;
        var indexes = Object.keys(this.indexData);
        for(var i = 0; i < indexes.length; i++)
            this.indexData[indexes[i]] = {};
    };

    /**
     * Returns record by "id" field
     * @param id
     * @returns {*}
     */
    IndexedArray.prototype.get = function(id) {
        return this.data[id];
    };

    /**
     * Returns record at given position
     * @param {Number} pos - position of element
     * @returns {*}
     */
    IndexedArray.prototype.getAt = function(pos) {
        return this.data[this._getDataIds()[pos]];
    };

    /**
     * Stores element with unique "id" to array. If element with given "id" was already there, it will be overriden with the new element
     * @param element
     */
    IndexedArray.prototype.put = function(element) {
        this.del(element.id);
        this.data_ids = null;
        this.data[element.id] = element;

        var indexes = Object.keys(this.indexData);
        for(var i = 0; i < indexes.length; i++) {
            var fld = element[indexes[i]];
            var idxData = this.indexData[indexes[i]];
            if(!idxData[fld])
                idxData[fld] = {};

            idxData[fld][element.id] = 1;
        }
    };

    /**
     * Delete element by "id"
     * @param id
     */
    IndexedArray.prototype.del = function(id) {
        var e = this.data[id];
        if(!e)
            return;
        var indexes = Object.keys(this.indexData);
        for(var i = 0; i < indexes.length; i++) {
            var idxData = this.indexData[indexes[i]];
            var idxElements  = idxData[e[indexes[i]]];
            if(idxElements) {
                delete idxElements[id];
                if(Object.keys(idxElements).length === 0)
                    delete idxData[e[indexes[i]]];
            }
        }
        delete this.data[id];
        this.data_ids = null;
    };

    /**
     * Delete multimple elements by array of ids
     * @param {Array} ids
     */
    IndexedArray.prototype.delMany = function(ids) {
        for(var i=0; i<ids.length; i++)
            this.del(ids[i]);
    };

    /**
     * Returns IndexedArray converted to regular Array
     * @returns {Array}
     */
    IndexedArray.prototype.toArray = function() {
        var res = [];
        var ids = this._getDataIds();
        for(var i =0; i<ids.length; i++)
            res.push(this.get(ids[i]));
        return res;
    };

    /**
     * Find elements by index value, and return their ids
     * @param {String} filedName - index name
     * @param {String} value - index value
     * @returns {Array} - array of ids, empty array if not found
     */
    IndexedArray.prototype.findIdsByIndex = function(filedName,value) {
        if(filedName === 'id') {
            var val = this.data[value];
            if(val)
                return [val.id];
            else
                return [];
        }
        else {
            var idxData = this.indexData[filedName];
            if(!idxData)
                throw "Index " + filedName + " does not exist";
            if(!idxData[value])
                return [];

            return Object.keys(idxData[value]);
        }
    };

    IndexedArray.prototype.dump = function() {
        console.log("dump: indexes="+JSON.stringify(this.indexData));
        console.log("dump: data="+JSON.stringify(this.data));
    };


    /**
     * For element el perform lookups according to joinInfoArray, and return all related records
     * @param el - element
     * @param {Array} joinInfoArray
     */
    IndexedArray.doLookups = function(el, joinInfoArray) {
        var res=[];
        for(var i=0; i<joinInfoArray.length; i++) {
            var ji = joinInfoArray[i];
            var joins = IndexedArray.doLookup(el, ji);
            res = IndexedArray._merge(res,joins);
        }
        return res;
    };

    IndexedArray.doLookup = function(el, joinInfo) {
        var res = [];
        var from_col = joinInfo.from_col;
        var to_table = joinInfo.to_table;
        var to_col = joinInfo.to_col;
        var to_ids = el?to_table.findIdsByIndex(to_col,el[from_col]):[];

        if(to_ids.length == 0 && joinInfo.type === 'outer')
            to_ids.push(null);

        for(var i=0; i < to_ids.length; i++) {
            var to_id = to_ids[i];
            var to_el = to_id?to_table.getData()[to_id]:null;
            if(joinInfo['join']) {
                var joins = IndexedArray.doLookups(to_el,joinInfo['join']);
                for(var j=0; j<joins.length; j++)
                    res.push([to_el].concat(joins[j]));
            }
            else
                res.push([to_el]);
        }

        return res;
    };

    /**
     * Join other IndexedArrays according to joinInfoArray
     * <pre>
     * joinInfoArray = [
     *  	{
	 *  		from_col:   mandatory field name in 'el' element
	 *  		to_table:   mandatory reference to IndexedArray
	 *  		to_col:     mandatory id or other indexed field in referenced IndexedArray
	 *  	        type:       'outer' for outer join, null for inner join
	 *  	        join:       optional nested joinInfoArray structure
	 *  	},
     *
     *  ]
     *  </pre>
     * @param joinInfoArray
     * @returns {Array} - array of records, where each record is an array of joined elements
     */
    IndexedArray.prototype.query = function(joinInfoArray) {
        var res = [];
        var mainKeys = this._getDataIds();
        for(var i=0; i < mainKeys.length; i++) {
            var el = this.data[mainKeys[i]];
            var joins = IndexedArray.doLookups(el,joinInfoArray);

            for(var j=0; j<joins.length; j++)
                res.push([el].concat(joins[j]));
        }
        return res;
    };

    /**
     * Search array by index, and then by filterCallback function
     * @param fieldName - name of the index, null to select all elements
     * @param value - value of the index
     * @param filterCallback - filter function that eccepts element as a parameter, and returns true or false
     * @returns {IndexedArray} - new IndexedArray with selected records
     */
    IndexedArray.prototype.where = function(fieldName, value, filterCallback) {
        var res = new IndexedArray();

        var ids;

        if(fieldName)
            ids = this.findIdsByIndex(fieldName, value);
        else
            ids = this._getDataIds();

        for(var i = 0; i < ids.length; i++) {
            var el = this.get(ids[i]);
            if(!filterCallback || filterCallback && filterCallback(el))
                res.put(el);
        }
        return res;
    };

    IndexedArray._merge = function(arr1, arr2) {
        if(arr1.length === 0)
            return arr2;
        var res=[];
        for(var i=0; i < arr1.length; i++) {
            for(var j=0; j < arr2.length; j++) {
                res.push(arr1[i].concat(arr2[j]));
            }
        }
        return res;
    };

	exports.IndexedArray = IndexedArray;
	
})(typeof exports === 'undefined'? this['StrelkiJS']={} : exports);
