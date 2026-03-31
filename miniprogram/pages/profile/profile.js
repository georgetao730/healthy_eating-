const { calculatePregnancyWeek, getTodayString } = require('../../utils/util');
const { getPregnancyStage } = require('../../utils/pregnancy-standards');

Page({
  data: {
    isLoggedIn: false,
    userInfo: {
      nickName: '准妈妈',
      avatarUrl: '',
      dueDate: '',
      height: '',
      prePregnancyWeight: ''
    },
    pregnancyWeek: 0,
    pregnancyDay: 0,
    stageName: '',
    hasDueDate: false,
    version: '1.0.0'
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    // 从本地缓存读取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
      if (userInfo.dueDate) {
        const weekInfo = calculatePregnancyWeek(userInfo.dueDate);
        this.setData({
          hasDueDate: true,
          pregnancyWeek: weekInfo.week,
          pregnancyDay: weekInfo.day,
          stageName: getPregnancyStage(weekInfo.week)
        });
      }
    }
  },

  // 微信登录
  onLogin() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      const result = res.result;
      if (result.code === 0) {
        const userInfo = result.userInfo || {
          nickName: '准妈妈',
          avatarUrl: '',
          dueDate: '',
          height: '',
          prePregnancyWeight: ''
        };
        userInfo._openid = result.openid;
        wx.setStorageSync('userInfo', userInfo);
        wx.setStorageSync('openid', result.openid);
        this.setData({ isLoggedIn: true, userInfo });
      }
    });
  },

  // 设置预产期
  onDueDateChange(e) {
    const dueDate = e.detail.value;
    const userInfo = { ...this.data.userInfo, dueDate };
    this.updateUserInfo(userInfo);
    
    const weekInfo = calculatePregnancyWeek(dueDate);
    this.setData({
      hasDueDate: true,
      pregnancyWeek: weekInfo.week,
      pregnancyDay: weekInfo.day,
      stageName: getPregnancyStage(weekInfo.week)
    });
  },

  // 设置身高
  onHeightChange(e) {
    const height = Number(e.detail.value);
    if (height > 0) {
      const userInfo = { ...this.data.userInfo, height };
      this.updateUserInfo(userInfo);
    }
  },

  // 设置体重
  onWeightChange(e) {
    const weight = Number(e.detail.value);
    if (weight > 0) {
      const userInfo = { ...this.data.userInfo, prePregnancyWeight: weight };
      this.updateUserInfo(userInfo);
    }
  },

  // 更新用户信息到云数据库和本地缓存
  updateUserInfo(userInfo) {
    this.setData({ userInfo });
    wx.setStorageSync('userInfo', userInfo);
    
    // 同步到云数据库
    const db = wx.cloud.database();
    db.collection('users').where({
      _openid: userInfo._openid
    }).update({
      data: {
        dueDate: userInfo.dueDate,
        height: userInfo.height,
        prePregnancyWeight: userInfo.prePregnancyWeight
      }
    }).then(() => {
      wx.showToast({ title: '保存成功', icon: 'success' });
    }).catch(err => {
      console.error('保存失败:', err);
      wx.showToast({ title: '已保存到本地', icon: 'none' });
    });
  },

  // 跳转饿了么
  goToEleme() {
    wx.navigateToMiniProgram({
      appId: 'wxece3a9a4c82f58c9',
      fail: () => { wx.showToast({ title: '跳转失败', icon: 'none' }); }
    });
  },

  // 跳转美团
  goToMeituan() {
    wx.navigateToMiniProgram({
      appId: 'wx23d90a0f4006e626',
      fail: () => { wx.showToast({ title: '跳转失败', icon: 'none' }); }
    });
  },

  // 导出数据
  exportData() {
    wx.showLoading({ title: '导出中...' });
    // 获取所有记录，格式化为文本，复制到剪贴板
    const db = wx.cloud.database();
    db.collection('diet_records').where({
      _openid: wx.getStorageSync('openid')
    }).orderBy('date', 'desc').limit(100).get().then(res => {
      const records = res.data;
      let text = '孕期饮食记录导出\n\n';
      records.forEach(r => {
        text += `${r.date} ${r.mealType} ${r.foodName} ${r.amount}g ${r.calories}千卡\n`;
      });
      wx.setClipboardData({
        data: text,
        success: () => {
          wx.hideLoading();
          wx.showToast({ title: '已复制到剪贴板' });
        }
      });
    }).catch(() => {
      wx.hideLoading();
      wx.showToast({ title: '导出失败', icon: 'none' });
    });
  },

  // 清除数据
  clearData() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有饮食记录吗？此操作不可恢复。',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          // 清除云数据库记录和本地缓存
          wx.showLoading({ title: '清除中...' });
          // 注：小程序端无法批量删除，需要通过云函数
          // 这里简单处理，清除本地缓存
          wx.removeStorageSync('userInfo');
          wx.hideLoading();
          wx.showToast({ title: '已清除' });
          this.setData({
            isLoggedIn: false,
            userInfo: { nickName: '准妈妈', avatarUrl: '', dueDate: '', height: '', prePregnancyWeight: '' },
            hasDueDate: false
          });
        }
      }
    });
  }
});
