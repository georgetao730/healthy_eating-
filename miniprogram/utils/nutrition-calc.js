// 营养计算工具模块

/**
 * 根据食物数据和份量计算实际营养摄入
 * @param {Object} food - 食物数据对象（每100g的数据）
 * @param {Number} amountInGrams - 实际摄入量（克）
 * @returns {Object} 实际摄入的营养素
 */
function calculateNutrition(food, amountInGrams) {
  if (!food || !amountInGrams || amountInGrams <= 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      folicAcid: 0,
      calcium: 0,
      iron: 0,
      dha: 0,
      zinc: 0,
      vitaminC: 0,
      fiber: 0
    };
  }

  const ratio = amountInGrams / 100;

  return {
    calories: toFixed(food.calories * ratio, 1),
    protein: toFixed(food.protein * ratio, 2),
    carbs: toFixed(food.carbs * ratio, 2),
    fat: toFixed(food.fat * ratio, 2),
    folicAcid: toFixed(food.folicAcid * ratio, 2),
    calcium: toFixed(food.calcium * ratio, 2),
    iron: toFixed(food.iron * ratio, 2),
    dha: toFixed(food.dha * ratio, 2),
    zinc: toFixed(food.zinc * ratio, 2),
    vitaminC: toFixed(food.vitaminC * ratio, 2),
    fiber: toFixed(food.fiber * ratio, 2)
  };
}

/**
 * 汇总一天的营养摄入
 * @param {Array} records - 当天所有饮食记录数组，每项包含 food 和 amount
 * @returns {Object} 各营养素总计
 */
function summarizeDailyNutrition(records) {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      folicAcid: 0,
      calcium: 0,
      iron: 0,
      dha: 0,
      zinc: 0,
      vitaminC: 0,
      fiber: 0
    };
  }

  const summary = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    folicAcid: 0,
    calcium: 0,
    iron: 0,
    dha: 0,
    zinc: 0,
    vitaminC: 0,
    fiber: 0
  };

  records.forEach(record => {
    if (record.food && record.amount > 0) {
      const nutrition = calculateNutrition(record.food, record.amount);
      summary.calories += nutrition.calories;
      summary.protein += nutrition.protein;
      summary.carbs += nutrition.carbs;
      summary.fat += nutrition.fat;
      summary.folicAcid += nutrition.folicAcid;
      summary.calcium += nutrition.calcium;
      summary.iron += nutrition.iron;
      summary.dha += nutrition.dha;
      summary.zinc += nutrition.zinc;
      summary.vitaminC += nutrition.vitaminC;
      summary.fiber += nutrition.fiber;
    }
  });

  // 保留小数位
  return {
    calories: toFixed(summary.calories, 1),
    protein: toFixed(summary.protein, 2),
    carbs: toFixed(summary.carbs, 2),
    fat: toFixed(summary.fat, 2),
    folicAcid: toFixed(summary.folicAcid, 2),
    calcium: toFixed(summary.calcium, 2),
    iron: toFixed(summary.iron, 2),
    dha: toFixed(summary.dha, 2),
    zinc: toFixed(summary.zinc, 2),
    vitaminC: toFixed(summary.vitaminC, 2),
    fiber: toFixed(summary.fiber, 2)
  };
}

/**
 * 计算营养素达标百分比
 * @param {Number} actual - 实际摄入量
 * @param {Number} recommended - 推荐摄入量
 * @returns {Number} 百分比（0-100+）
 */
function calculateNutrientPercentage(actual, recommended) {
  if (!recommended || recommended <= 0) return 0;
  const percentage = (actual / recommended) * 100;
  return toFixed(percentage, 1);
}

/**
 * 获取营养状态
 * @param {Number} actual - 实际摄入量
 * @param {Number} recommended - 推荐摄入量
 * @returns {String} 状态：insufficient/adequate/excessive
 */
function getNutrientStatus(actual, recommended) {
  if (!recommended || recommended <= 0) return 'insufficient';
  
  const percentage = (actual / recommended) * 100;
  
  if (percentage < 80) {
    return 'insufficient'; // 不足
  } else if (percentage > 120) {
    return 'excessive'; // 过量
  } else {
    return 'adequate'; // 适量
  }
}

/**
 * 获取状态对应的颜色
 * @param {String} status - 状态：insufficient/adequate/excessive
 * @returns {String} 颜色值
 */
function getStatusColor(status) {
  const colors = {
    insufficient: '#FF6B6B', // 红色 - 不足
    adequate: '#51CF66',     // 绿色 - 适量
    excessive: '#FFD43B'     // 黄色 - 过量
  };
  return colors[status] || '#999999';
}

/**
 * 获取状态对应的中文描述
 * @param {String} status - 状态
 * @returns {String} 中文描述
 */
function getStatusText(status) {
  const texts = {
    insufficient: '不足',
    adequate: '适量',
    excessive: '过量'
  };
  return texts[status] || '未知';
}

/**
 * 计算所有营养素的状态汇总
 * @param {Object} actual - 实际摄入
 * @param {Object} recommended - 推荐摄入
 * @returns {Object} 各营养素的状态信息
 */
function calculateAllNutrientStatus(actual, recommended) {
  const nutrients = ['calories', 'protein', 'carbs', 'fat', 'folicAcid', 
                     'calcium', 'iron', 'dha', 'zinc', 'vitaminC', 'fiber'];
  
  const result = {};
  
  nutrients.forEach(nutrient => {
    const actualValue = actual[nutrient] || 0;
    const recommendedValue = recommended[nutrient] || 0;
    
    result[nutrient] = {
      actual: actualValue,
      recommended: recommendedValue,
      percentage: calculateNutrientPercentage(actualValue, recommendedValue),
      status: getNutrientStatus(actualValue, recommendedValue),
      color: getStatusColor(getNutrientStatus(actualValue, recommendedValue))
    };
  });
  
  return result;
}

/**
 * 数字保留小数位
 * @param {Number} num - 数字
 * @param {Number} digits - 小数位数
 * @returns {Number} 处理后的数字
 */
function toFixed(num, digits) {
  if (typeof num !== 'number' || isNaN(num)) return 0;
  const multiplier = Math.pow(10, digits);
  return Math.round(num * multiplier) / multiplier;
}

module.exports = {
  calculateNutrition,
  summarizeDailyNutrition,
  calculateNutrientPercentage,
  getNutrientStatus,
  getStatusColor,
  getStatusText,
  calculateAllNutrientStatus,
  toFixed
};
