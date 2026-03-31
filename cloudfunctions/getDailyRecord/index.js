const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { date } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  try {
    // 查询指定日期的所有记录
    const result = await db.collection('diet_records').where({
      _openid: openid,
      date: date
    }).get();
    
    // 按 mealType 分组
    const groupedData = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };
    
    // 汇总营养素
    const summary = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFolicAcid: 0,
      totalCalcium: 0,
      totalIron: 0,
      totalDha: 0,
      totalZinc: 0,
      totalVitaminC: 0,
      totalFiber: 0
    };
    
    result.data.forEach(record => {
      // 分组
      if (groupedData[record.mealType]) {
        groupedData[record.mealType].push(record);
      }
      
      // 累加营养素
      summary.totalCalories += record.calories || 0;
      summary.totalProtein += record.protein || 0;
      summary.totalCarbs += record.carbs || 0;
      summary.totalFat += record.fat || 0;
      summary.totalFolicAcid += record.folicAcid || 0;
      summary.totalCalcium += record.calcium || 0;
      summary.totalIron += record.iron || 0;
      summary.totalDha += record.dha || 0;
      summary.totalZinc += record.zinc || 0;
      summary.totalVitaminC += record.vitaminC || 0;
      summary.totalFiber += record.fiber || 0;
    });
    
    // 四舍五入到小数点后1位
    Object.keys(summary).forEach(key => {
      summary[key] = Math.round(summary[key] * 10) / 10;
    });
    
    return {
      code: 0,
      data: groupedData,
      summary: summary,
      message: 'success'
    };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
