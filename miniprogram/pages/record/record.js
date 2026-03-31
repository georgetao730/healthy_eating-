const { getTodayString, formatDate } = require('../../utils/util');

Page({
  data: {
    currentDate: '',        // 当前选中日期 YYYY-MM-DD
    currentDateDisplay: '', // 显示用 MM月DD日
    mealTypes: [
      { key: 'breakfast', name: '早餐', icon: '🌅' },
      { key: 'lunch', name: '午餐', icon: '☀️' },
      { key: 'dinner', name: '晚餐', icon: '🌙' },
      { key: 'snack', name: '加餐', icon: '🍪' }
    ],
    currentMeal: 'breakfast',
    records: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    },
    mealCalories: { breakfast: 0, lunch: 0, dinner: 0, snack: 0 },
    totalCalories: 0
  },

  onLoad() {
    // 初始化日期
    const today = getTodayString();
    this.setData({
      currentDate: today,
      currentDateDisplay: this.formatDateDisplay(today)
    });
  },

  onShow() {
    this.loadRecords();
  },

  // 格式化日期显示
  formatDateDisplay(dateStr) {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },

  // 加载饮食记录
  loadRecords() {
    wx.showLoading({ title: '加载中...' });
    
    wx.cloud.callFunction({
      name: 'getDailyRecord',
      data: { date: this.data.currentDate }
    }).then(res => {
      wx.hideLoading();
      
      if (res.result && res.result.code === 0) {
        const records = res.result.data || {};
        const mealCalories = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
        let totalCalories = 0;

        // 计算各餐次卡路里
        Object.keys(records).forEach(mealType => {
          const mealRecords = records[mealType] || [];
          let mealTotal = 0;
          mealRecords.forEach(record => {
            mealTotal += record.calories || 0;
          });
          mealCalories[mealType] = Math.round(mealTotal);
          totalCalories += mealTotal;
        });

        this.setData({
          records: {
            breakfast: records.breakfast || [],
            lunch: records.lunch || [],
            dinner: records.dinner || [],
            snack: records.snack || []
          },
          mealCalories,
          totalCalories: Math.round(totalCalories)
        });
      }
    }).catch(err => {
      wx.hideLoading();
      console.error('加载记录失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    });
  },

  // 切换餐次
  switchMeal(e) {
    const meal = e.currentTarget.dataset.meal;
    this.setData({ currentMeal: meal });
  },

  // 前一天
  prevDate() {
    const current = new Date(this.data.currentDate);
    current.setDate(current.getDate() - 1);
    const newDate = formatDate(current, 'YYYY-MM-DD');
    this.setData({
      currentDate: newDate,
      currentDateDisplay: this.formatDateDisplay(newDate)
    });
    this.loadRecords();
  },

  // 后一天
  nextDate() {
    const current = new Date(this.data.currentDate);
    current.setDate(current.getDate() + 1);
    const newDate = formatDate(current, 'YYYY-MM-DD');
    this.setData({
      currentDate: newDate,
      currentDateDisplay: this.formatDateDisplay(newDate)
    });
    this.loadRecords();
  },

  // 日期选择器
  pickDate(e) {
    const newDate = e.detail.value;
    this.setData({
      currentDate: newDate,
      currentDateDisplay: this.formatDateDisplay(newDate)
    });
    this.loadRecords();
  },

  // 删除记录
  deleteRecord(e) {
    const record = e.detail.food;
    wx.showModal({
      title: '确认删除',
      content: `确定删除 ${record.foodName} 吗？`,
      success: (res) => {
        if (res.confirm) {
          this.doDeleteRecord(record);
        }
      }
    });
  },

  // 执行删除
  doDeleteRecord(record) {
    wx.showLoading({ title: '删除中...' });
    
    wx.cloud.callFunction({
      name: 'saveDietRecord',
      data: {
        action: 'delete',
        date: this.data.currentDate,
        mealType: this.data.currentMeal,
        recordId: record._id || record.id
      }
    }).then(() => {
      wx.hideLoading();
      wx.showToast({ title: '删除成功', icon: 'success' });
      this.loadRecords();
    }).catch(err => {
      wx.hideLoading();
      console.error('删除失败:', err);
      wx.showToast({ title: '删除失败', icon: 'none' });
    });
  },

  // 跳转到添加页面
  goToAdd() {
    wx.navigateTo({
      url: '/pages/record-add/record-add?meal=' + this.data.currentMeal + '&date=' + this.data.currentDate
    });
  }
});
