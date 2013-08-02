/**
 *
 *  BitReaderLSB.js
 *
 *  copyright 2003,2013 Kevin Lindsey
 *
 */

/**
 *  BitReaderLSB
 *
 *  @param {Array<Byte>} data
 *  @returns {BitReaderLSB}
 */
function BitReaderLSB(data) {
    this.data = data;
    this.index = 0;
    this.mask = 0x01;
    this.currentByte = null;
}

/**
 *  readBit
 *
 *  @returns {Boolean}
 */
BitReaderLSB.prototype.readBit = function() {
    var result = null;

    if ( this.mask === 0x01 ) {
        if ( this.index < this.data.length ) {
            this.currentByte = this.data[this.index++];
        }
    }
    if ( this.currentByte !== null ) {
        result = this.currentByte & this.mask;
        this.mask <<= 1;
        if ( this.mask === 0x100 ) {
            this.mask = 0x01;
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
 *
 *  @param {Integer} bitCount
 *  @returns {Byte}
 */
BitReaderLSB.prototype.readBits = function(bitCount) {
    var end = 1 << bitCount;
    var result = 0;

    for ( var mask = 1; mask !== end; mask <<= 1 ) {
        if ( this.readBit() === 1) result |= mask;
    }

    return result;
};

if (typeof module !== "undefined") {
    module.exports = BitReaderLSB;
}