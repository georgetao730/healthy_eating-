// components/food-card/food-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    food: {
      type: Object,
      value: {
        foodName: '',
        amount: 0,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    },
    showDelete: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    offsetX: 0,
    startX: 0,
    startY: 0,
    isMoving: false,
    isOpen: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触摸开始
    touchStart(e) {
      if (!this.properties.showDelete) return;
      
      const touch = e.touches[0];
      this.setData({
        startX: touch.clientX,
        startY: touch.clientY,
        isMoving: false
      });
    },

    // 触摸移动
    touchMove(e) {
      if (!this.properties.showDelete) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.data.startX;
      const deltaY = touch.clientY - this.data.startY;
      
      // 判断滑动方向，如果是垂直滑动则不处理
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      
      // 阻止默认滚动行为
      if (Math.abs(deltaX) > 10) {
        this.setData({ isMoving: true });
      }
      
      // 限制滑动范围
      let offsetX = 0;
      if (this.data.isOpen) {
        // 已经打开，只能向右滑动关闭
        offsetX = Math.max(-140, Math.min(0, -140 + deltaX));
      } else {
        // 未打开，只能向左滑动打开
        offsetX = Math.max(-140, Math.min(0, deltaX));
      }
      
      this.setData({
        offsetX: offsetX
      });
    },

    // 触摸结束
    touchEnd(e) {
      if (!this.properties.showDelete) return;
      
      const offsetX = this.data.offsetX;
      
      // 根据滑动距离判断是否打开或关闭
      if (this.data.isOpen) {
        // 当前是打开状态
        if (offsetX > -100) {
          // 滑动距离不够，保持打开
          this.setData({
            offsetX: -140,
            isOpen: true
          });
        } else {
          // 关闭
          this.setData({
            offsetX: 0,
            isOpen: false
          });
        }
      } else {
        // 当前是关闭状态
        if (offsetX < -60) {
          // 滑动距离足够，打开
          this.setData({
            offsetX: -140,
            isOpen: true
          });
        } else {
          // 关闭
          this.setData({
            offsetX: 0,
            isOpen: false
          });
        }
      }
    },

    // 点击卡片
    onTap(e) {
      // 如果正在滑动，不触发点击
      if (this.data.isMoving) {
        this.setData({ isMoving: false });
        return;
      }
      
      // 如果已经打开，点击关闭
      if (this.data.isOpen) {
        this.setData({
          offsetX: 0,
          isOpen: false
        });
        return;
      }
      
      // 触发点击事件
      this.triggerEvent('tap', {
        food: this.properties.food
      });
    },

    // 删除按钮点击
    onDelete(e) {
      // 阻止冒泡
      e.stopPropagation && e.stopPropagation();
      
      // 先关闭滑动
      this.setData({
        offsetX: 0,
        isOpen: false
      });
      
      // 触发删除事件
      this.triggerEvent('delete', {
        food: this.properties.food
      });
    }
  }
});
