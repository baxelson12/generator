import * as crypto from 'crypto';

export function csprng(min: number, max: number): number {
  // Some credit to https://github.com/joepie91/node-random-number-csprng
  /* Careful! This doesn't work with large ranges. Specifically, don't use
   * this with ranges larger than 2^32 - 1 */

  const range = max - min;
  if (range >= Math.pow(2, 32)) console.log('Warning! Range is too large.');

  var tmp = range;
  var bitsNeeded = 0;
  var bytesNeeded = 0;
  var mask = 1;

  while (tmp > 0) {
    if (bitsNeeded % 8 === 0) bytesNeeded += 1;
    bitsNeeded += 1;
    mask = (mask << 1) | 1;
    tmp = tmp >>> 1;
  }
  const randomBytes = crypto.randomBytes(bytesNeeded);
  var randomValue = 0;

  for (var i = 0; i < bytesNeeded; i++) {
    randomValue |= randomBytes[i] << (8 * i);
  }

  randomValue = randomValue & mask;

  if (randomValue <= range) {
    return min + randomValue;
  } else {
    return csprng(min, max);
  }
}
