var BitReaderLSB = require('../lib/BitReaderLSB');

exports.readBits = function(beforeExit, assert) {
    var reader = new BitReaderLSB([0xAA]);
    var expected = [0, 1, 0, 1, 0, 1, 0, 1];
    var result = [];

    for (var i = 0; i < 8; i++) {
        result.push(reader.readBit());
    }

    assert.eql(expected, result);
};
