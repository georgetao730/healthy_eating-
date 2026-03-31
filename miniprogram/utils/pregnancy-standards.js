// 孕期营养标准模块
// 数据来源参考：《中国居民膳食指南（2022）》孕期妇女膳食指南

const pregnancyStandards = {
  early: {  // 孕早期（1-12周）
    calories: 2100,      // 千卡
    protein: 55,         // 克
    carbs: 300,          // 克
    fat: 60,             // 克
    folicAcid: 600,      // 微克
    calcium: 800,        // 毫克
    iron: 20,            // 毫克
    dha: 200,            // 毫克
    zinc: 9.5,           // 毫克
    vitaminC: 100,       // 毫克
    fiber: 25            // 克
  },
  middle: { // 孕中期（13-27周）
    calories: 2300,      // 千卡 - 增加200
    protein: 70,         // 克 - 增加15
    carbs: 330,          // 克 - 增加30
    fat: 70,             // 克 - 增加10
    folicAcid: 600,      // 微克 - 维持
    calcium: 1000,       // 毫克 - 增加200
    iron: 24,            // 毫克 - 增加4
    dha: 200,            // 毫克 - 维持
    zinc: 9.5,           // 毫克 - 维持
    vitaminC: 115,       // 毫克 - 增加15
    fiber: 28            // 克 - 增加3
  },
  late: {   // 孕晚期（28-40周）
    calories: 2500,      // 千卡 - 增加400
    protein: 85,         // 克 - 增加30
    carbs: 360,          // 克 - 增加60
    fat: 80,             // 克 - 增加20
    folicAcid: 600,      // 微克 - 维持
    calcium: 1000,       // 毫克 - 维持
    iron: 29,            // 毫克 - 增加9
    dha: 200,            // 毫克 - 维持
    zinc: 9.5,           // 毫克 - 维持
    vitaminC: 115,       // 毫克 - 维持
    fiber: 30            // 克 - 增加5
  }
};

// 孕期阶段配置
const stageConfig = {
  early: {
    name: '孕早期',
    minWeek: 1,
    maxWeek: 12,
    description: '胚胎发育关键期，注意补充叶酸'
  },
  middle: {
    name: '孕中期',
    minWeek: 13,
    maxWeek: 27,
    description: '胎儿快速生长期，营养需求增加'
  },
  late: {
    name: '孕晚期',
    minWeek: 28,
    maxWeek: 40,
    description: '胎儿体重增长期，注意控制体重'
  }
};

/**
 * 根据孕周返回对应阶段的标准
 * @param {Number} week - 孕周（1-40）
 * @returns {Object} 对应阶段的营养标准
 */
function getStandardByWeek(week) {
  const stage = getPregnancyStageKey(week);
  if (stage) {
    return {
      ...pregnancyStandards[stage],
      stage: stageConfig[stage].name,
      week: week
    };
  }
  return null;
}

/**
 * 获取孕期阶段key
 * @param {Number} week - 孕周
 * @returns {String|null} 阶段key：early/middle/late
 */
function getPregnancyStageKey(week) {
  if (!week || week < 1 || week > 42) return null;
  
  if (week <= 12) {
    return 'early';
  } else if (week <= 27) {
    return 'middle';
  } else {
    return 'late';
  }
}

/**
 * 返回孕期阶段名称
 * @param {Number} week - 孕周（1-40）
 * @returns {String} 孕期阶段名称
 */
function getPregnancyStage(week) {
  const stage = getPregnancyStageKey(week);
  return stage ? stageConfig[stage].name : '未知';
}

/**
 * 获取孕期阶段详细信息
 * @param {Number} week - 孕周
 * @returns {Object|null} 阶段详细信息
 */
function getStageInfo(week) {
  const stage = getPregnancyStageKey(week);
  if (!stage) return null;
  
  return {
    ...stageConfig[stage],
    key: stage,
    standards: pregnancyStandards[stage]
  };
}

/**
 * 返回所有标准
 * @returns {Object} 所有孕期阶段的营养标准
 */
function getAllStandards() {
  return {
    early: {
      ...pregnancyStandards.early,
      stageName: stageConfig.early.name
    },
    middle: {
      ...pregnancyStandards.middle,
      stageName: stageConfig.middle.name
    },
    late: {
      ...pregnancyStandards.late,
      stageName: stageConfig.late.name
    }
  };
}

/**
 * 获取特定营养素的标准
 * @param {Number} week - 孕周
 * @param {String} nutrient - 营养素名称
 * @returns {Number|null} 该营养素的推荐摄入量
 */
function getNutrientStandard(week, nutrient) {
  const standard = getStandardByWeek(week);
  if (!standard || !standard[nutrient]) return null;
  return standard[nutrient];
}

/**
 * 获取营养素单位
 * @param {String} nutrient - 营养素名称
 * @returns {String} 单位
 */
function getNutrientUnit(nutrient) {
  const units = {
    calories: '千卡',
    protein: '克',
    carbs: '克',
    fat: '克',
    folicAcid: '微克',
    calcium: '毫克',
    iron: '毫克',
    dha: '毫克',
    zinc: '毫克',
    vitaminC: '毫克',
    fiber: '克'
  };
  return units[nutrient] || '';
}

/**
 * 获取营养素中文名称
 * @param {String} nutrient - 营养素名称
 * @returns {String} 中文名称
 */
function getNutrientName(nutrient) {
  const names = {
    calories: '热量',
    protein: '蛋白质',
    carbs: '碳水化合物',
    fat: '脂肪',
    folicAcid: '叶酸',
    calcium: '钙',
    iron: '铁',
    dha: 'DHA',
    zinc: '锌',
    vitaminC: '维生素C',
    fiber: '膳食纤维'
  };
  return names[nutrient] || nutrient;
}

/**
 * 获取所有营养素列表
 * @returns {Array} 营养素列表
 */
function getAllNutrients() {
  return [
    { key: 'calories', name: '热量', unit: '千卡' },
    { key: 'protein', name: '蛋白质', unit: '克' },
    { key: 'carbs', name: '碳水化合物', unit: '克' },
    { key: 'fat', name: '脂肪', unit: '克' },
    { key: 'folicAcid', name: '叶酸', unit: '微克' },
    { key: 'calcium', name: '钙', unit: '毫克' },
    { key: 'iron', name: '铁', unit: '毫克' },
    { key: 'dha', name: 'DHA', unit: '毫克' },
    { key: 'zinc', name: '锌', unit: '毫克' },
    { key: 'vitaminC', name: '维生素C', unit: '毫克' },
    { key: 'fiber', name: '膳食纤维', unit: '克' }
  ];
}

module.exports = {
  pregnancyStandards,
  getStandardByWeek,
  getPregnancyStage,
  getPregnancyStageKey,
  getStageInfo,
  getAllStandards,
  getNutrientStandard,
  getNutrientUnit,
  getNutrientName,
  getAllNutrients
};
