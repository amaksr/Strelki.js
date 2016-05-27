/**
 * Created by amax on 5/27/2016.
 */

QUnit.test("StrelkiJS.IndexedArray", function( assert ) {

    var t1_r0 =     { id: 100, t2_id: 206, t3_id: 301, value: "value of t1_r0" };
    var t1_r1 =     { id: 101, t2_id: 206, t3_id: 302, value: "value of t1_r1" };
    var t1_r2 =     { id: 102, t2_id: 206, t3_id: 303, value: "value of t1_r2" };
    var t1_r3 =     { id: 103, t2_id: 206, t3_id: 301, value: "value of t1_r3" };
    var t1_r4 =     { id: 104, t2_id: 206, t3_id: 302, value: "value of t1_r4" };
    var t1_r5 =     { id: 105, t2_id: 208, t3_id: 303, value: "value of t1_r5" };
    var t1_r6 =     { id: 106, t2_id: 208, t3_id: 301, value: "value of t1_r6" };
    var t1_r7 =     { id: 107, t2_id: 208, t3_id: 302, value: "value of t1_r7" };
    var t1_r8 =     { id: 108, t2_id: 208, t3_id: 303, value: "value of t1_r8" };
    var t1_r9 =     { id: 109, t2_id: 208, t3_id: 301, value: "value of t1_r9" };
    var t1_r10 =    { id: 110, t2_id: 208, t3_id: 302, value: "value of t1_r10" };

    var t1_r3_v2 =  { id: 103, t2_id: 206, t3_id: 303, value: "value of t1_r3_v0" };

    var t1 = new StrelkiJS.IndexedArray();

    // Internal data of empty array
    deepEqual(t1.toArray(),[],'TST00100');
    deepEqual(t1.getData(),{},'TST00101');
    deepEqual(t1.indexData,{},'TST00102');

    // with data 1 row of data
    t1.put(t1_r0);
    deepEqual(t1.toArray(),             [t1_r0],        'TST00200');
    deepEqual(t1.getData()[t1_r0.id],   t1_r0,          'TST00201');
    deepEqual(t1.indexData,             {},             'TST00202');

    // with few more rows of data
    t1.put(t1_r1);
    t1.put(t1_r2);
    t1.put(t1_r3);
    t1.put(t1_r4);
    t1.put(t1_r5);

    deepEqual(t1.toArray(),             [
        t1_r0,
        t1_r1,
        t1_r2,
        t1_r3,
        t1_r4,
        t1_r5,
    ],        'TST00300');
    deepEqual(t1.getData()[t1_r0.id],   t1_r0,          'TST00310');
    deepEqual(t1.getData()[t1_r1.id],   t1_r1,          'TST00320');
    deepEqual(t1.getData()[t1_r2.id],   t1_r2,          'TST00321');
    deepEqual(t1.getData()[t1_r3.id],   t1_r3,          'TST00322');
    deepEqual(t1.getData()[t1_r4.id],   t1_r4,          'TST00323');
    deepEqual(t1.indexData,             {},             'TST00330');

    // add index
    t1.createIndex("t2_id");
    t1.createIndex("t3_id");
    deepEqual(t1.indexData["t2_id"],   {
            206: {
                100: 1,
                101: 1,
                102: 1,
                103: 1,
                104: 1,
            },
            208: {
                105: 1,
            }
        },          'TST00400');
    deepEqual(t1.indexData["t3_id"],   {
        301: {
            100: 1,
            103: 1
        },
        302: {
            101: 1,
            104: 1,
        },
        303: {
            102: 1,
            105: 1,
        }
    },          'TST00401');

    // update element
    t1.put(t1_r3_v2);

    // update element: check data is updated
    deepEqual(t1.toArray(),             [
        t1_r0,
        t1_r1,
        t1_r2,
        t1_r3_v2,
        t1_r4,
        t1_r5,
    ],        'TST00500');

    // update element: check index on t2_id is updated
    deepEqual(t1.indexData["t2_id"],   {
        206: {
            100: 1,
            101: 1,
            102: 1,
            103: 1,
            104: 1,
        },
        208: {
            105: 1,
        }
    },          'TST00501');

    // update element: check index on t3_id is updated
    deepEqual(t1.indexData["t3_id"],   {
        301: {
            100: 1,
        },
        302: {
            101: 1,
            104: 1,
        },
        303: {
            102: 1,
            105: 1,
            103: 1
        }
    },          'TST00502');

    // delete elements 3 and 1
    t1.delMany([t1_r3_v2.id,t1_r1.id]);
    deepEqual(t1.toArray(),             [
        t1_r0,
        t1_r2,
        t1_r4,
        t1_r5,
    ],        'TST00600');

    // delete elements: check index t2_id
    deepEqual(t1.indexData["t2_id"],   {
        206: {
            100: 1,
            102: 1,
            104: 1,
        },
        208: {
            105: 1,
        }
    },          'TST00601');

    // delete elements: check index t3_id
    deepEqual(t1.indexData["t3_id"],   {
        301: {
            100: 1,
        },
        302: {
            104: 1,
        },
        303: {
            102: 1,
            105: 1,
        }
    },          'TST00602');

    // test empty
    t1.empty()
    deepEqual(t1.getData(),{},'TST00700');
    deepEqual(t1.indexData,{
        "t2_id": {},
        "t3_id": {},
    },'TST00701');

    // load again
    t1.put(t1_r0);
    t1.loadArray([
        t1_r1,
        t1_r2,
        t1_r3,
        t1_r4,
        t1_r5,
    ]);

    deepEqual(t1.toArray(),             [
        t1_r0,
        t1_r1,
        t1_r2,
        t1_r3,
        t1_r4,
        t1_r5,
    ],        'TST00800');

    deepEqual(t1.findIdsByIndex("t2_id",99999),[],'TST00900');
    deepEqual(t1.findIdsByIndex("t2_id","some_invalid_id"),[],'TST00901');
    deepEqual(t1.findIdsByIndex("t3_id",303),["102","105"],'TST00902');

    equal(t1.length(), 6 , 'TST01000');
    deepEqual(t1.get(102),      t1_r2,      'TST01001');
    deepEqual(t1.get(99999),    undefined,  'TST01002');
    deepEqual(t1.getAt(3),      t1_r3,      'TST01003');
    deepEqual(t1.getAt(99999),  undefined,  'TST01004');

    t1.loadArray([ t1_r6,  t1_r7,  t1_r8,  t1_r9, t1_r10 ]);

    var t1_subset = t1.where("t3_id",303,function(e){return e.value == "value of t1_r2"});
    deepEqual(t1_subset.toArray(),  [t1_r2],  'TST01100');

    t1_subset = t1.where(null,303,function(e){return e.value == "value of t1_r2"});
    deepEqual(t1_subset.toArray(),  [t1_r2],  'TST01101');

    t1_subset = t1.where("t3_id",303);
    deepEqual(t1_subset.toArray(),  [t1_r2,t1_r5,t1_r8],  'TST01102');

    /**
     * Lookups
     */

    var t2_r200 = { id: 200, aux_id: 200, t3_id: 300, value : "t2_r200 value" };
    var t2_r201 = { id: 201, aux_id: 201, t3_id: 300, value : "t2_r201 value" };
    var t2_r202 = { id: 202, aux_id: 202, t3_id: 300, value : "t2_r202 value" };
    var t2_r203 = { id: 203, aux_id: 203, t3_id: 301, value : "t2_r203 value" };
    var t2_r204 = { id: 204, aux_id: 204, t3_id: 301, value : "t2_r204 value" };
    var t2_r205 = { id: 205, aux_id: 205, t3_id: 301, value : "t2_r205 value" };
    var t2_r206 = { id: 206, aux_id: 206, t3_id: 302, value : "t2_r206 value" };
    var t2_r207 = { id: 207, aux_id: 207, t3_id: 302, value : "t2_r207 value" };
    var t2_r208 = { id: 208, aux_id: 208, t3_id: 999, value : "t2_r208 value" };
    var t2_r209 = { id: 209, aux_id: 209, t3_id: 999, value : "t2_r209 value" };

    var t2 = new StrelkiJS.IndexedArray();
    t2.loadArray([t2_r200,t2_r201,t2_r202,t2_r203]);
    t2.createIndex("aux_id");
    t2.createIndex("t3_id");
    t2.loadArray([t2_r204,t2_r205,t2_r206,t2_r207,t2_r208,t2_r209]);

    /**
     * Inner join 1 to 1 by id
     */
    var j1 = StrelkiJS.IndexedArray.doLookup(t1_r1, {
        from_col: "t2_id",
        to_table: t2,
        to_col: "id",
    });
    deepEqual(j1,  [[t2_r206]],  'TST01200');

    /**
     * Inner join 1 to 1 by index
     */
    var j1 = StrelkiJS.IndexedArray.doLookup(t1_r1, {
        from_col: "t2_id",
        to_table: t2,
        to_col: "aux_id",
    });
    deepEqual(j1,  [[t2_r206]],  'TST01201');

    /**
     * Inner join 1 to many by index
     */
    var j2 = StrelkiJS.IndexedArray.doLookup(t2_r203, {
        from_col: "t3_id",
        to_table: t1,
        to_col: "t3_id",
    });
    deepEqual(j2,  [[t1_r0],[t1_r3],[t1_r6],[t1_r9]],  'TST01202');

    /**
     * Inner join 1 to non-existing id
     */
    var j1 = StrelkiJS.IndexedArray.doLookup(t1_r1, {
        from_col: "t3_id",
        to_table: t2,
        to_col: "id",
    });
    deepEqual(j1,  [],  'TST01203');

    /**
     * Outer join 1 to non-existing id
     */
    var j1 = StrelkiJS.IndexedArray.doLookup(t1_r1, {
        from_col: "t3_id",
        to_table: t2,
        to_col: "id",
        type: "outer",
    });
    deepEqual(j1,  [[null]],  'TST01203');


    /**
     * Complex nested join of 1 record to e tables
     */
    var t3_r300 = { id: 300, aux_id: 300, t4_id: 400, value : "t3_r300 value" };
    var t3_r301 = { id: 301, aux_id: 300, t4_id: 400, value : "t3_r301 value" };
    var t3_r302 = { id: 302, aux_id: 300, t4_id: 401, value : "t3_r302 value" };
    var t3_r303 = { id: 303, aux_id: 301, t4_id: 401, value : "t3_r303 value" };
    var t3_r304 = { id: 304, aux_id: 301, t4_id: 402, value : "t3_r304 value" };
    var t3_r305 = { id: 305, aux_id: 301, t4_id: 402, value : "t3_r305 value" };
    var t3_r306 = { id: 306, aux_id: 302, t4_id: 403, value : "t3_r306 value" };
    var t3_r307 = { id: 307, aux_id: 302, t4_id: 403, value : "t3_r307 value" };
    var t3_r308 = { id: 308, aux_id: 302, t4_id: 404, value : "t3_r308 value" };
    var t3_r309 = { id: 309, aux_id: 303, t4_id: 404, value : "t3_r309 value" };

    var t3 = new StrelkiJS.IndexedArray();
    t3.createIndex("aux_id");
    t3.loadArray([t3_r300,t3_r301,t3_r302,t3_r303,t3_r304,t3_r305,t3_r306,t3_r307,t3_r308,t3_r309]);

    var t4_r400 = { id: 400, value: "t4_r400 value"};
    var t4_r401 = { id: 401, value: "t4_r401 value"};
    var t4_r402 = { id: 402, value: "t4_r402 value"};
    var t4 = new StrelkiJS.IndexedArray();
    t4.loadArray([t4_r400,t4_r401,t4_r402]);

    // Build complex join on t1 table
    var joinInfo3 = [
        {
            from_col : "t2_id",
            to_table:   t2,
            to_col:     "aux_id",
        },
        {
            from_col: "t3_id",
            to_table: t3,
            to_col: "aux_id",
            type: "outer",
            join: [
                {
                    from_col: "t4_id",
                    to_table: t4,
                    to_col: "id",
                    type: "outer",
                }
            ]
        }
    ];
    // var t1_r2 =   { id: 102, t2_id: 206, t3_id: 303, value: "value of t1_r2" };
    // var t2_r206 = { id: 206, aux_id: 206, t3_id: 302, value : "t2_r206 value" };
    var j3 = StrelkiJS.IndexedArray.doLookups(t1_r2,joinInfo3);
    deepEqual(j3,  [
        [ t2_r206, t3_r309, null ]
    ],  'TST01204');

    var j4 = t1.query(joinInfo3);
    deepEqual(j4,  [
        [ t1_r0,	t2_r206,	t3_r303,	t4_r401 ],
        [ t1_r0,	t2_r206,	t3_r304,	t4_r402 ],
        [ t1_r0,	t2_r206,	t3_r305,	t4_r402 ],

        [ t1_r1,	t2_r206,	t3_r306,	null	],
        [ t1_r1,	t2_r206,	t3_r307,	null	],
        [ t1_r1,	t2_r206,	t3_r308,	null	],

        [ t1_r2,	t2_r206,	t3_r309,	null    ],

        [ t1_r3,	t2_r206,	t3_r303,	t4_r401 ],
        [ t1_r3,	t2_r206,	t3_r304,	t4_r402 ],
        [ t1_r3,	t2_r206,	t3_r305,	t4_r402 ],

        [ t1_r4,	t2_r206,	t3_r306,	null	],
        [ t1_r4,	t2_r206,	t3_r307,	null	],
        [ t1_r4,	t2_r206,	t3_r308,	null	],

        [ t1_r5,	t2_r208,	t3_r309,	null    ],

        [ t1_r6,	t2_r208,	t3_r303,	t4_r401 ],
        [ t1_r6,	t2_r208,	t3_r304,	t4_r402 ],
        [ t1_r6,	t2_r208,	t3_r305,	t4_r402 ],

        [ t1_r7,	t2_r208,	t3_r306,	null	],
        [ t1_r7,	t2_r208,	t3_r307,	null	],
        [ t1_r7,	t2_r208,	t3_r308,	null	],

        [ t1_r8,	t2_r208,	t3_r309,	null    ],

        [ t1_r9,	t2_r208,	t3_r303,	t4_r401 ],
        [ t1_r9,	t2_r208,	t3_r304,	t4_r402 ],
        [ t1_r9,	t2_r208,	t3_r305,	t4_r402 ],

        [ t1_r10,	t2_r208,	t3_r306,	null	],
        [ t1_r10,	t2_r208,	t3_r307,	null	],
        [ t1_r10,	t2_r208,	t3_r308,	null	],
    ],  'TST01205');
});
