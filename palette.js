/**
 * Generates a palette based on Inigo Quilez's wonderful article
 * http://www.iquilezles.org/www/articles/palettes/palettes.htm
 * 
 * @param {number[3]} a 
 * @param {number[3]} b 
 * @param {number[3]} c 
 * @param {number[3]} d 
 * @returns {Object}
 */

function Palette(a,b,c,d) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
}

Palette.prototype.map = function(v, vi, vx, ri, rx) {
  const vd = Math.abs(vx - vi);
  const vr = Math.abs(v - vi);
  const rd = Math.abs(rx - ri);
  return ((vr / vd) * rd) + ri;
}

/**
 * Returns an number[3] object in RGB space with values 0-255 in each index
 * of the array
 * @returns {number[3]}
 */
Palette.prototype.getColor = function(t) {
  const r = [0,1,2].map((i) => {
    const v = (this.a[i] + this.b[i]) * Math.cos(((this.c[i] * t) + this.d[i]) * Math.PI * 2.0);
    return this.map(v, -1, 1, 0, 255);
  });

  return r;
}