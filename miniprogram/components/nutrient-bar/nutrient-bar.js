// components/nutrient-bar/nutrient-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '营养素'
    },
    current: {
      type: Number,
      value: 0,
      observer: function() {
        this.calculateStatus();
      }
    },
    target: {
      type: Number,
      value: 100,
      observer: function() {
        this.calculateStatus();
      }
    },
    unit: {
      type: String,
      value: '克'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayPercentage: 0,
    currentDisplay: 0,
    statusColor: '#FF6B6B'
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      this.calculateStatus();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 计算状态和显示值
    calculateStatus() {
      const current = this.properties.current;
      const target = this.properties.target;
      
      // 计算百分比
      const percentage = target > 0 ? (current / target) * 100 : 0;
      const displayPercentage = Math.min(percentage, 100);
      
      // 确定状态颜色
      // < 80% 红色（不足）
      // 80%-120% 绿色（适量）
      // > 120% 黄色（过量）
      let statusColor;
      if (percentage < 80) {
        statusColor = '#FF6B6B'; // 红色 - 不足
      } else if (percentage > 120) {
        statusColor = '#FFD43B'; // 黄色 - 过量
      } else {
        statusColor = '#51CF66'; // 绿色 - 适量
      }
      
      // 格式化当前值显示
      const currentDisplay = this.formatNumber(current);
      
      this.setData({
        displayPercentage: displayPercentage,
        currentDisplay: currentDisplay,
        statusColor: statusColor
      });
    },

    // 格式化数字，保留合适的小数位
    formatNumber(num) {
      if (num === 0) return '0';
      if (num >= 100) {
        return Math.round(num).toString();
      } else if (num >= 10) {
        return num.toFixed(1);
      } else {
        return num.toFixed(2);
      }
    }
  }
});
