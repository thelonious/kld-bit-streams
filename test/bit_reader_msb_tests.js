var BitReaderMSB = require('../lib/BitReaderMSB');

exports.readBits = function(beforeExit, assert) {
    var reader = new BitReaderMSB([0xAA]);
    var expected = [1, 0, 1, 0, 1, 0, 1, 0];
    var result = [];

    for (var i = 0; i < 8; i++) {
        result.push(reader.readBit());
    }

    assert.eql(expected, result);
};
