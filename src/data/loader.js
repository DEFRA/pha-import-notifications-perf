import {SharedArray} from 'k6/data';

export const referenceNumbers = new SharedArray(
  'reference-numbers',
  function () {
    return JSON.parse(open('./reference-numbers.json'));
  },
);
