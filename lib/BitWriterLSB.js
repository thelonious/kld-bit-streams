/**
 *
 *  BitWriterLSB.js
 *
 *  copyright 2003,2013 Kevin Lindsey
 *
 */

/**
 *  BitWriterLSB
 *
 *  @returns {BitWriterLSB}
 */
function BitWriterLSB() {
    this.data = [];
    this.mask = 0x01;
    this.currentByte = null;
}

/**
 *  writeBit
 *
 *  @param {Boolean} value
 */
BitWriterLSB.prototype.writeBit = function(value) {
    if ( value ) this.currentByte |= this.mask;

    this.mask <<= 1;
    if ( this.mask == 0x100 ) {
        this.data.push(this.currentByte);
        this.currentByte = 0;
        this.mask = 0x01;
    }
};

/**
 *  writeBits
 *
 *  @param {Byte} value
 *  @param {Integer} bitCount
 */
BitWriterLSB.prototype.writeBits = function(value, bitCount) {
    var end = 1 << bitCount;

    for ( var  mask = 1; mask != end; mask <<= 1 ) {
        this.writeBit( (value&mask) ? 1: 0 );
    }
};

/**
 *  close
 */
BitWriterLSB.prototype.close = function() {
    if ( this.mask != 0x01 ) {
        this.data.push(this.currentByte);
    }
};

if (typeof module !== "undefined") {
    module.exports = BitWriterLSB;
}
