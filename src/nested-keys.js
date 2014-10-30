var _ = require('underscore');



var NestedKeys = (function() {
    var nest_access = function (obj, keys, func) {
        var _curr = obj;
        var _keys = _.clone(keys);
        func = func || function() { };
        while (_keys.length > 0) {
           var _key1 = _keys.shift();
           func(_curr, _keys.length, _key1);
           _curr = _curr[_key1];
           if (_.isUndefined(_curr)) {
               break;
           }
        }
        return _curr;
    };

    var exports = {
        get: function (obj, keys) {
            return nest_access(obj, keys, function(_curr, _keys_length, _key1) {
                return _curr[_key1];
            });
        },
        del: function (obj, keys) {
            return nest_access(obj, keys, function(_curr, _keys_length, _key1) {
                if (_keys_length == 0) {
                    delete _curr[_key1];
                }
            });
        },
        exist: function(obj, keys) {
            // TODO compact with *undefined*.
            return !!this.read(obj, keys);
        }
    };

    return exports;
})();


module.exports = NestedKeys
