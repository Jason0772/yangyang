export function fastList(start: number, end: number): number[] {
  let list = [];
  for (var i = 0; i < end - start; i++) {
    list.push(i + start);
  }
  return list;
}

export function randomList(source: number[], total: number): number[] {
  let list = [];
  for (var i = 0; i < total; i++) {
    var num = Math.floor(Math.random() * source.length);
    list.push(source[num]);
  }
  return list;
}

export function randomSort(list: number[]): number[] {
  const ary = list.sort((a, b) => {
    return Math.random() - 0.5;
  });
  return ary;
}

export function timesList(list: number[], times: number): number[] {
  const ary: number[] = [];
  list.forEach((num) => {
    for (let i = 0; i < times; i++) {
      ary.push(num);
    }
  });
  return ary;
}
