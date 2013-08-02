/**
 *
 *  BitReaderMSB.js
 *
 *  copyright 2003,2013 Kevin Lindsey
 *
 */

/**
 *  BitReaderMSB
 *
 *  @param {Array<Byte>} data
 *  @returns {BitReaderMSB}
 */
function BitReaderMSB(data) {
    this.data = data;
    this.index = 0;
    this.mask = 0x80;
    this.currentByte = null;
}

/**
 *  readBit
 */
BitReaderMSB.prototype.readBit = function() {
    var result = null;

    if ( this.mask === 0x80 ) {
        if ( this.index < this.data.length ) {
            this.currentByte = this.data[this.index++];
        }
    }
    if ( this.currentByte !== null ) {
        result = this.currentByte & this.mask;
        this.mask >>= 1;
        if ( this.mask === 0 ) {
            this.mask = 0x80;
            this.currentByte = null;
        }
    }

    if ( result !== null ) {
        result = (result === 0) ? 0 : 1;
    }

    return result;
};

/**
 *  readBits
 */
BitReaderMSB.prototype.readBits = function(bitCount) {
    var mask = 1 << (bitCount - 1);
    var result = 0;

    while ( mask !== 0 ) {
        if ( this.readBit() === 1) {
            result |= mask;
        }
        mask >>= 1;
    }

    return result;
};

if (typeof module !== "undefined") {
    module.exports = BitReaderMSB;
}
