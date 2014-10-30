var NestedKeys = require('../src/nested-keys');
var _          = require('underscore');


var orig_obj = {
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
    "setUp"   : function(callback) {
        this.obj = _.clone(orig_obj);
        callback();
    },
    "get"     : function(test) {

        test.equal(NestedKeys.get(this.obj, ["key_string"]), "val_string");
        test.equal(NestedKeys.get(this.obj, ["key_object_1", "foo"]), "bar");

        test.ok(
            _.isEqual(
                NestedKeys.get(this.obj, ["key_object_1", "key_object_2"]),
                {"foo" : "bar"}
            ),
            "test object value");

        test.equal(NestedKeys.get(this.obj, ["key_object_1", "not_exist"]), undefined);
        test.equal(NestedKeys.get(this.obj, ["not_exist"]), undefined);
        test.equal(NestedKeys.get(this.obj, "not_exist"), undefined, "test raw key");

        test.done();
    },
    "del"     : function(test) {
        test.ok(NestedKeys.del(this.obj, "key_string") == true);
        test.ok(NestedKeys.del(this.obj, "not_exist")  == false);
        test.ok(NestedKeys.del(this.obj, ["not_exist1", "not_exist2"])  == false);
        test.done();
    },
    "set"     : function(test) {
        test.ok(NestedKeys.set(this.obj, "hello", "world"));

        test.ok(NestedKeys.set(this.obj, ["level1", "level2"], "foobar"));
        test.equal(NestedKeys.get(this.obj, ["level1", "level2"]), "foobar");

        test.done();
    },
    "exists" : function(test) {
        test.ok(NestedKeys.exists(this.obj, ["key_object_1", "key_object_2"]));
        test.ok(NestedKeys.exists(this.obj, ["not_exists"]) == false);
        test.ok(NestedKeys.exists(this.obj, "not_exists") == false);
        test.ok(NestedKeys.exists(this.obj, ["key_object_1", "not_exists"]) == false);
        test.done();
    }
}
