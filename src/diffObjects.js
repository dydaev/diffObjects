export default function diffObjects(obA, obB) {
  let result = {
    saved: {},
    added: {},
    updated: {},
    deleted: {},
  };
  const arrCoupleObjects2object = arrayObects =>
      	arrayObects.reduceRight((acc, object) => {
          const objectKey = Object.keys(object)[0];
          return { ...acc, [objectKey]: object[objectKey] };
        }, {});
  
  const primeObjectA = Array.isArray(obA) ?
        arrCoupleObjects2object(obA) : obA;
  
  const primeObjectB = Array.isArray(obB) ?
        arrCoupleObjects2object(obB) : obB;
	  
  (function walker(oA, oB, objectPath = []) {
    const oAB = Object.assign({}, oA, oB);
    
    const path = (arrayKeys, deepObject = {}) =>
      arrayKeys.reduceRight((acc, key) => {
        return { [key]: { ...acc } };
      }, deepObject);
      
    Object.keys(oAB).forEach(subAB => {
      let saved = undefined;
      let added = undefined;
      let updated  = undefined;
      let deleted  = undefined;

      if (typeof oA[subAB] === 'object' &&
      typeof oB[subAB] === 'object' &&
      subAB in oA && subAB in oB) {
        walker(oA[subAB], oB[subAB], [...objectPath, subAB]);
      } else {
        if (!(subAB in oA) &&
        subAB in oB) added = oAB[subAB];

        if (subAB in oA &&
        subAB in oB &&
        oA[subAB] === oB[subAB]) saved = oAB[subAB];

        if (subAB in oA &&
        subAB in oB &&
        oA[subAB] !== oB[subAB]) updated = oAB[subAB];
        
        if (subAB in oA &&
        !(subAB in oB)) deleted = oAB[subAB];
        
        result = {
          added: Object.assign(
            {},
            {...result.added},
            added !== undefined ? path(objectPath ,{[subAB]: added}) : {}
          ),
          saved: Object.assign(
            {},
            {...result.saved},
            saved !== undefined ? path(objectPath ,{[subAB]: saved}) : {}
            ),
          updated: Object.assign(
            {},
            {...result.updated},
            updated !== undefined ? path(objectPath ,{[subAB]: updated}) : {}
          ),
          deleted: Object.assign(
          {},
          {...result.deleted},
            deleted !== undefined ? path(objectPath ,{[subAB]: deleted}) : {}
        ),
        }
      }
    });
  })(primeObjectA, primeObjectB)
	return result;
}
