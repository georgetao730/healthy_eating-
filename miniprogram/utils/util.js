// 通用工具函数模块

/**
 * 日期格式化
 * @param {Date|String|Number} date - 日期对象、日期字符串或时间戳
 * @param {String} format - 格式化模板，默认 'YYYY-MM-DD'
 * @returns {String} 格式化后的日期字符串
 * 
 * 支持的格式符：
 * YYYY - 四位年份
 * MM - 两位月份
 * DD - 两位日期
 * HH - 两位小时（24小时制）
 * mm - 两位分钟
 * ss - 两位秒
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  const pad = (num) => num.toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', pad(month))
    .replace('DD', pad(day))
    .replace('HH', pad(hour))
    .replace('mm', pad(minute))
    .replace('ss', pad(second));
}

/**
 * 根据预产期计算当前孕周
 * @param {String|Date} dueDate - 预产期（格式：YYYY-MM-DD 或 Date对象）
 * @returns {Object} 孕周信息 { week: 孕周数, day: 剩余天数, totalDays: 总天数, isValid: 是否有效 }
 */
function calculatePregnancyWeek(dueDate) {
  if (!dueDate) {
    return { week: 0, day: 0, totalDays: 0, isValid: false };
  }

  const due = new Date(dueDate);
  const now = new Date();

  if (isNaN(due.getTime())) {
    return { week: 0, day: 0, totalDays: 0, isValid: false };
  }

  // 预产期 - 280天 = 末次月经日期
  const lastMenstrualDate = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  
  // 当前日期 - 末次月经日期 = 孕天数
  const diffTime = now.getTime() - lastMenstrualDate.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 计算孕周
  if (totalDays < 0) {
    return { week: 0, day: 0, totalDays: 0, isValid: false };
  }

  const week = Math.floor(totalDays / 7);
  const day = totalDays % 7;

  return {
    week: week,
    day: day,
    totalDays: totalDays,
    isValid: week >= 0 && week <= 42,
    lastMenstrualDate: formatDate(lastMenstrualDate)
  };
}

/**
 * 根据末次月经日期计算预产期
 * @param {String|Date} lastMenstrualDate - 末次月经日期
 * @returns {String} 预产期（YYYY-MM-DD格式）
 */
function calculateDueDate(lastMenstrualDate) {
  if (!lastMenstrualDate) return '';

  const lmp = new Date(lastMenstrualDate);
  if (isNaN(lmp.getTime())) return '';

  // 末次月经 + 280天 = 预产期
  const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  return formatDate(due);
}

/**
 * 获取今天的日期字符串 YYYY-MM-DD
 * @returns {String} 今天的日期
 */
function getTodayString() {
  return formatDate(new Date(), 'YYYY-MM-DD');
}

/**
 * 获取当前时间字符串 YYYY-MM-DD HH:mm:ss
 * @returns {String} 当前时间
 */
function getNowString() {
  return formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
}

/**
 * 生成唯一ID
 * @param {String} prefix - ID前缀
 * @returns {String} 唯一ID
 */
function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${timestamp}${random}`;
}

/**
 * 生成短ID（8位）
 * @returns {String} 短ID
 */
function generateShortId() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

/**
 * 数字保留小数位
 * @param {Number} num - 数字
 * @param {Number} digits - 小数位数，默认2
 * @returns {Number} 处理后的数字
 */
function toFixed(num, digits = 2) {
  if (typeof num !== 'number' || isNaN(num)) return 0;
  const multiplier = Math.pow(10, digits);
  return Math.round(num * multiplier) / multiplier;
}

/**
 * 数字格式化（添加千分位）
 * @param {Number} num - 数字
 * @returns {String} 格式化后的字符串
 */
function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {Number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {Number} limit - 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 深拷贝对象
 * @param {Object} obj - 要拷贝的对象
 * @returns {Object} 拷贝后的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
  return obj;
}

/**
 * 检查对象是否为空
 * @param {Object} obj - 要检查的对象
 * @returns {Boolean} 是否为空
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * 安全获取对象属性
 * @param {Object} obj - 对象
 * @param {String} path - 属性路径，如 'a.b.c'
 * @param {*} defaultValue - 默认值
 * @returns {*} 属性值或默认值
 */
function get(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

/**
 * 数组分组
 * @param {Array} array - 数组
 * @param {Function|String} key - 分组键
 * @returns {Object} 分组后的对象
 */
function groupBy(array, key) {
  if (!Array.isArray(array)) return {};
  
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * 数组去重
 * @param {Array} array - 数组
 * @param {String} key - 去重键（对象数组时使用）
 * @returns {Array} 去重后的数组
 */
function unique(array, key = null) {
  if (!Array.isArray(array)) return [];
  
  if (key) {
    const seen = new Set();
    return array.filter(item => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }
  
  return [...new Set(array)];
}

/**
 * 计算两个日期之间的天数差
 * @param {String|Date} date1 - 日期1
 * @param {String|Date} date2 - 日期2
 * @returns {Number} 天数差
 */
function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 判断是否同一天
 * @param {String|Date} date1 - 日期1
 * @param {String|Date} date2 - 日期2
 * @returns {Boolean} 是否同一天
 */
function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

/**
 * 显示提示信息（兼容微信小程序）
 * @param {String} title - 提示内容
 * @param {String} icon - 图标类型
 * @param {Number} duration - 持续时间
 */
function showToast(title, icon = 'none', duration = 2000) {
  if (typeof wx !== 'undefined' && wx.showToast) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    });
  } else {
    console.log(`[Toast] ${title}`);
  }
}

/**
 * 显示加载中（兼容微信小程序）
 * @param {String} title - 加载提示
 */
function showLoading(title = '加载中...') {
  if (typeof wx !== 'undefined' && wx.showLoading) {
    wx.showLoading({
      title: title,
      mask: true
    });
  } else {
    console.log(`[Loading] ${title}`);
  }
}

/**
 * 隐藏加载中（兼容微信小程序）
 */
function hideLoading() {
  if (typeof wx !== 'undefined' && wx.hideLoading) {
    wx.hideLoading();
  }
}

module.exports = {
  formatDate,
  calculatePregnancyWeek,
  calculateDueDate,
  getTodayString,
  getNowString,
  generateId,
  generateShortId,
  toFixed,
  formatNumber,
  debounce,
  throttle,
  deepClone,
  isEmptyObject,
  get,
  groupBy,
  unique,
  daysBetween,
  isSameDay,
  showToast,
  showLoading,
  hideLoading
};
