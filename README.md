# diffObjects
function returning difference of two objects

example:

const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

const object2 = {
  a: 1,
  c: 4,
  d: 5,
};

const result = diffObjects(object1, object2);
/*
result = {
  added: {
    d: 5,
  },
  saved: {
    a: 1,
  },
  updated: {
    c: 4,
  },
  deleted: {
    b: 2,
  },
};
*/
