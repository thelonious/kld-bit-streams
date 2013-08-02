var BitWriterMSB = require('../lib/BitWriterMSB');

exports.readBits = function(beforeExit, assert) {
    var writer = new BitWriterMSB();
    var value = 1;

    for (var i = 0; i < 8; i++) {
        writer.writeBit(value);
        value = 1 - value;
    }

    writer.close();

    var result = writer.data;
    var expected = [0xAA];

    assert.eql(expected, result);
};
