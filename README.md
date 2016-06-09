# Strelki.js #

Strelki.js is an array library that allows to create arrays with multiple hash indexes. It also allows to join arrays similar to SQL's JOIN operator.

## JSDOCs ##

http://htmlpreview.github.io/?https://github.com/amaksr/Strelki.js/blob/master/docs/index.html

## Playground ##

https://www.izhforum.info/strelkijs/

## Quick Start ##

Load library in node.js:

    var StrelkiJS = require('./strelki');

Load library in browser:

    <script src="strelki.js"></script>
    

Create new IndexedArray object:

    var emp = new StrelkiJS.IndexedArray();

Add some data to it:

    emp.put({
	    id: "001",   
	    first_name: "John",     
	    last_name: "Smith",   
	    dep_id: "sales", 
	    address_id: "200"
	});
	emp.put({
		id: "002",   
		first_name: "Ivan",    
		last_name: "Krasonov",   
		dep_id: "sales", 
		address_id: "300"
	});

Add some index to it:

    emp.createIndex("dep_id");

Add some more data:

    emp.put({
	    id: "003",   
	    first_name: "George",   
	    last_name: "Clooney",    
	    dep_id: "hr", 
	    address_id: "400"
	});
    emp.put({
	    id: "004",   
	    first_name: "Dev",   
	    last_name: "Patel",    
	    dep_id: "board", 
	    address_id: "500"
	});

Select some records by indexed field into new IndexedArray:
    
    var sales_emp = emp.where("dep_id","sales");
    
Create another IndexedArray for addresses:

    var adr = new StrelkiJS.IndexedArray();
    
Add some data to it:

    adr.put({  id: "200",  address: "New Orleans, Bourbon street, 100"});
    adr.put({  id: "300",  address: "Moscow, Rojdestvensko-Krasnopresnenskaya Naberejnaya"});
    adr.put({  id: "500",  address: "Bollywood, India"});

Now join "emp" and adr:

    var res = emp.query([
        {
            from_col: "address_id", // name of the column in "emp" table
            to_table: adr,          // reference to another table
            to_col: "id",           // "id", or other indexed field in "adr" table
            type: "outer",          // "outer" for LEFT OUTER JOIN, or null for INNER JOIN
            //join: [               // optional recursive nested joins of the same structure
            //    {
            //        from_col: ...,
            //        to_table: ...,
            //        to_col: ...,
            //        ...
            //    },
            //    ...
            //],
        }
    ])
    
Result will be an array of joined records, similar to what SQL JOIN produces:

    [
        [
            {"id":"001","first_name":"John","last_name":"Smith","dep_id":"sales","address_id":"200"},
            {"id":"200","address":"New Orleans, Bourbon street, 100"}
        ],
        [
            {"id":"002","first_name":"Ivan","last_name":"Krasonov","dep_id":"sales","address_id":"300"},
            {"id":"300","address":"Moscow, Rojdestvensko-Krasnopresnenskaya Naberejnaya"}
        ],
        [
            {"id":"003","first_name":"George","last_name":"Clooney","dep_id":"hr","address_id":"400"},
            null
        ],
        [
            {"id":"004","first_name":"Dev","last_name":"Patel","dep_id":"board","address_id":"500"},
            {"id":"500","address":"Bollywood, India"}
        ]
    ]
    
