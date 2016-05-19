# Strelki.js
Hash array library for JavaScript
## Strelki.js ##

Strelki.js is an array library that allows to create arrays with multiple hash indexes. It also allows to join arrays similar to SQL's JOIN operator.

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
		first_name: "Tiger",    
		last_name: "Woods",   
		dep_id: "sales", 
		address_id: "300"
	});

Add some index to it:

    emp.createIndex("dep_id");

Add some more data:

    emp.put({
	    id: "003",   
	    first_name: "George",   
	    last_name: "Bush",    
	    dep_id: "sales", 
	    address_id: "400"
	});



`Strelki.IndexedArray` is the main container class, that holds the main hash of elements and any number of hash indexes.
Objects are stored into main hash of `Strelki.IndexedArray` using "id" field, which should be unique.

    var rec = {
      id: "25", // unique id 
      ....
    }
