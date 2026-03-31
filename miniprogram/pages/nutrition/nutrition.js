const { getTodayString, calculatePregnancyWeek } = require('../../utils/util');
const { getStandardByWeek, getPregnancyStage } = require('../../utils/pregnancy-standards');
const { getNutrientStatus } = require('../../utils/nutrition-calc');

Page({
  data: {
    today: '',
    stageName: '',
    standard: null,       // 当前孕期推荐标准
    totalCalories: 0,
    calorieStatus: '',
    macroNutrients: [],   // 宏量营养素 [{name, current, target, unit}]
    microNutrients: [],   // 微量营养素
    suggestions: [],      // 营养建议数组
    weeklyData: [],       // 近7天数据 [{date, shortDate, calories, percentage}]
    maxWeeklyCalories: 0, // 7天中最高卡路里（用于柱状图比例）
    targetLinePosition: 0, // 推荐值虚线位置
  },
  
  onShow() {
    this.loadData();
  },
  
  loadData() {
    const today = getTodayString();
    
    // 1. 获取用户信息和孕周
    const userInfo = wx.getStorageSync('userInfo');
    let week = 20; // 默认值
    let stageName = '孕中期';
    if (userInfo && userInfo.dueDate) {
      const weekInfo = calculatePregnancyWeek(userInfo.dueDate);
      week = weekInfo.week;
      stageName = getPregnancyStage(week);
    }
    const standard = getStandardByWeek(week);
    
    // 2. 获取今日数据
    wx.cloud.callFunction({
      name: 'getDailyRecord',
      data: { date: today }
    }).then(res => {
      const summary = res.result.summary || {};
      this.processNutrientData(summary, standard, stageName, today);
    });
    
    // 3. 获取近7天数据
    const endDate = today;
    const startDate = this.getDateBefore(6);
    wx.cloud.callFunction({
      name: 'getNutritionReport',
      data: { startDate, endDate }
    }).then(res => {
      this.processWeeklyData(res.result.data || [], standard);
    });
  },
  
  processNutrientData(summary, standard, stageName, today) {
    // 宏量营养素配置
    const macroConfig = [
      { key: 'protein', name: '蛋白质', unit: '克' },
      { key: 'carbs', name: '碳水化合物', unit: '克' },
      { key: 'fat', name: '脂肪', unit: '克' }
    ];
    
    // 微量营养素配置
    const microConfig = [
      { key: 'folicAcid', name: '叶酸', unit: '微克' },
      { key: 'calcium', name: '钙', unit: '毫克' },
      { key: 'iron', name: '铁', unit: '毫克' },
      { key: 'dha', name: 'DHA', unit: '毫克' },
      { key: 'zinc', name: '锌', unit: '毫克' },
      { key: 'vitaminC', name: '维生素C', unit: '毫克' },
      { key: 'fiber', name: '膳食纤维', unit: '克' }
    ];
    
    // 组装宏量营养素数据
    const macroNutrients = macroConfig.map(item => ({
      name: item.name,
      current: summary[item.key] || 0,
      target: standard[item.key] || 0,
      unit: item.unit
    }));
    
    // 组装微量营养素数据
    const microNutrients = microConfig.map(item => ({
      name: item.name,
      current: summary[item.key] || 0,
      target: standard[item.key] || 0,
      unit: item.unit
    }));
    
    // 计算卡路里状态
    const totalCalories = summary.calories || 0;
    const calorieStatus = getNutrientStatus(totalCalories, standard.calories);
    
    // 生成营养建议
    const suggestions = this.generateSuggestions(summary, standard);
    
    this.setData({
      today,
      stageName,
      standard,
      totalCalories,
      calorieStatus,
      macroNutrients,
      microNutrients,
      suggestions
    });
  },
  
  processWeeklyData(data, standard) {
    const today = new Date();
    const weeklyData = [];
    
    // 生成最近7天的日期数组（包括今天）
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const shortDate = `${d.getMonth() + 1}/${d.getDate()}`;
      
      // 查找对应日期的数据
      const dayData = data.find(item => item.date === dateStr);
      const calories = dayData ? (dayData.calories || 0) : 0;
      
      weeklyData.push({
        date: dateStr,
        shortDate,
        calories: Math.round(calories),
        percentage: 0 // 稍后计算
      });
    }
    
    // 找出最大值用于计算比例（至少为推荐值的1.5倍，确保柱子不会太高）
    const maxCalories = Math.max(...weeklyData.map(d => d.calories), standard.calories * 1.2);
    
    // 计算每个柱子的百分比高度（最高为100%）
    weeklyData.forEach(item => {
      item.percentage = maxCalories > 0 ? (item.calories / maxCalories) * 100 : 0;
      item.barColor = item.calories > standard.calories * 1.2 ? '#FFD43B' : 
                      item.calories < standard.calories * 0.8 ? '#FF6B6B' : '#51CF66';
    });
    
    // 计算推荐值虚线位置
    const targetLinePosition = maxCalories > 0 ? (standard.calories / maxCalories) * 100 : 0;
    
    this.setData({
      weeklyData,
      maxWeeklyCalories: Math.round(maxCalories),
      targetLinePosition
    });
  },
  
  generateSuggestions(summary, standard) {
    const suggestions = [];
    
    const nutrientAdvice = {
      protein: { name: '蛋白质', advice: '建议多吃鸡蛋、鱼肉、豆制品', foods: ['鸡蛋', '鱼肉', '豆腐'] },
      carbs: { name: '碳水化合物', advice: '建议适量摄入全谷物、燕麦、红薯', foods: ['燕麦', '红薯', '糙米'] },
      fat: { name: '脂肪', advice: '建议选择健康油脂，如橄榄油、坚果', foods: ['橄榄油', '核桃', '牛油果'] },
      folicAcid: { name: '叶酸', advice: '建议多吃菠菜、西兰花等深色蔬菜', foods: ['菠菜', '西兰花', '芦笋'] },
      calcium: { name: '钙', advice: '建议多喝牛奶、吃豆腐、小鱼干', foods: ['牛奶', '豆腐', '芝麻'] },
      iron: { name: '铁', advice: '建议多吃红肉、猪肝、黑木耳', foods: ['牛肉', '猪肝', '红枣'] },
      dha: { name: 'DHA', advice: '建议多吃三文鱼、核桃等', foods: ['三文鱼', '核桃', '亚麻籽'] },
      zinc: { name: '锌', advice: '建议多吃牡蛎、瘦肉、南瓜籽', foods: ['牡蛎', '瘦肉', '南瓜籽'] },
      vitaminC: { name: '维生素C', advice: '建议多吃柑橘、猕猴桃、青椒', foods: ['橙子', '猕猴桃', '青椒'] },
      fiber: { name: '膳食纤维', advice: '建议多吃粗粮、蔬菜、水果', foods: ['燕麦', '芹菜', '苹果'] }
    };
    
    // 检查各营养素状态，生成建议
    Object.keys(nutrientAdvice).forEach(key => {
      const current = summary[key] || 0;
      const target = standard[key] || 0;
      const percentage = target > 0 ? (current / target) * 100 : 0;
      
      if (percentage < 80) {
        // 不足
        suggestions.push({
          type: 'insufficient',
          icon: '⚠️',
          color: '#FF6B6B',
          text: `${nutrientAdvice[key].name}摄入不足，${nutrientAdvice[key].advice}`
        });
      } else if (percentage > 120) {
        // 过量
        suggestions.push({
          type: 'excessive',
          icon: '💡',
          color: '#FFD43B',
          text: `${nutrientAdvice[key].name}摄入略多，建议适当控制`
        });
      }
    });
    
    // 卡路里特殊处理
    const caloriePercentage = standard.calories > 0 ? ((summary.calories || 0) / standard.calories) * 100 : 0;
    if (caloriePercentage < 80) {
      suggestions.unshift({
        type: 'insufficient',
        icon: '🍽️',
        color: '#FF6B6B',
        text: '今日热量摄入不足，建议适当增加主食或加餐'
      });
    } else if (caloriePercentage > 120) {
      suggestions.unshift({
        type: 'excessive',
        icon: '⚖️',
        color: '#FFD43B',
        text: '今日热量摄入略多，建议适当控制食量'
      });
    }
    
    // 最多显示4条建议
    return suggestions.slice(0, 4);
  },
  
  getDateBefore(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
});
