import merger from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import * as fs from 'fs';

export function createImage(layers: string[], path: string): Promise<any> {
  return merger(layers, { Canvas, Image }).then((b64) =>
    fs.writeFile(
      path,
      b64.replace(/^data:image\/png;base64,/, ''),
      'base64',
      () => false
    )
  );
}
