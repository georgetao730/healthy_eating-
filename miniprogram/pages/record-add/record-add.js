const { searchFoods, getAllFoods, getFoodsByCategory, getFoodById } = require('../../utils/food-database');
const { calculateNutrition } = require('../../utils/nutrition-calc');
const { getTodayString } = require('../../utils/util');

Page({
  data: {
    keyword: '',
    category: 'all',
    categories: [
      { key: 'all', name: '全部' },
      { key: 'staple', name: '主食' },
      { key: 'meat', name: '肉蛋' },
      { key: 'vegetable', name: '蔬菜' },
      { key: 'fruit', name: '水果' },
      { key: 'soup', name: '汤品' },
      { key: 'dairy', name: '乳制品' },
      { key: 'nut', name: '坚果' }
    ],
    foodList: [],
    selectedFood: null,
    amount: 100,
    quickAmounts: [50, 100, 150, 200, 250, 300],
    previewNutrition: null,
    mealType: 'breakfast',
    date: '',
    showDetail: false,
    mealTypes: [
      { key: 'breakfast', name: '早餐', icon: '🌅' },
      { key: 'lunch', name: '午餐', icon: '☀️' },
      { key: 'dinner', name: '晚餐', icon: '🌙' },
      { key: 'snack', name: '加餐', icon: '🍪' }
    ]
  },

  onLoad(options) {
    this.setData({
      mealType: options.meal || 'breakfast',
      date: options.date || getTodayString(),
      foodList: getAllFoods()
    });
    
    if (options.foodId) {
      const food = getFoodById(Number(options.foodId));
      if (food) {
        const preview = calculateNutrition(food, this.data.amount);
        this.setData({ selectedFood: food, previewNutrition: preview, showDetail: true });
      }
    }
  },

  // 搜索食物
  onSearch(e) {
    const keyword = e.detail.value;
    let list;
    if (keyword) {
      list = searchFoods(keyword);
    } else if (this.data.category !== 'all') {
      list = getFoodsByCategory(this.data.category);
    } else {
      list = getAllFoods();
    }
    this.setData({ keyword, foodList: list });
  },

  // 清除搜索
  clearSearch() {
    let list;
    if (this.data.category !== 'all') {
      list = getFoodsByCategory(this.data.category);
    } else {
      list = getAllFoods();
    }
    this.setData({ keyword: '', foodList: list });
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    let list = category === 'all' ? getAllFoods() : getFoodsByCategory(category);
    if (this.data.keyword) {
      list = list.filter(f => f.name.includes(this.data.keyword));
    }
    this.setData({ category, foodList: list });
  },

  // 选择食物
  selectFood(e) {
    const food = e.currentTarget.dataset.food;
    const preview = calculateNutrition(food, this.data.amount);
    this.setData({ selectedFood: food, previewNutrition: preview, showDetail: true });
  },

  // 修改份量
  changeAmount(e) {
    const amount = Number(e.detail.value) || 100;
    if (this.data.selectedFood) {
      const preview = calculateNutrition(this.data.selectedFood, amount);
      this.setData({ amount, previewNutrition: preview });
    } else {
      this.setData({ amount });
    }
  },

  // 快捷设置份量
  quickSetAmount(e) {
    const amount = e.currentTarget.dataset.amount;
    if (this.data.selectedFood) {
      const preview = calculateNutrition(this.data.selectedFood, amount);
      this.setData({ amount, previewNutrition: preview });
    } else {
      this.setData({ amount });
    }
  },

  // 选择餐次类型
  selectMealType(e) {
    this.setData({ mealType: e.currentTarget.dataset.meal });
  },

  // 保存记录
  saveRecord() {
    const { selectedFood, amount, previewNutrition, mealType, date } = this.data;
    
    if (!selectedFood) {
      wx.showToast({ title: '请选择食物', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });

    wx.cloud.callFunction({
      name: 'saveDietRecord',
      data: {
        action: 'add',
        date,
        mealType,
        foodName: selectedFood.name,
        amount,
        ...previewNutrition
      }
    }).then(() => {
      wx.hideLoading();
      wx.showToast({ title: '记录成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 1000);
    }).catch(err => {
      wx.hideLoading();
      console.error('保存失败:', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    });
  },

  // 关闭详情弹窗
  closeDetail() {
    this.setData({ showDetail: false, selectedFood: null });
  }
});
