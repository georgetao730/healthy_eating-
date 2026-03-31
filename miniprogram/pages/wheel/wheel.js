const { getRandomFoodsByCategory, getAllFoods } = require('../../utils/food-database');

Page({
  data: {
    categories: [
      { key: 'all', name: '全部' },
      { key: 'staple', name: '主食' },
      { key: 'meat', name: '肉蛋' },
      { key: 'vegetable', name: '蔬菜' },
      { key: 'fruit', name: '水果' },
      { key: 'soup', name: '汤品' }
    ],
    currentCategory: 'all',
    wheelItems: [],       // 转盘选项 [{name, color}]
    wheelFoods: [],       // 转盘对应的完整食物数据
    spinning: false,
    showResult: false,
    resultFood: null,     // 选中的食物完整数据
  },

  onLoad() {
    this.refreshWheel();
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category });
    this.refreshWheel();
  },

  refreshWheel() {
    const category = this.data.currentCategory;
    const count = 8; // 转盘8个选项
    const colors = ['#F8A5B6', '#A8D8B9', '#FFD8A8', '#A5D8F8', '#D8A5F8', '#F8D8A5', '#A5F8D8', '#F8A5D8'];

    let foods;
    if (category === 'all') {
      // 从所有食物中随机取
      const all = getAllFoods();
      foods = this.getRandomItems(all, count);
    } else {
      foods = getRandomFoodsByCategory(category, count);
    }

    const wheelItems = foods.map((f, i) => ({
      name: f.name,
      color: colors[i % colors.length]
    }));

    this.setData({ wheelItems, wheelFoods: foods });
  },

  getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  },

  onWheelResult(e) {
    // lucky-wheel 组件触发的结果事件
    const index = e.detail.index;
    const food = this.data.wheelFoods[index];
    this.setData({
      spinning: false,
      showResult: true,
      resultFood: food
    });
  },

  closeResult() {
    this.setData({ showResult: false, resultFood: null });
  },

  goToRecord() {
    const food = this.data.resultFood;
    // 跳转到添加记录页，通过页面间通信传递食物数据
    wx.navigateTo({
      url: `/pages/record-add/record-add?foodId=${food.id}&foodName=${food.name}`
    });
    this.closeResult();
  },

  goToEleme() {
    wx.navigateToMiniProgram({ appId: 'wxece3a9a4c82f58c9' });
  },

  goToMeituan() {
    wx.navigateToMiniProgram({ appId: 'wx23d90a0f4006e626' });
  },

  spinAgain() {
    this.closeResult();
  },

  preventBubble() {
    // 阻止事件冒泡，用于弹窗内容区域
  }
});
