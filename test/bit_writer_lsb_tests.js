var BitWriterLSB = require('../lib/BitWriterLSB');

exports.readBits = function(beforeExit, assert) {
    var writer = new BitWriterLSB();
    var value = 1;

    for (var i = 0; i < 8; i++) {
        writer.writeBit(value);
        value = 1 - value;
    }

    writer.close();

    var result = writer.data;
    var expected = [0x55];

    assert.eql(expected, result);
};
