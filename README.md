nest_keys
=========

CRUD nested keys on JavaScript object.



Example
------------------------------------
```javascript
var NestedKeys = require('nested-keys');

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


// get.API
NestedKeys.get(obj, ["key_string"]) // "val_string"
NestedKeys.get(obj, ["key_object_1", "foo"]) // "bar"

// del.API
NestedKeys.del(obj, "key_string") // true
NestedKeys.del(obj, "not_exist") // false


// set.API
// exists.API
// Just as you expected.
```

See more in test cases.


INSTALL
------------------------------------
```bash
npm install nested-keys -g --verbose
```

License
------------------------------------
MIT. David Chen @ 17zuoye.
