const app = getApp();
const { calculatePregnancyWeek, getTodayString, showLoading, hideLoading } = require('../../utils/util');
const { getStandardByWeek, getPregnancyStage, getNutrientName, getNutrientUnit } = require('../../utils/pregnancy-standards');
const { summarizeDailyNutrition } = require('../../utils/nutrition-calc');

Page({
  data: {
    // 孕周信息
    pregnancyWeek: 0,
    pregnancyDay: 0,
    stageName: '',
    hasDueDate: false,
    
    // 卡路里数据
    todayCalories: 0,
    targetCalories: 2100,
    
    // 营养素数据
    nutrients: [],
    
    // 快捷入口配置
    quickEntries: [
      { name: '记录饮食', icon: '📝', color: '#F8A5B6', action: 'goToRecord' },
      { name: '转盘决策', icon: '🎯', color: '#A8D8B9', action: 'goToWheel' },
      { name: '饿了么', icon: '🍔', color: '#0085FF', action: 'goToEleme' },
      { name: '美团', icon: '🛵', color: '#FFD100', action: 'goToMeituan' }
    ]
  },

  onLoad: function () {
    console.log('首页加载');
  },

  onShow: function () {
    // 页面显示时加载数据
    this.loadUserInfo();
    this.loadTodayData();
  },

  // 加载用户信息（预产期、孕周等）
  loadUserInfo() {
    // 先从本地缓存读取
    const userInfo = wx.getStorageSync('userInfo');
    
    if (userInfo && userInfo.dueDate) {
      // 计算孕周
      const pregnancyInfo = calculatePregnancyWeek(userInfo.dueDate);
      
      if (pregnancyInfo.isValid) {
        const stageName = getPregnancyStage(pregnancyInfo.week);
        const standard = getStandardByWeek(pregnancyInfo.week);
        
        this.setData({
          pregnancyWeek: pregnancyInfo.week,
          pregnancyDay: pregnancyInfo.day,
          stageName: stageName,
          hasDueDate: true,
          targetCalories: standard ? standard.calories : 2100
        });
      } else {
        this.setData({
          hasDueDate: false
        });
      }
    } else {
      // 本地没有，尝试从云数据库获取
      this.fetchUserInfoFromCloud();
    }
  },

  // 从云数据库获取用户信息
  fetchUserInfoFromCloud() {
    const openid = wx.getStorageSync('openid');
    
    if (!openid) {
      this.setData({ hasDueDate: false });
      return;
    }

    const db = wx.cloud.database();
    db.collection('users').where({
      _openid: openid
    }).get().then(res => {
      if (res.data && res.data.length > 0) {
        const userData = res.data[0];
        
        if (userData.dueDate) {
          // 保存到本地缓存
          wx.setStorageSync('userInfo', userData);
          
          // 计算孕周
          const pregnancyInfo = calculatePregnancyWeek(userData.dueDate);
          
          if (pregnancyInfo.isValid) {
            const stageName = getPregnancyStage(pregnancyInfo.week);
            const standard = getStandardByWeek(pregnancyInfo.week);
            
            this.setData({
              pregnancyWeek: pregnancyInfo.week,
              pregnancyDay: pregnancyInfo.day,
              stageName: stageName,
              hasDueDate: true,
              targetCalories: standard ? standard.calories : 2100
            });
          }
        } else {
          this.setData({ hasDueDate: false });
        }
      } else {
        this.setData({ hasDueDate: false });
      }
    }).catch(err => {
      console.error('获取用户信息失败:', err);
      this.setData({ hasDueDate: false });
    });
  },

  // 加载今天的饮食数据
  loadTodayData() {
    showLoading();
    
    const today = getTodayString();
    const openid = wx.getStorageSync('openid');
    
    // 调用云函数获取今天的饮食记录
    wx.cloud.callFunction({
      name: 'getDailyRecord',
      data: {
        date: today,
        openid: openid || undefined
      }
    }).then(res => {
      hideLoading();
      
      if (res.result && res.result.code === 0) {
        const records = res.result.data || [];
        
        // 汇总营养数据
        const nutritionSummary = summarizeDailyNutrition(records.map(r => ({
          food: r.food,
          amount: r.amount
        })));
        
        // 获取当前孕周的标准
        const standard = getStandardByWeek(this.data.pregnancyWeek) || {
          protein: 55,
          carbs: 300,
          fat: 60,
          folicAcid: 600,
          calcium: 800,
          iron: 20,
          dha: 200
        };
        
        // 构建营养素列表
        const nutrients = [
          { name: '蛋白质', current: nutritionSummary.protein, target: standard.protein, unit: '克' },
          { name: '碳水化合物', current: nutritionSummary.carbs, target: standard.carbs, unit: '克' },
          { name: '脂肪', current: nutritionSummary.fat, target: standard.fat, unit: '克' },
          { name: '叶酸', current: nutritionSummary.folicAcid, target: standard.folicAcid, unit: '微克' },
          { name: '钙', current: nutritionSummary.calcium, target: standard.calcium, unit: '毫克' },
          { name: '铁', current: nutritionSummary.iron, target: standard.iron, unit: '毫克' },
          { name: 'DHA', current: nutritionSummary.dha, target: standard.dha, unit: '毫克' }
        ];
        
        this.setData({
          todayCalories: nutritionSummary.calories,
          nutrients: nutrients
        });
      } else {
        // 没有记录或出错，显示0
        this.setData({
          todayCalories: 0,
          nutrients: this.getEmptyNutrients()
        });
      }
    }).catch(err => {
      hideLoading();
      console.error('获取今日数据失败:', err);
      
      // 出错时显示空数据
      this.setData({
        todayCalories: 0,
        nutrients: this.getEmptyNutrients()
      });
    });
  },

  // 获取空的营养素数据（用于默认值）
  getEmptyNutrients() {
    const standard = getStandardByWeek(this.data.pregnancyWeek) || {
      protein: 55,
      carbs: 300,
      fat: 60,
      folicAcid: 600,
      calcium: 800,
      iron: 20,
      dha: 200
    };
    
    return [
      { name: '蛋白质', current: 0, target: standard.protein, unit: '克' },
      { name: '碳水化合物', current: 0, target: standard.carbs, unit: '克' },
      { name: '脂肪', current: 0, target: standard.fat, unit: '克' },
      { name: '叶酸', current: 0, target: standard.folicAcid, unit: '微克' },
      { name: '钙', current: 0, target: standard.calcium, unit: '毫克' },
      { name: '铁', current: 0, target: standard.iron, unit: '毫克' },
      { name: 'DHA', current: 0, target: standard.dha, unit: '毫克' }
    ];
  },

  // 跳转到记录饮食页面
  goToRecord() {
    wx.navigateTo({
      url: '/pages/record-add/record-add'
    });
  },

  // 跳转到转盘决策页面（switchTab）
  goToWheel() {
    wx.switchTab({
      url: '/pages/wheel/wheel'
    });
  },

  // 打开饿了么小程序
  goToEleme() {
    wx.navigateToMiniProgram({
      appId: 'wxece3a9a4c82f58c9',
      success: function() {
        console.log('打开饿了么成功');
      },
      fail: function(err) {
        console.error('打开饿了么失败:', err);
        wx.showToast({
          title: '打开失败',
          icon: 'none'
        });
      }
    });
  },

  // 打开美团小程序
  goToMeituan() {
    wx.navigateToMiniProgram({
      appId: 'wx23d90a0f4006e626',
      success: function() {
        console.log('打开美团成功');
      },
      fail: function(err) {
        console.error('打开美团失败:', err);
        wx.showToast({
          title: '打开失败',
          icon: 'none'
        });
      }
    });
  },

  // 跳转到个人中心
  goToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  // 处理快捷入口点击
  onQuickEntryTap(e) {
    const action = e.currentTarget.dataset.action;
    
    switch (action) {
      case 'goToRecord':
        this.goToRecord();
        break;
      case 'goToWheel':
        this.goToWheel();
        break;
      case 'goToEleme':
        this.goToEleme();
        break;
      case 'goToMeituan':
        this.goToMeituan();
        break;
    }
  }
});
