var _ = require('underscore');



var NestedKeys = (function() {
    var nested_access = function (obj, keys, func) {
        // fix array, keys are default to [undefined]
        if (!_.isArray(keys)) { keys = [keys]; }
        // set default
        func = func || function() { };

        // make refs
        var _curr = obj;
        var _keys = _.clone(keys);
        var _result;

        // fix already set *is_reach_end* before loop
        var is_reach_end = true; // means all keys are used.
        if ((keys.length == 1) && !(keys[0] in obj)) {
            is_reach_end = false; // set before delete op happens
        }

        // loop over keys
        while (_keys.length > 0) {
           var _key1 = _keys.shift();

           // fetch value *only one time*
           _curr_ref = _curr[_key1];
           if (_.isUndefined(_curr_ref)) {
               if (!(_key1 in _curr)) { // compact with *undefined*
                   is_reach_end = false;
                   break;
               }
           }

           // run custom callback
           if (_keys.length == 0) { _result = func(_curr, _key1); }

           _curr = _curr_ref; // set back
        }

        return [_result, is_reach_end];
    };

    var exports = {
        get: function (obj, keys) {
            var result = nested_access(obj, keys, function(_curr, _key1) {
                return _curr[_key1];
            });
            return result[0];
        },
        del: function (obj, keys) {
            var result = nested_access(obj, keys, function(_curr, _key1) {
                delete _curr[_key1];
            });
            return result[1];
        },
        set: function (obj, keys, val) {
            // make refs
            var _curr = obj;
            if (!_.isArray(keys)) { keys = [keys]; }
            var _keys = _.clone(keys);

            // `mkdir -p`
            while (_keys.length > 1) {
                var _key1 = _keys.shift();
                if (!(_key1 in _keys)) { _curr[_key1] = {}; }
                _curr = _curr[_key1];
            }

            // set val at that level.
            var _key1_last = _keys.shift();
            _curr[_key1_last] = val;
            return true;
        },
        exists: function(obj, keys) {
            return nested_access(obj, keys, function(_curr, _key1) {
                return _curr[_key1];
            })[1];
        }
    };

    return exports;
})();


module.exports = NestedKeys
