// 食物营养数据库 - 每100克食物的营养数据
// 数据来源参考：中国食物成分表标准版

const foodDatabase = [
  // ==================== 主食类 (staple) ====================
  { id: 1, name: '米饭', category: 'staple', calories: 116, protein: 2.6, carbs: 25.9, fat: 0.3, folicAcid: 3, calcium: 7, iron: 0.3, dha: 0, zinc: 0.92, vitaminC: 0, fiber: 0.3 },
  { id: 2, name: '面条(煮)', category: 'staple', calories: 110, protein: 4.0, carbs: 22.8, fat: 0.7, folicAcid: 5, calcium: 15, iron: 0.4, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 0.8 },
  { id: 3, name: '馒头', category: 'staple', calories: 223, protein: 7.0, carbs: 47.0, fat: 1.1, folicAcid: 8, calcium: 38, iron: 1.8, dha: 0, zinc: 1.0, vitaminC: 0, fiber: 1.3 },
  { id: 4, name: '全麦面包', category: 'staple', calories: 246, protein: 8.5, carbs: 41.3, fat: 3.5, folicAcid: 25, calcium: 160, iron: 2.5, dha: 0, zinc: 1.8, vitaminC: 0, fiber: 6.0 },
  { id: 5, name: '红薯', category: 'staple', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, folicAcid: 49, calcium: 39, iron: 0.5, dha: 0, zinc: 0.3, vitaminC: 24, fiber: 3.0 },
  { id: 6, name: '玉米(鲜)', category: 'staple', calories: 112, protein: 4.0, carbs: 22.8, fat: 1.2, folicAcid: 42, calcium: 2, iron: 0.5, dha: 0, zinc: 0.9, vitaminC: 6.8, fiber: 2.7 },
  { id: 7, name: '小米粥', category: 'staple', calories: 46, protein: 1.4, carbs: 9.2, fat: 0.7, folicAcid: 5, calcium: 10, iron: 0.4, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0.6 },
  { id: 8, name: '燕麦', category: 'staple', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, folicAcid: 56, calcium: 54, iron: 4.7, dha: 0, zinc: 3.97, vitaminC: 0, fiber: 10.6 },
  { id: 9, name: '糙米', category: 'staple', calories: 348, protein: 7.9, carbs: 75.0, fat: 2.7, folicAcid: 20, calcium: 23, iron: 1.5, dha: 0, zinc: 2.0, vitaminC: 0, fiber: 3.4 },
  { id: 10, name: '土豆', category: 'staple', calories: 77, protein: 2.0, carbs: 17.2, fat: 0.1, folicAcid: 16, calcium: 12, iron: 0.8, dha: 0, zinc: 0.3, vitaminC: 19.7, fiber: 2.2 },
  { id: 11, name: '山药', category: 'staple', calories: 57, protein: 1.9, carbs: 12.4, fat: 0.2, folicAcid: 16, calcium: 16, iron: 0.5, dha: 0, zinc: 0.3, vitaminC: 5, fiber: 0.8 },
  { id: 12, name: '芋头', category: 'staple', calories: 56, protein: 1.3, carbs: 12.7, fat: 0.2, folicAcid: 31, calcium: 36, iron: 0.4, dha: 0, zinc: 0.5, vitaminC: 6, fiber: 1.0 },
  { id: 13, name: '年糕', category: 'staple', calories: 156, protein: 3.3, carbs: 34.7, fat: 0.6, folicAcid: 2, calcium: 31, iron: 1.6, dha: 0, zinc: 1.2, vitaminC: 0, fiber: 0.8 },
  { id: 14, name: '饺子皮', category: 'staple', calories: 253, protein: 8.5, carbs: 53.0, fat: 1.1, folicAcid: 12, calcium: 25, iron: 2.0, dha: 0, zinc: 0.9, vitaminC: 0, fiber: 1.5 },
  { id: 15, name: '花卷', category: 'staple', calories: 214, protein: 6.4, carbs: 45.6, fat: 1.0, folicAcid: 8, calcium: 58, iron: 2.3, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 1.2 },
  { id: 16, name: '包子皮', category: 'staple', calories: 227, protein: 7.4, carbs: 47.0, fat: 0.9, folicAcid: 10, calcium: 42, iron: 2.0, dha: 0, zinc: 0.9, vitaminC: 0, fiber: 1.4 },
  { id: 17, name: '白面包', category: 'staple', calories: 265, protein: 9.0, carbs: 49.0, fat: 3.2, folicAcid: 18, calcium: 160, iron: 2.3, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 2.7 },
  { id: 18, name: '荞麦面', category: 'staple', calories: 337, protein: 10.6, carbs: 71.5, fat: 2.3, folicAcid: 29, calcium: 47, iron: 4.1, dha: 0, zinc: 3.6, vitaminC: 0, fiber: 10.0 },
  { id: 19, name: '意大利面(煮)', category: 'staple', calories: 158, protein: 5.8, carbs: 31.0, fat: 0.9, folicAcid: 18, calcium: 7, iron: 0.5, dha: 0, zinc: 0.6, vitaminC: 0, fiber: 1.8 },
  { id: 20, name: '通心粉(煮)', category: 'staple', calories: 124, protein: 4.5, carbs: 24.0, fat: 0.7, folicAcid: 15, calcium: 6, iron: 0.4, dha: 0, zinc: 0.5, vitaminC: 0, fiber: 1.2 },
  { id: 21, name: '烙饼', category: 'staple', calories: 259, protein: 7.5, carbs: 52.0, fat: 2.3, folicAcid: 12, calcium: 45, iron: 2.2, dha: 0, zinc: 0.9, vitaminC: 0, fiber: 1.6 },
  { id: 22, name: '油条', category: 'staple', calories: 388, protein: 6.9, carbs: 51.0, fat: 17.6, folicAcid: 5, calcium: 25, iron: 1.0, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 0.9 },
  { id: 23, name: '粽子', category: 'staple', calories: 195, protein: 4.5, carbs: 40.0, fat: 1.8, folicAcid: 8, calcium: 28, iron: 1.2, dha: 0, zinc: 0.7, vitaminC: 0, fiber: 0.8 },
  { id: 24, name: '汤圆', category: 'staple', calories: 230, protein: 4.0, carbs: 48.0, fat: 2.0, folicAcid: 3, calcium: 20, iron: 0.8, dha: 0, zinc: 0.5, vitaminC: 0, fiber: 0.5 },
  { id: 25, name: '紫薯', category: 'staple', calories: 82, protein: 1.3, carbs: 18.0, fat: 0.2, folicAcid: 69, calcium: 30, iron: 0.5, dha: 0, zinc: 0.4, vitaminC: 26, fiber: 3.0 },
  { id: 26, name: '黑米', category: 'staple', calories: 341, protein: 9.4, carbs: 72.2, fat: 2.5, folicAcid: 35, calcium: 12, iron: 1.6, dha: 0, zinc: 3.8, vitaminC: 0, fiber: 3.9 },
  { id: 27, name: '红豆', category: 'staple', calories: 324, protein: 20.2, carbs: 63.4, fat: 0.6, folicAcid: 130, calcium: 74, iron: 7.4, dha: 0, zinc: 2.2, vitaminC: 0, fiber: 7.7 },
  { id: 28, name: '绿豆', category: 'staple', calories: 316, protein: 21.6, carbs: 62.0, fat: 0.8, folicAcid: 121, calcium: 81, iron: 6.5, dha: 0, zinc: 2.2, vitaminC: 0, fiber: 6.4 },
  { id: 29, name: '薏米', category: 'staple', calories: 361, protein: 12.8, carbs: 71.1, fat: 3.3, folicAcid: 16, calcium: 42, iron: 3.6, dha: 0, zinc: 1.7, vitaminC: 0, fiber: 2.0 },
  { id: 30, name: '糯米', category: 'staple', calories: 348, protein: 7.3, carbs: 78.3, fat: 1.0, folicAcid: 8, calcium: 26, iron: 1.4, dha: 0, zinc: 1.5, vitaminC: 0, fiber: 0.8 },

  // ==================== 肉蛋类 (meat) ====================
  { id: 101, name: '鸡胸肉', category: 'meat', calories: 133, protein: 19.4, carbs: 2.5, fat: 5.0, folicAcid: 4, calcium: 11, iron: 0.7, dha: 0, zinc: 1.0, vitaminC: 0, fiber: 0 },
  { id: 102, name: '猪瘦肉', category: 'meat', calories: 143, protein: 20.3, carbs: 1.5, fat: 6.2, folicAcid: 2, calcium: 6, iron: 1.5, dha: 0, zinc: 2.3, vitaminC: 0, fiber: 0 },
  { id: 103, name: '牛肉(瘦)', category: 'meat', calories: 106, protein: 20.2, carbs: 1.2, fat: 2.3, folicAcid: 6, calcium: 9, iron: 2.8, dha: 0, zinc: 3.7, vitaminC: 0, fiber: 0 },
  { id: 104, name: '羊肉(瘦)', category: 'meat', calories: 118, protein: 20.5, carbs: 0.2, fat: 3.9, folicAcid: 4, calcium: 9, iron: 2.3, dha: 0, zinc: 3.2, vitaminC: 0, fiber: 0 },
  { id: 105, name: '鸡蛋', category: 'meat', calories: 144, protein: 13.3, carbs: 2.8, fat: 8.8, folicAcid: 56, calcium: 56, iron: 2.0, dha: 25, zinc: 1.1, vitaminC: 0, fiber: 0 },
  { id: 106, name: '鸭蛋', category: 'meat', calories: 180, protein: 12.6, carbs: 3.1, fat: 13.0, folicAcid: 72, calcium: 62, iron: 2.9, dha: 35, zinc: 1.7, vitaminC: 0, fiber: 0 },
  { id: 107, name: '鹌鹑蛋', category: 'meat', calories: 160, protein: 12.8, carbs: 2.1, fat: 11.1, folicAcid: 66, calcium: 47, iron: 3.2, dha: 20, zinc: 1.6, vitaminC: 0, fiber: 0 },
  { id: 108, name: '三文鱼', category: 'meat', calories: 139, protein: 17.2, carbs: 0, fat: 7.8, folicAcid: 25, calcium: 9, iron: 0.3, dha: 1200, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 109, name: '鲈鱼', category: 'meat', calories: 105, protein: 18.6, carbs: 0, fat: 3.4, folicAcid: 5, calcium: 138, iron: 2.0, dha: 150, zinc: 0.8, vitaminC: 0, fiber: 0 },
  { id: 110, name: '虾仁', category: 'meat', calories: 93, protein: 20.4, carbs: 0.2, fat: 0.7, folicAcid: 3, calcium: 62, iron: 4.0, dha: 120, zinc: 1.5, vitaminC: 0, fiber: 0 },
  { id: 111, name: '鳕鱼', category: 'meat', calories: 78, protein: 17.8, carbs: 0, fat: 0.7, folicAcid: 8, calcium: 11, iron: 0.3, dha: 150, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 112, name: '带鱼', category: 'meat', calories: 127, protein: 17.7, carbs: 3.1, fat: 4.9, folicAcid: 5, calcium: 28, iron: 1.2, dha: 180, zinc: 0.7, vitaminC: 0, fiber: 0 },
  { id: 113, name: '猪肝', category: 'meat', calories: 129, protein: 19.3, carbs: 5.0, fat: 3.5, folicAcid: 335, calcium: 6, iron: 22.6, dha: 0, zinc: 5.8, vitaminC: 20, fiber: 0 },
  { id: 114, name: '鸡腿肉', category: 'meat', calories: 181, protein: 16.0, carbs: 0, fat: 13.0, folicAcid: 4, calcium: 10, iron: 0.9, dha: 0, zinc: 1.3, vitaminC: 0, fiber: 0 },
  { id: 115, name: '排骨', category: 'meat', calories: 278, protein: 16.7, carbs: 0.7, fat: 23.1, folicAcid: 2, calcium: 14, iron: 0.8, dha: 0, zinc: 2.3, vitaminC: 0, fiber: 0 },
  { id: 116, name: '牛腱肉', category: 'meat', calories: 122, protein: 20.1, carbs: 2.0, fat: 3.5, folicAcid: 5, calcium: 5, iron: 2.6, dha: 0, zinc: 3.4, vitaminC: 0, fiber: 0 },
  { id: 117, name: '鸡翅', category: 'meat', calories: 194, protein: 17.4, carbs: 4.0, fat: 11.8, folicAcid: 4, calcium: 12, iron: 0.6, dha: 0, zinc: 1.2, vitaminC: 0, fiber: 0 },
  { id: 118, name: '鸭肉', category: 'meat', calories: 240, protein: 15.5, carbs: 4.0, fat: 19.7, folicAcid: 8, calcium: 6, iron: 2.2, dha: 0, zinc: 1.2, vitaminC: 0, fiber: 0 },
  { id: 119, name: '鹅肉', category: 'meat', calories: 251, protein: 17.9, carbs: 0, fat: 19.9, folicAcid: 6, calcium: 10, iron: 3.8, dha: 0, zinc: 1.4, vitaminC: 0, fiber: 0 },
  { id: 120, name: '墨鱼(鲜)', category: 'meat', calories: 83, protein: 15.2, carbs: 0, fat: 0.9, folicAcid: 8, calcium: 15, iron: 1.0, dha: 80, zinc: 1.3, vitaminC: 0, fiber: 0 },
  { id: 121, name: '扇贝', category: 'meat', calories: 60, protein: 11.1, carbs: 2.6, fat: 0.6, folicAcid: 16, calcium: 142, iron: 7.2, dha: 45, zinc: 11.7, vitaminC: 0, fiber: 0 },
  { id: 122, name: '牡蛎', category: 'meat', calories: 73, protein: 5.3, carbs: 8.2, fat: 2.1, folicAcid: 25, calcium: 131, iron: 7.1, dha: 35, zinc: 71.2, vitaminC: 0, fiber: 0 },
  { id: 123, name: '蛤蜊', category: 'meat', calories: 62, protein: 10.1, carbs: 2.8, fat: 1.1, folicAcid: 12, calcium: 133, iron: 22.0, dha: 30, zinc: 1.6, vitaminC: 0, fiber: 0 },
  { id: 124, name: '螃蟹', category: 'meat', calories: 103, protein: 17.5, carbs: 1.1, fat: 2.6, folicAcid: 15, calcium: 126, iron: 2.9, dha: 60, zinc: 3.7, vitaminC: 0, fiber: 0 },
  { id: 125, name: '鲫鱼', category: 'meat', calories: 108, protein: 17.1, carbs: 3.8, fat: 2.7, folicAcid: 6, calcium: 79, iron: 1.3, dha: 120, zinc: 1.9, vitaminC: 0, fiber: 0 },
  { id: 126, name: '草鱼', category: 'meat', calories: 113, protein: 16.6, carbs: 0, fat: 5.2, folicAcid: 5, calcium: 38, iron: 0.8, dha: 80, zinc: 0.9, vitaminC: 0, fiber: 0 },
  { id: 127, name: '黄花鱼', category: 'meat', calories: 97, protein: 17.7, carbs: 0.8, fat: 2.5, folicAcid: 4, calcium: 53, iron: 0.9, dha: 200, zinc: 0.8, vitaminC: 0, fiber: 0 },
  { id: 128, name: '金枪鱼', category: 'meat', calories: 108, protein: 23.4, carbs: 0, fat: 1.0, folicAcid: 2, calcium: 5, iron: 1.0, dha: 900, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 129, name: '猪蹄', category: 'meat', calories: 260, protein: 23.6, carbs: 0, fat: 18.8, folicAcid: 1, calcium: 33, iron: 1.1, dha: 0, zinc: 1.1, vitaminC: 0, fiber: 0 },
  { id: 130, name: '猪心', category: 'meat', calories: 119, protein: 16.6, carbs: 1.1, fat: 5.3, folicAcid: 6, calcium: 12, iron: 4.3, dha: 0, zinc: 1.9, vitaminC: 4, fiber: 0 },

  // ==================== 蔬菜类 (vegetable) ====================
  { id: 201, name: '菠菜', category: 'vegetable', calories: 24, protein: 2.6, carbs: 3.6, fat: 0.3, folicAcid: 194, calcium: 99, iron: 2.7, dha: 0, zinc: 0.5, vitaminC: 28, fiber: 2.2 },
  { id: 202, name: '西兰花', category: 'vegetable', calories: 34, protein: 2.8, carbs: 7.0, fat: 0.4, folicAcid: 63, calcium: 47, iron: 0.6, dha: 0, zinc: 0.4, vitaminC: 89, fiber: 2.6 },
  { id: 203, name: '胡萝卜', category: 'vegetable', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, folicAcid: 19, calcium: 33, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 5.9, fiber: 2.8 },
  { id: 204, name: '番茄', category: 'vegetable', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, folicAcid: 15, calcium: 10, iron: 0.3, dha: 0, zinc: 0.1, vitaminC: 14, fiber: 1.2 },
  { id: 205, name: '黄瓜', category: 'vegetable', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, folicAcid: 7, calcium: 16, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 2.8, fiber: 0.5 },
  { id: 206, name: '生菜', category: 'vegetable', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, folicAcid: 36, calcium: 36, iron: 0.9, dha: 0, zinc: 0.2, vitaminC: 9, fiber: 1.3 },
  { id: 207, name: '芹菜', category: 'vegetable', calories: 14, protein: 0.8, carbs: 3.0, fat: 0.1, folicAcid: 36, calcium: 80, iron: 0.6, dha: 0, zinc: 0.2, vitaminC: 8, fiber: 1.6 },
  { id: 208, name: '白菜', category: 'vegetable', calories: 18, protein: 1.5, carbs: 3.4, fat: 0.1, folicAcid: 61, calcium: 50, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 31, fiber: 0.8 },
  { id: 209, name: '油菜', category: 'vegetable', calories: 14, protein: 1.8, carbs: 2.7, fat: 0.5, folicAcid: 46, calcium: 108, iron: 1.2, dha: 0, zinc: 0.3, vitaminC: 36, fiber: 1.1 },
  { id: 210, name: '茄子', category: 'vegetable', calories: 25, protein: 1.0, carbs: 5.9, fat: 0.2, folicAcid: 19, calcium: 24, iron: 0.5, dha: 0, zinc: 0.2, vitaminC: 2, fiber: 3.0 },
  { id: 211, name: '青椒', category: 'vegetable', calories: 22, protein: 1.0, carbs: 5.4, fat: 0.2, folicAcid: 10, calcium: 14, iron: 0.4, dha: 0, zinc: 0.2, vitaminC: 72, fiber: 1.6 },
  { id: 212, name: '豆角', category: 'vegetable', calories: 33, protein: 2.5, carbs: 6.7, fat: 0.3, folicAcid: 33, calcium: 29, iron: 1.5, dha: 0, zinc: 0.4, vitaminC: 18, fiber: 2.7 },
  { id: 213, name: '莴笋', category: 'vegetable', calories: 15, protein: 1.0, carbs: 2.8, fat: 0.1, folicAcid: 28, calcium: 23, iron: 0.5, dha: 0, zinc: 0.3, vitaminC: 4, fiber: 0.6 },
  { id: 214, name: '南瓜', category: 'vegetable', calories: 26, protein: 1.0, carbs: 6.5, fat: 0.1, folicAcid: 16, calcium: 21, iron: 0.8, dha: 0, zinc: 0.3, vitaminC: 8.3, fiber: 0.5 },
  { id: 215, name: '冬瓜', category: 'vegetable', calories: 12, protein: 0.4, carbs: 2.6, fat: 0.2, folicAcid: 5, calcium: 19, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 18, fiber: 0.7 },
  { id: 216, name: '丝瓜', category: 'vegetable', calories: 20, protein: 1.3, carbs: 4.0, fat: 0.2, folicAcid: 7, calcium: 14, iron: 0.4, dha: 0, zinc: 0.2, vitaminC: 5, fiber: 0.6 },
  { id: 217, name: '苦瓜', category: 'vegetable', calories: 19, protein: 1.0, carbs: 4.3, fat: 0.1, folicAcid: 27, calcium: 14, iron: 0.4, dha: 0, zinc: 0.4, vitaminC: 56, fiber: 1.4 },
  { id: 218, name: '秋葵', category: 'vegetable', calories: 33, protein: 2.0, carbs: 7.5, fat: 0.1, folicAcid: 88, calcium: 82, iron: 0.6, dha: 0, zinc: 0.6, vitaminC: 23, fiber: 3.2 },
  { id: 219, name: '木耳(干)', category: 'vegetable', calories: 265, protein: 12.1, carbs: 65.6, fat: 1.5, folicAcid: 87, calcium: 247, iron: 97.4, dha: 0, zinc: 3.2, vitaminC: 0, fiber: 29.9 },
  { id: 220, name: '香菇(鲜)', category: 'vegetable', calories: 26, protein: 2.2, carbs: 5.2, fat: 0.3, folicAcid: 16, calcium: 2, iron: 0.3, dha: 0, zinc: 0.7, vitaminC: 1, fiber: 3.3 },
  { id: 221, name: '金针菇', category: 'vegetable', calories: 32, protein: 2.4, carbs: 6.0, fat: 0.4, folicAcid: 75, calcium: 16, iron: 1.4, dha: 0, zinc: 0.4, vitaminC: 2, fiber: 2.7 },
  { id: 222, name: '莲藕', category: 'vegetable', calories: 47, protein: 1.2, carbs: 11.5, fat: 0.2, folicAcid: 10, calcium: 39, iron: 1.4, dha: 0, zinc: 0.2, vitaminC: 44, fiber: 2.2 },
  { id: 223, name: '豆芽', category: 'vegetable', calories: 44, protein: 4.5, carbs: 5.0, fat: 1.6, folicAcid: 36, calcium: 21, iron: 0.9, dha: 0, zinc: 0.3, vitaminC: 8, fiber: 1.5 },
  { id: 224, name: '紫甘蓝', category: 'vegetable', calories: 25, protein: 1.3, carbs: 6.0, fat: 0.2, folicAcid: 46, calcium: 47, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 36, fiber: 2.1 },
  { id: 225, name: '芦笋', category: 'vegetable', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, folicAcid: 149, calcium: 24, iron: 2.1, dha: 0, zinc: 0.5, vitaminC: 13, fiber: 2.1 },
  { id: 226, name: '空心菜', category: 'vegetable', calories: 19, protein: 2.6, carbs: 3.6, fat: 0.3, folicAcid: 85, calcium: 77, iron: 1.4, dha: 0, zinc: 0.4, vitaminC: 25, fiber: 2.1 },
  { id: 227, name: '韭菜', category: 'vegetable', calories: 29, protein: 2.4, carbs: 4.6, fat: 0.4, folicAcid: 36, calcium: 42, iron: 1.6, dha: 0, zinc: 0.4, vitaminC: 24, fiber: 2.4 },
  { id: 228, name: '蒜苗', category: 'vegetable', calories: 37, protein: 2.1, carbs: 8.0, fat: 0.4, folicAcid: 72, calcium: 29, iron: 1.4, dha: 0, zinc: 0.4, vitaminC: 35, fiber: 1.8 },
  { id: 229, name: '洋葱', category: 'vegetable', calories: 40, protein: 1.1, carbs: 9.0, fat: 0.1, folicAcid: 16, calcium: 23, iron: 0.2, dha: 0, zinc: 0.2, vitaminC: 7.4, fiber: 1.7 },
  { id: 230, name: '西葫芦', category: 'vegetable', calories: 19, protein: 1.2, carbs: 3.8, fat: 0.2, folicAcid: 29, calcium: 15, iron: 0.4, dha: 0, zinc: 0.2, vitaminC: 17, fiber: 1.1 },

  // ==================== 水果类 (fruit) ====================
  { id: 301, name: '苹果', category: 'fruit', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, folicAcid: 3, calcium: 6, iron: 0.1, dha: 0, zinc: 0.04, vitaminC: 4.6, fiber: 2.4 },
  { id: 302, name: '香蕉', category: 'fruit', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, folicAcid: 20, calcium: 5, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 8.7, fiber: 2.6 },
  { id: 303, name: '橙子', category: 'fruit', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, folicAcid: 30, calcium: 40, iron: 0.1, dha: 0, zinc: 0.1, vitaminC: 53, fiber: 2.4 },
  { id: 304, name: '猕猴桃', category: 'fruit', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5, folicAcid: 25, calcium: 34, iron: 0.3, dha: 0, zinc: 0.1, vitaminC: 92.7, fiber: 3.0 },
  { id: 305, name: '草莓', category: 'fruit', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, folicAcid: 24, calcium: 16, iron: 0.4, dha: 0, zinc: 0.1, vitaminC: 58.8, fiber: 2.0 },
  { id: 306, name: '蓝莓', category: 'fruit', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, folicAcid: 6, calcium: 6, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 9.7, fiber: 2.4 },
  { id: 307, name: '樱桃', category: 'fruit', calories: 63, protein: 1.1, carbs: 16.0, fat: 0.2, folicAcid: 4, calcium: 13, iron: 0.4, dha: 0, zinc: 0.1, vitaminC: 7, fiber: 2.1 },
  { id: 308, name: '葡萄', category: 'fruit', calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2, folicAcid: 4, calcium: 10, iron: 0.4, dha: 0, zinc: 0.1, vitaminC: 3.2, fiber: 0.9 },
  { id: 309, name: '西瓜', category: 'fruit', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, folicAcid: 4, calcium: 7, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 8.1, fiber: 0.4 },
  { id: 310, name: '芒果', category: 'fruit', calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, folicAcid: 43, calcium: 11, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 36.4, fiber: 1.6 },
  { id: 311, name: '桃子', category: 'fruit', calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3, folicAcid: 4, calcium: 6, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 6.6, fiber: 1.5 },
  { id: 312, name: '李子', category: 'fruit', calories: 46, protein: 0.7, carbs: 11.4, fat: 0.3, folicAcid: 4, calcium: 16, iron: 0.3, dha: 0, zinc: 0.1, vitaminC: 9.5, fiber: 1.4 },
  { id: 313, name: '梨', category: 'fruit', calories: 57, protein: 0.4, carbs: 15.2, fat: 0.1, folicAcid: 7, calcium: 9, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 4.3, fiber: 3.1 },
  { id: 314, name: '柚子', category: 'fruit', calories: 42, protein: 0.8, carbs: 10.7, fat: 0.1, folicAcid: 9, calcium: 4, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 61, fiber: 1.0 },
  { id: 315, name: '火龙果', category: 'fruit', calories: 52, protein: 1.1, carbs: 13.3, fat: 0.4, folicAcid: 6, calcium: 6, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 3, fiber: 1.7 },
  { id: 316, name: '木瓜', category: 'fruit', calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, folicAcid: 38, calcium: 20, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 60.9, fiber: 1.7 },
  { id: 317, name: '石榴', category: 'fruit', calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2, folicAcid: 38, calcium: 10, iron: 0.3, dha: 0, zinc: 0.4, vitaminC: 10, fiber: 4.0 },
  { id: 318, name: '柿子', category: 'fruit', calories: 71, protein: 0.4, carbs: 18.6, fat: 0.2, folicAcid: 8, calcium: 8, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 16, fiber: 3.6 },
  { id: 319, name: '枇杷', category: 'fruit', calories: 41, protein: 0.5, carbs: 9.6, fat: 0.2, folicAcid: 2, calcium: 17, iron: 0.4, dha: 0, zinc: 0.1, vitaminC: 3, fiber: 0.8 },
  { id: 320, name: '杨梅', category: 'fruit', calories: 30, protein: 0.8, carbs: 6.7, fat: 0.2, folicAcid: 10, calcium: 14, iron: 1.0, dha: 0, zinc: 0.1, vitaminC: 9, fiber: 1.0 },
  { id: 321, name: '荔枝', category: 'fruit', calories: 66, protein: 0.8, carbs: 16.5, fat: 0.4, folicAcid: 14, calcium: 5, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 71.5, fiber: 1.3 },
  { id: 322, name: '龙眼', category: 'fruit', calories: 71, protein: 1.2, carbs: 16.6, fat: 0.1, folicAcid: 8, calcium: 6, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 43, fiber: 1.1 },
  { id: 323, name: '椰子肉', category: 'fruit', calories: 354, protein: 3.3, carbs: 15.2, fat: 33.5, folicAcid: 26, calcium: 14, iron: 2.4, dha: 0, zinc: 1.1, vitaminC: 3.3, fiber: 9.0 },
  { id: 324, name: '百香果', category: 'fruit', calories: 97, protein: 2.2, carbs: 23.4, fat: 0.7, folicAcid: 14, calcium: 12, iron: 1.6, dha: 0, zinc: 0.1, vitaminC: 30, fiber: 10.4 },
  { id: 325, name: '牛油果', category: 'fruit', calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, folicAcid: 81, calcium: 12, iron: 0.6, dha: 0, zinc: 0.6, vitaminC: 10, fiber: 6.7 },
  { id: 326, name: '山楂', category: 'fruit', calories: 102, protein: 0.5, carbs: 25.1, fat: 0.6, folicAcid: 33, calcium: 52, iron: 0.9, dha: 0, zinc: 0.3, vitaminC: 53, fiber: 3.1 },
  { id: 327, name: '红枣(干)', category: 'fruit', calories: 276, protein: 3.2, carbs: 67.8, fat: 0.5, folicAcid: 16, calcium: 64, iron: 2.1, dha: 0, zinc: 0.6, vitaminC: 7, fiber: 6.2 },
  { id: 328, name: '甘蔗', category: 'fruit', calories: 64, protein: 0.4, carbs: 16.0, fat: 0.1, folicAcid: 2, calcium: 14, iron: 0.4, dha: 0, zinc: 0.1, vitaminC: 2, fiber: 0.6 },
  { id: 329, name: '哈密瓜', category: 'fruit', calories: 34, protein: 0.5, carbs: 8.2, fat: 0.2, folicAcid: 27, calcium: 9, iron: 0.2, dha: 0, zinc: 0.1, vitaminC: 36.7, fiber: 0.9 },
  { id: 330, name: '柠檬', category: 'fruit', calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, folicAcid: 11, calcium: 26, iron: 0.6, dha: 0, zinc: 0.1, vitaminC: 53, fiber: 2.8 },

  // ==================== 汤品类 (soup) ====================
  { id: 401, name: '鸡汤', category: 'soup', calories: 36, protein: 4.8, carbs: 0.6, fat: 1.6, folicAcid: 2, calcium: 5, iron: 0.3, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 402, name: '排骨汤', category: 'soup', calories: 45, protein: 5.2, carbs: 0.8, fat: 2.3, folicAcid: 1, calcium: 15, iron: 0.4, dha: 0, zinc: 0.6, vitaminC: 0, fiber: 0 },
  { id: 403, name: '鲫鱼汤', category: 'soup', calories: 42, protein: 5.8, carbs: 0.5, fat: 1.8, folicAcid: 3, calcium: 25, iron: 0.3, dha: 80, zinc: 0.5, vitaminC: 0, fiber: 0 },
  { id: 404, name: '紫菜蛋花汤', category: 'soup', calories: 28, protein: 2.5, carbs: 2.0, fat: 1.2, folicAcid: 12, calcium: 35, iron: 1.8, dha: 5, zinc: 0.4, vitaminC: 0, fiber: 0.5 },
  { id: 405, name: '番茄蛋汤', category: 'soup', calories: 32, protein: 2.2, carbs: 3.5, fat: 1.0, folicAcid: 8, calcium: 12, iron: 0.5, dha: 5, zinc: 0.2, vitaminC: 5, fiber: 0.3 },
  { id: 406, name: '玉米排骨汤', category: 'soup', calories: 52, protein: 4.5, carbs: 6.2, fat: 1.5, folicAcid: 6, calcium: 12, iron: 0.4, dha: 0, zinc: 0.5, vitaminC: 2, fiber: 0.8 },
  { id: 407, name: '山药排骨汤', category: 'soup', calories: 48, protein: 4.2, carbs: 4.8, fat: 1.6, folicAcid: 4, calcium: 18, iron: 0.4, dha: 0, zinc: 0.4, vitaminC: 1, fiber: 0.3 },
  { id: 408, name: '莲藕排骨汤', category: 'soup', calories: 55, protein: 4.8, carbs: 6.5, fat: 1.4, folicAcid: 3, calcium: 22, iron: 0.6, dha: 0, zinc: 0.4, vitaminC: 3, fiber: 0.5 },
  { id: 409, name: '冬瓜排骨汤', category: 'soup', calories: 38, protein: 4.0, carbs: 3.2, fat: 1.2, folicAcid: 2, calcium: 16, iron: 0.3, dha: 0, zinc: 0.3, vitaminC: 4, fiber: 0.4 },
  { id: 410, name: '猪肚汤', category: 'soup', calories: 58, protein: 6.5, carbs: 0.8, fat: 3.2, folicAcid: 2, calcium: 10, iron: 1.2, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 0 },
  { id: 411, name: '乌鸡汤', category: 'soup', calories: 42, protein: 5.8, carbs: 0.5, fat: 1.8, folicAcid: 3, calcium: 8, iron: 0.8, dha: 0, zinc: 0.6, vitaminC: 0, fiber: 0 },
  { id: 412, name: '鸽子汤', category: 'soup', calories: 48, protein: 6.2, carbs: 0.6, fat: 2.0, folicAcid: 4, calcium: 12, iron: 0.6, dha: 0, zinc: 0.7, vitaminC: 0, fiber: 0 },
  { id: 413, name: '银耳汤', category: 'soup', calories: 35, protein: 0.8, carbs: 8.0, fat: 0.1, folicAcid: 8, calcium: 25, iron: 0.5, dha: 0, zinc: 0.2, vitaminC: 2, fiber: 1.5 },
  { id: 414, name: '红豆汤', category: 'soup', calories: 68, protein: 3.2, carbs: 14.0, fat: 0.3, folicAcid: 35, calcium: 18, iron: 1.5, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 1.2 },
  { id: 415, name: '绿豆汤', category: 'soup', calories: 62, protein: 3.5, carbs: 12.5, fat: 0.2, folicAcid: 32, calcium: 15, iron: 1.2, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 1.0 },
  { id: 416, name: '花生猪脚汤', category: 'soup', calories: 85, protein: 6.8, carbs: 3.5, fat: 5.2, folicAcid: 15, calcium: 22, iron: 0.6, dha: 0, zinc: 0.8, vitaminC: 0, fiber: 0.8 },
  { id: 417, name: '海带排骨汤', category: 'soup', calories: 42, protein: 4.5, carbs: 2.8, fat: 1.5, folicAcid: 2, calcium: 45, iron: 0.8, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0.6 },
  { id: 418, name: '萝卜排骨汤', category: 'soup', calories: 45, protein: 4.2, carbs: 4.5, fat: 1.4, folicAcid: 3, calcium: 18, iron: 0.4, dha: 0, zinc: 0.4, vitaminC: 6, fiber: 0.5 },
  { id: 419, name: '酸辣汤', category: 'soup', calories: 38, protein: 2.5, carbs: 4.2, fat: 1.2, folicAcid: 5, calcium: 22, iron: 0.8, dha: 0, zinc: 0.3, vitaminC: 2, fiber: 0.4 },
  { id: 420, name: '南瓜汤', category: 'soup', calories: 32, protein: 1.2, carbs: 6.0, fat: 0.5, folicAcid: 6, calcium: 12, iron: 0.3, dha: 0, zinc: 0.2, vitaminC: 3, fiber: 0.6 },
  { id: 421, name: '蘑菇汤', category: 'soup', calories: 25, protein: 1.8, carbs: 3.0, fat: 0.8, folicAcid: 12, calcium: 5, iron: 0.5, dha: 0, zinc: 0.3, vitaminC: 1, fiber: 0.8 },
  { id: 422, name: '豆腐汤', category: 'soup', calories: 28, protein: 3.2, carbs: 1.5, fat: 1.0, folicAcid: 8, calcium: 85, iron: 0.9, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0.2 },
  { id: 423, name: '牛肉汤', category: 'soup', calories: 48, protein: 6.5, carbs: 0.8, fat: 2.0, folicAcid: 3, calcium: 8, iron: 0.8, dha: 0, zinc: 1.2, vitaminC: 0, fiber: 0 },
  { id: 424, name: '羊肉汤', category: 'soup', calories: 52, protein: 6.2, carbs: 0.5, fat: 2.5, folicAcid: 2, calcium: 10, iron: 0.7, dha: 0, zinc: 1.0, vitaminC: 0, fiber: 0 },
  { id: 425, name: '鱼头汤', category: 'soup', calories: 55, protein: 6.8, carbs: 0.6, fat: 2.8, folicAcid: 4, calcium: 35, iron: 0.4, dha: 150, zinc: 0.5, vitaminC: 0, fiber: 0 },

  // ==================== 乳制品类 (dairy) ====================
  { id: 501, name: '纯牛奶', category: 'dairy', calories: 54, protein: 3.0, carbs: 4.7, fat: 3.2, folicAcid: 5, calcium: 104, iron: 0.3, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 502, name: '酸奶', category: 'dairy', calories: 72, protein: 2.5, carbs: 9.3, fat: 2.7, folicAcid: 6, calcium: 118, iron: 0.2, dha: 0, zinc: 0.4, vitaminC: 1, fiber: 0 },
  { id: 503, name: '奶酪', category: 'dairy', calories: 328, protein: 25.0, carbs: 3.5, fat: 23.5, folicAcid: 12, calcium: 731, iron: 0.2, dha: 0, zinc: 3.1, vitaminC: 0, fiber: 0 },
  { id: 504, name: '孕妇奶粉', category: 'dairy', calories: 480, protein: 18.0, carbs: 56.0, fat: 18.0, folicAcid: 400, calcium: 800, iron: 10.0, dha: 50, zinc: 6.0, vitaminC: 60, fiber: 0 },
  { id: 505, name: '脱脂牛奶', category: 'dairy', calories: 34, protein: 3.4, carbs: 5.0, fat: 0.1, folicAcid: 5, calcium: 122, iron: 0.3, dha: 0, zinc: 0.4, vitaminC: 0, fiber: 0 },
  { id: 506, name: '豆浆', category: 'dairy', calories: 31, protein: 3.0, carbs: 1.8, fat: 1.6, folicAcid: 12, calcium: 10, iron: 0.5, dha: 0, zinc: 0.3, vitaminC: 0, fiber: 0.3 },
  { id: 507, name: '豆腐(北)', category: 'dairy', calories: 98, protein: 12.2, carbs: 1.9, fat: 4.8, folicAcid: 16, calcium: 138, iron: 2.5, dha: 0, zinc: 0.6, vitaminC: 0, fiber: 0.4 },
  { id: 508, name: '豆腐(南)', category: 'dairy', calories: 57, protein: 6.2, carbs: 2.6, fat: 2.5, folicAcid: 12, calcium: 116, iron: 1.5, dha: 0, zinc: 0.5, vitaminC: 0, fiber: 0.2 },
  { id: 509, name: '豆腐干', category: 'dairy', calories: 140, protein: 16.2, carbs: 5.2, fat: 6.2, folicAcid: 18, calcium: 308, iron: 4.9, dha: 0, zinc: 1.8, vitaminC: 0, fiber: 0.8 },
  { id: 510, name: '豆皮', category: 'dairy', calories: 260, protein: 24.5, carbs: 12.5, fat: 12.0, folicAcid: 22, calcium: 160, iron: 6.5, dha: 0, zinc: 2.2, vitaminC: 0, fiber: 0.3 },
  { id: 511, name: '腐竹', category: 'dairy', calories: 461, protein: 44.6, carbs: 21.3, fat: 21.7, folicAcid: 28, calcium: 77, iron: 16.5, dha: 0, zinc: 3.7, vitaminC: 0, fiber: 1.0 },

  // ==================== 坚果类 (nut) ====================
  { id: 601, name: '核桃', category: 'nut', calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, folicAcid: 98, calcium: 98, iron: 2.9, dha: 0, zinc: 3.1, vitaminC: 1.3, fiber: 6.7 },
  { id: 602, name: '杏仁', category: 'nut', calories: 578, protein: 21.2, carbs: 19.7, fat: 49.4, folicAcid: 44, calcium: 269, iron: 3.7, dha: 0, zinc: 3.1, vitaminC: 0, fiber: 12.5 },
  { id: 603, name: '腰果', category: 'nut', calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9, folicAcid: 25, calcium: 37, iron: 6.7, dha: 0, zinc: 5.6, vitaminC: 0.5, fiber: 3.3 },
  { id: 604, name: '花生', category: 'nut', calories: 567, protein: 24.8, carbs: 16.1, fat: 49.2, folicAcid: 240, calcium: 54, iron: 1.8, dha: 0, zinc: 3.3, vitaminC: 0, fiber: 8.5 },
  { id: 605, name: '开心果', category: 'nut', calories: 560, protein: 20.2, carbs: 27.5, fat: 45.3, folicAcid: 51, calcium: 105, iron: 3.9, dha: 0, zinc: 2.2, vitaminC: 5.6, fiber: 10.3 },
  { id: 606, name: '松子', category: 'nut', calories: 673, protein: 13.7, carbs: 13.1, fat: 68.4, folicAcid: 34, calcium: 12, iron: 5.2, dha: 0, zinc: 4.1, vitaminC: 0.8, fiber: 3.7 },
  { id: 607, name: '瓜子(葵花籽)', category: 'nut', calories: 584, protein: 19.5, carbs: 20.0, fat: 51.5, folicAcid: 227, calcium: 78, iron: 5.2, dha: 0, zinc: 5.6, vitaminC: 1.4, fiber: 8.6 },
  { id: 608, name: '瓜子(南瓜子)', category: 'nut', calories: 559, protein: 30.2, carbs: 10.7, fat: 46.1, folicAcid: 58, calcium: 43, iron: 8.8, dha: 0, zinc: 7.8, vitaminC: 1.9, fiber: 6.0 },
  { id: 609, name: '榛子', category: 'nut', calories: 628, protein: 15.0, carbs: 16.7, fat: 60.8, folicAcid: 62, calcium: 114, iron: 4.7, dha: 0, zinc: 2.5, vitaminC: 1.9, fiber: 9.7 },
  { id: 610, name: '夏威夷果', category: 'nut', calories: 718, protein: 7.9, carbs: 13.8, fat: 75.8, folicAcid: 11, calcium: 85, iron: 3.7, dha: 0, zinc: 1.3, vitaminC: 1.2, fiber: 8.6 },
  { id: 611, name: '巴旦木', category: 'nut', calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, folicAcid: 44, calcium: 269, iron: 3.7, dha: 0, zinc: 3.1, vitaminC: 0, fiber: 12.5 },
  { id: 612, name: '碧根果', category: 'nut', calories: 691, protein: 9.2, carbs: 13.9, fat: 72.0, folicAcid: 22, calcium: 70, iron: 2.5, dha: 0, zinc: 4.5, vitaminC: 1.1, fiber: 9.6 },
  { id: 613, name: '板栗', category: 'nut', calories: 185, protein: 4.2, carbs: 42.0, fat: 0.7, folicAcid: 22, calcium: 17, iron: 0.8, dha: 0, zinc: 0.5, vitaminC: 26, fiber: 5.3 },
  { id: 614, name: '莲子(干)', category: 'nut', calories: 332, protein: 17.2, carbs: 64.5, fat: 2.0, folicAcid: 16, calcium: 97, iron: 3.6, dha: 0, zinc: 3.2, vitaminC: 0, fiber: 3.0 },
  { id: 615, name: '芡实', category: 'nut', calories: 351, protein: 8.3, carbs: 79.6, fat: 0.3, folicAcid: 12, calcium: 37, iron: 0.4, dha: 0, zinc: 1.3, vitaminC: 6, fiber: 0.4 },

  // ==================== 零食类 (snack) ====================
  { id: 701, name: '海苔', category: 'snack', calories: 250, protein: 30.0, carbs: 40.0, fat: 4.0, folicAcid: 45, calcium: 180, iron: 12.0, dha: 0, zinc: 2.5, vitaminC: 0, fiber: 36.0 },
  { id: 702, name: '葡萄干', category: 'snack', calories: 299, protein: 3.1, carbs: 79.2, fat: 0.5, folicAcid: 2, calcium: 50, iron: 1.9, dha: 0, zinc: 0.2, vitaminC: 2.3, fiber: 3.7 },
  { id: 703, name: '蔓越莓干', category: 'snack', calories: 308, protein: 0.2, carbs: 82.4, fat: 1.4, folicAcid: 2, calcium: 8, iron: 0.3, dha: 0, zinc: 0.1, vitaminC: 0.2, fiber: 5.3 },
  { id: 704, name: '话梅', category: 'snack', calories: 220, protein: 1.2, carbs: 55.0, fat: 0.2, folicAcid: 1, calcium: 65, iron: 2.5, dha: 0, zinc: 0.3, vitaminC: 3, fiber: 3.0 },
  { id: 705, name: '牛肉干', category: 'snack', calories: 550, protein: 45.6, carbs: 15.0, fat: 33.5, folicAcid: 8, calcium: 20, iron: 4.0, dha: 0, zinc: 6.0, vitaminC: 0, fiber: 0 },
  { id: 706, name: '猪肉脯', category: 'snack', calories: 378, protein: 28.0, carbs: 35.0, fat: 13.5, folicAcid: 5, calcium: 15, iron: 2.5, dha: 0, zinc: 3.2, vitaminC: 0, fiber: 0.5 },
  { id: 707, name: '鱼片干', category: 'snack', calories: 350, protein: 58.0, carbs: 12.0, fat: 6.0, folicAcid: 12, calcium: 120, iron: 2.8, dha: 300, zinc: 1.5, vitaminC: 0, fiber: 0 },
  { id: 708, name: '鱿鱼丝', category: 'snack', calories: 312, protein: 60.0, carbs: 8.0, fat: 4.5, folicAcid: 15, calcium: 80, iron: 4.5, dha: 120, zinc: 2.2, vitaminC: 0, fiber: 0 },
  { id: 709, name: '魔芋爽', category: 'snack', calories: 10, protein: 0.2, carbs: 2.5, fat: 0.1, folicAcid: 0, calcium: 45, iron: 0.5, dha: 0, zinc: 0.2, vitaminC: 0, fiber: 3.0 },
  { id: 710, name: '海苔卷', category: 'snack', calories: 180, protein: 8.0, carbs: 25.0, fat: 6.0, folicAcid: 35, calcium: 120, iron: 8.0, dha: 0, zinc: 1.8, vitaminC: 0, fiber: 18.0 },
  { id: 711, name: '芝麻糊', category: 'snack', calories: 420, protein: 10.0, carbs: 65.0, fat: 15.0, folicAcid: 28, calcium: 780, iron: 22.7, dha: 0, zinc: 5.0, vitaminC: 0, fiber: 6.0 },
  { id: 712, name: '藕粉', category: 'snack', calories: 372, protein: 0.2, carbs: 93.0, fat: 0.1, folicAcid: 2, calcium: 8, iron: 17.9, dha: 0, zinc: 0.2, vitaminC: 0, fiber: 0.1 },
  { id: 713, name: '山楂片', category: 'snack', calories: 386, protein: 1.0, carbs: 92.0, fat: 0.6, folicAcid: 25, calcium: 52, iron: 0.8, dha: 0, zinc: 0.3, vitaminC: 20, fiber: 3.1 },
  { id: 714, name: '果冻', category: 'snack', calories: 62, protein: 0.2, carbs: 15.0, fat: 0.0, folicAcid: 0, calcium: 5, iron: 0.1, dha: 0, zinc: 0.1, vitaminC: 0, fiber: 0.1 },
  { id: 715, name: '酸奶块', category: 'snack', calories: 450, protein: 18.0, carbs: 65.0, fat: 12.0, folicAcid: 15, calcium: 350, iron: 0.5, dha: 0, zinc: 1.2, vitaminC: 2, fiber: 0 },
  { id: 716, name: '奶片', category: 'snack', calories: 480, protein: 15.0, carbs: 70.0, fat: 14.0, folicAcid: 8, calcium: 600, iron: 0.8, dha: 0, zinc: 2.0, vitaminC: 0, fiber: 0 },
  { id: 717, name: '巧克力', category: 'snack', calories: 546, protein: 4.9, carbs: 61.0, fat: 31.0, folicAcid: 5, calcium: 56, iron: 8.0, dha: 0, zinc: 2.3, vitaminC: 0, fiber: 5.4 },
  { id: 718, name: '饼干', category: 'snack', calories: 502, protein: 7.0, carbs: 64.0, fat: 25.0, folicAcid: 12, calcium: 35, iron: 2.5, dha: 0, zinc: 0.6, vitaminC: 0, fiber: 2.0 },
  { id: 719, name: '蛋糕', category: 'snack', calories: 348, protein: 6.0, carbs: 53.0, fat: 13.0, folicAcid: 18, calcium: 45, iron: 1.2, dha: 0, zinc: 0.5, vitaminC: 0, fiber: 0.8 },
  { id: 720, name: '蛋黄派', category: 'snack', calories: 398, protein: 5.0, carbs: 58.0, fat: 16.0, folicAcid: 15, calcium: 25, iron: 1.0, dha: 5, zinc: 0.4, vitaminC: 0, fiber: 0.5 }
];

// 获取所有食物
function getAllFoods() {
  return foodDatabase;
}

// 按名称模糊搜索
function searchFoods(keyword) {
  if (!keyword) return [];
  const lowerKeyword = keyword.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerKeyword)
  );
}

// 按分类获取
function getFoodsByCategory(category) {
  return foodDatabase.filter(food => food.category === category);
}

// 按ID获取
function getFoodById(id) {
  return foodDatabase.find(food => food.id === id) || null;
}

// 随机获取指定分类的N个食物（转盘用）
function getRandomFoodsByCategory(category, count) {
  const foods = getFoodsByCategory(category);
  if (foods.length === 0) return [];
  
  const shuffled = [...foods].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

module.exports = {
  foodDatabase,
  getAllFoods,
  searchFoods,
  getFoodsByCategory,
  getFoodById,
  getRandomFoodsByCategory
};
