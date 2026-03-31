const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { startDate, endDate } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  try {
    // 查询日期范围内的所有记录
    const result = await db.collection('diet_records').where({
      _openid: openid,
      date: _.gte(startDate).and(_.lte(endDate))
    }).get();
    
    // 按日期分组汇总
    const dailyMap = new Map();
    
    result.data.forEach(record => {
      const date = record.date;
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date: date,
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
        });
      }
      
      const dayData = dailyMap.get(date);
      dayData.calories += record.calories || 0;
      dayData.protein += record.protein || 0;
      dayData.carbs += record.carbs || 0;
      dayData.fat += record.fat || 0;
      dayData.folicAcid += record.folicAcid || 0;
      dayData.calcium += record.calcium || 0;
      dayData.iron += record.iron || 0;
      dayData.dha += record.dha || 0;
      dayData.zinc += record.zinc || 0;
      dayData.vitaminC += record.vitaminC || 0;
      dayData.fiber += record.fiber || 0;
    });
    
    // 转换为数组并按日期排序
    const data = Array.from(dailyMap.values()).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    
    // 四舍五入到小数点后1位
    data.forEach(day => {
      day.calories = Math.round(day.calories * 10) / 10;
      day.protein = Math.round(day.protein * 10) / 10;
      day.carbs = Math.round(day.carbs * 10) / 10;
      day.fat = Math.round(day.fat * 10) / 10;
      day.folicAcid = Math.round(day.folicAcid * 10) / 10;
      day.calcium = Math.round(day.calcium * 10) / 10;
      day.iron = Math.round(day.iron * 10) / 10;
      day.dha = Math.round(day.dha * 10) / 10;
      day.zinc = Math.round(day.zinc * 10) / 10;
      day.vitaminC = Math.round(day.vitaminC * 10) / 10;
      day.fiber = Math.round(day.fiber * 10) / 10;
    });
    
    return {
      code: 0,
      data: data,
      message: 'success'
    };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
