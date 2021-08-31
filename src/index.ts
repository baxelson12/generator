// hair, expression, midsection, background, accessories

import { createImage } from './create-img';
import { weightedRand } from './weighted-rnd';

const weights = {
  Torso: { T1: 0.4, T2: 0.4, T3: 0.2 },
  Face: { F1: 0.2, F2: 0.2, F3: 0.6 },
  Hat: { H1: 0.1, H2: 0.1, H3: 0.8 },
};

function generateSet(total: number, body: {}) {
  const arr: string[][] = [];
  for (let i = 0; i < total; ) {
    const temp = Object.keys(body).reduce(
      (acc, curr) => [...acc, weightedRand(body[curr as keyof typeof body])],
      [] as string[]
    );

    if (
      !arr.some((item) => item.every((v: string, i: number) => v === temp[i]))
    ) {
      arr.push(temp);
      i++;
    }
  }
  return arr;
}

function generateImages(arr: string[][]) {
  let promises: Promise<any>[] = [];
  const directories = Object.keys(weights);
  const dir = __dirname;

  for (let i = 0; i < arr.length; i++) {
    const paths = directories.reduce(
      (acc, curr, j) => [...acc, `${dir}/${curr}/${arr[i][j]}.png`],
      [] as string[]
    );
    console.log(paths);
    promises = [...promises, createImage(paths, `${dir}/out/img${i}.png`)];
  }

  Promise.all(promises);
}

generateImages(generateSet(27, weights));
