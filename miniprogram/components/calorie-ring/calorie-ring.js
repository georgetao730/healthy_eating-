// components/calorie-ring/calorie-ring.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        this.setData({
          displayCurrent: Math.round(newVal)
        });
        this.drawRing();
      }
    },
    target: {
      type: Number,
      value: 2000,
      observer: function() {
        this.drawRing();
      }
    },
    size: {
      type: Number,
      value: 200
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayCurrent: 0,
    canvasContext: null,
    dpr: 1
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    ready() {
      this.initCanvas();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化 Canvas
    initCanvas() {
      const query = this.createSelectorQuery();
      query.select('#calorieCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0]) return;
          
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          
          const size = this.properties.size;
          canvas.width = size * dpr;
          canvas.height = size * dpr;
          ctx.scale(dpr, dpr);
          
          this.setData({
            canvasContext: ctx,
            dpr: dpr
          });
          
          this.animateProgress();
        });
    },

    // 动画效果：进度从0到目标值
    animateProgress() {
      const targetCurrent = this.properties.current;
      const duration = 800; // 动画持续时间（毫秒）
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数 easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = targetCurrent * easeProgress;
        
        this.setData({
          displayCurrent: Math.round(currentValue)
        });
        
        this.drawRingWithValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    },

    // 绘制环形图
    drawRing() {
      if (!this.data.canvasContext) return;
      this.drawRingWithValue(this.properties.current);
    },

    // 根据当前值绘制环形图
    drawRingWithValue(currentValue) {
      const ctx = this.data.canvasContext;
      const size = this.properties.size;
      const target = this.properties.target;
      
      if (!ctx) return;
      
      // 清空画布
      ctx.clearRect(0, 0, size, size);
      
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = (size / 2) - 20;
      const lineWidth = 16;
      
      // 计算进度百分比
      const percentage = target > 0 ? currentValue / target : 0;
      const isExceed = percentage > 1;
      const displayPercentage = Math.min(percentage, 1);
      
      // 绘制背景圆环（灰色）
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // 绘制进度弧
      if (displayPercentage > 0) {
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (displayPercentage * 2 * Math.PI);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        
        // 超过100%时显示警告黄色，否则显示渐变色
        if (isExceed) {
          ctx.strokeStyle = '#FFD43B';
        } else {
          // 创建渐变色（粉色到绿色）
          const gradient = ctx.createLinearGradient(0, 0, size, size);
          gradient.addColorStop(0, '#F8A5B6');
          gradient.addColorStop(1, '#A8D8B9');
          ctx.strokeStyle = gradient;
        }
        
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      // 绘制进度点（装饰效果）
      if (displayPercentage > 0) {
        const angle = -Math.PI / 2 + (displayPercentage * 2 * Math.PI);
        const dotX = centerX + Math.cos(angle) * radius;
        const dotY = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, lineWidth / 2 + 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
    }
  }
});
