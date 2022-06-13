export const withInRange = (min, max, value) => {
    return Math.max(min, Math.min(value, max));
  };
  
  export const getLast = ar => {
    return ar[ar.length - 1];
  };
  
  export const getMinInKDimensionArray = (index = 0, inputArray) => {
    let min = Number.MAX_SAFE_INTEGER;
    inputArray.forEach(e => {
      min = Math.min(min, e[index]);
    });
    return min;
  };
  
  export const getMaxInKDimensionArray = (index = 0, inputArray) => {
    let max = Number.MIN_SAFE_INTEGER;
    inputArray.forEach(e => {
      max = Math.max(max, e[index]);
    });
    return max;
  };
  
  export const getMinInObject = getMinInKDimensionArray;
  export const getMaxInObject = getMaxInKDimensionArray;
  
