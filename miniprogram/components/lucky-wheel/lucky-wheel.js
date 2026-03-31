// components/lucky-wheel/lucky-wheel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: [
        { name: '苹果', color: '#F8A5B6' },
        { name: '香蕉', color: '#A8D8B9' },
        { name: '橙子', color: '#FFD8A8' },
        { name: '葡萄', color: '#A5D8F8' },
        { name: '草莓', color: '#D8A5F8' },
        { name: '西瓜', color: '#F8D8A5' }
      ],
      observer: function() {
        this.drawWheel();
      }
    },
    spinning: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasContext: null,
    dpr: 1,
    currentRotation: 0,
    isSpinning: false,
    defaultColors: ['#F8A5B6', '#A8D8B9', '#FFD8A8', '#A5D8F8', '#D8A5F8', '#F8D8A5', '#A5F8D8', '#F8A5D8']
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
      query.select('#wheelCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0]) return;
          
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          
          // 设置画布尺寸（600rpx 转换为像素）
          const size = 300; // 300px = 600rpx (在2倍屏下)
          canvas.width = size * 2 * dpr;
          canvas.height = size * 2 * dpr;
          ctx.scale(dpr, dpr);
          
          this.setData({
            canvasContext: ctx,
            dpr: dpr
          });
          
          this.drawWheel();
        });
    },

    // 绘制转盘
    drawWheel(rotation = 0) {
      const ctx = this.data.canvasContext;
      if (!ctx) return;

      const items = this.properties.items;
      if (!items || items.length === 0) return;

      const size = 600; // rpx 单位下的尺寸
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 20;
      const anglePerItem = (2 * Math.PI) / items.length;

      // 清空画布
      ctx.clearRect(0, 0, size, size);

      // 保存当前状态
      ctx.save();
      
      // 应用旋转（转换为中心点旋转）
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.translate(-centerX, -centerY);

      // 绘制每个扇区
      items.forEach((item, index) => {
        const startAngle = index * anglePerItem - Math.PI / 2;
        const endAngle = (index + 1) * anglePerItem - Math.PI / 2;
        
        // 获取颜色
        const color = item.color || this.data.defaultColors[index % this.data.defaultColors.length];
        
        // 绘制扇区
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        
        // 绘制边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // 绘制文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerItem / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24rpx sans-serif';
        ctx.fillText(item.name, radius * 0.65, 0);
        ctx.restore();
      });

      // 恢复状态
      ctx.restore();

      // 绘制中心圆
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 4;
      ctx.stroke();
    },

    // 开始旋转
    startSpin() {
      if (this.data.isSpinning || this.properties.spinning) return;
      
      const items = this.properties.items;
      if (!items || items.length === 0) return;

      this.setData({ isSpinning: true });
      
      // 随机选择结果
      const resultIndex = Math.floor(Math.random() * items.length);
      
      // 计算目标角度
      // 至少旋转3圈 + 随机角度 + 指向选中项的角度
      const baseRotation = 3 * 2 * Math.PI; // 3圈
      const randomRotation = Math.random() * 2 * Math.PI; // 随机额外角度
      const itemAngle = (2 * Math.PI) / items.length;
      // 指针在顶部（-PI/2），需要调整使选中项指向指针
      const targetItemAngle = resultIndex * itemAngle;
      const targetRotation = this.data.currentRotation + baseRotation + randomRotation + (2 * Math.PI - targetItemAngle);
      
      // 动画参数
      const duration = 4000; // 4秒
      const startTime = Date.now();
      const startRotation = this.data.currentRotation;
      const totalRotation = targetRotation - startRotation;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数：先加速后减速
        const easeProgress = this.easeInOutCubic(progress);
        
        const currentRotation = startRotation + totalRotation * easeProgress;
        
        this.setData({ currentRotation: currentRotation });
        this.drawWheel(currentRotation);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 动画结束
          this.setData({ isSpinning: false });
          
          // 触发结果事件
          this.triggerEvent('result', {
            item: items[resultIndex],
            index: resultIndex
          });
        }
      };
      
      animate();
    },

    // 缓动函数：easeInOutCubic
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  }
});
