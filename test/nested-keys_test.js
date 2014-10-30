var NestedKeys = require('../src/nested-keys');


var obj = {
    "key_string" : "val_string",
    "key_array"  : ["value_array_first"],
    "key_object_1" : {
        "foo" : "bar",
        "key_object_2" : {
            "foo" : "bar",
        }
    }
};

exports.NestedKeysTest = {
    "get"     : function(test) {

        test.equal(NestedKeys.get(obj, ["key_string"]), "val_string");
        test.done();
    }/*,
    "del"     : function(test) {
    },
    "set"     : function(test) {
    },
    "exists" : function(test) {
    }*/
}
