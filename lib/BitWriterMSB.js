/**
 *
 *  BitWriterMSB.js
 *
 *  copyright 2003,2013 Kevin Lindsey
 *
 */

/**
 *  BitWriterMSB
 *
 *  @returns {BitWriterMSB}
 */
function BitWriterMSB() {
    this.data = [];
    this.mask = 0x80;
    this.currentByte = null;
}

/**
 *  writeBit
 *
 *  @param {Boolean} value
 */
BitWriterMSB.prototype.writeBit = function(value) {
    if ( value ) this.currentByte |= this.mask;

    this.mask >>= 1;
    if ( this.mask == 0 ) {
        this.data.push(this.currentByte);
        this.currentByte = 0;
        this.mask = 0x80;
    }
};

/**
 *  writeBits
 *
 *  @param {Byte} value
 *  @param {Integer} bitCount
 */
BitWriterMSB.prototype.writeBits = function(value, bitCount) {
    var mask = 1 << (bitCount - 1);

    while ( mask != 0 ) {
        this.writeBit( (value&mask) ? 1: 0 );
        mask >>= 1;
    }
};

/**
 *  close
 */
BitWriterMSB.prototype.close = function() {
    if ( this.mask != 0x80 ) {
        this.data.push(this.currentByte);
    }
};

if (typeof module !== "undefined") {
    module.exports = BitWriterMSB;
}
