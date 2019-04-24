class Tools {

  constructor(){
    
  }

  /**
 * 浮点数相加
 * @param num1
 * @param num2
 * @returns {number}
 * @introduce 浮点数相加，容易出现位数过长，精度不准的问题，
 * @idea 先升幂再降幂
 */
  numberAdd(){
    
    let args = Array.prototype.slice.apply(arguments);
    
    let handle = args.map( (item) => {
      return (''+item).split('.')[1].length;
    })

    let m = Math.pow(10 , Math.max(...handle));

    let sum = args.reduce(function(prev, next, index, array) {
      return (prev * m + next * m)/m;
    })

    return sum;
    
  }

}

module.exports = exports = new Tools();

