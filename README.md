# 孕期饮食管家

一款专为孕期妈妈设计的健康饮食管理微信小程序，提供科学的饮食记录、营养分析和智能决策功能。

## 功能特性

### 首页今日概览
- **孕周自动计算**：根据预产期自动显示当前孕周和天数
- **卡路里环形图**：可视化展示今日热量摄入与推荐值对比
- **营养素进度条**：蛋白质、碳水化合物、脂肪的摄入进度一目了然
- **快捷入口**：快速跳转到记录、营养分析等核心功能

### 饮食记录
- **按餐次分类**：早餐、午餐、晚餐、加餐独立管理
- **220+食物数据库**：覆盖主食、肉蛋、蔬菜、水果、汤品、乳制品、坚果、零食8大分类
- **智能搜索**：支持模糊搜索，快速定位食物
- **营养预览**：添加前即可查看食物的营养成分
- **份量记录**：灵活设置食物克重，自动计算营养摄入

### 营养分析
- **宏量营养素对比**：热量、蛋白质、碳水、脂肪的摄入vs推荐值
- **微量营养素追踪**：叶酸、钙、铁、DHA、锌、维生素C、膳食纤维
- **孕期标准**：根据孕早期/中期/晚期自动调整营养推荐值
- **营养状态标识**：直观显示不足、达标、过量状态
- **7天趋势图**：历史摄入数据可视化分析

### 转盘决策
- **Canvas动画转盘**：流畅的旋转动画效果
- **分类筛选**：按食物分类筛选转盘选项
- **随机推荐**：解决"今天吃什么"的选择困难
- **结果展示**：显示选中食物的营养信息

### 个人中心
- **预产期设置**：自动计算孕周和营养需求
- **外卖跳转**：一键跳转饿了么、美团小程序
- **数据管理**：查看历史记录、清除数据
- **微信登录**：快速授权登录

## 技术栈

- **前端**：原生微信小程序（WXML + WXSS + JavaScript）
- **后端**：微信云开发（云函数 + 云数据库 + 云存储）
- **UI风格**：温馨柔和的孕期主题（粉色 #F8A5B6 / 浅绿 #A8D8B9，圆角卡片设计）

## 项目结构

```
healthy_eating/
├── cloudfunctions/           # 云函数
│   ├── login/               # 用户登录
│   ├── getDailyRecord/      # 获取每日饮食记录
│   ├── saveDietRecord/      # 保存饮食记录
│   └── getNutritionReport/  # 获取营养分析报告
├── miniprogram/
│   ├── components/          # 自定义组件
│   │   ├── calorie-ring/    # 卡路里环形图
│   │   ├── nutrient-bar/    # 营养素进度条
│   │   ├── food-card/       # 食物卡片
│   │   └── lucky-wheel/     # 转盘组件
│   ├── pages/               # 页面
│   │   ├── index/           # 首页
│   │   ├── record/          # 饮食记录列表
│   │   ├── record-add/      # 添加记录
│   │   ├── nutrition/       # 营养分析
│   │   ├── wheel/           # 转盘决策
│   │   └── profile/         # 个人中心
│   ├── utils/               # 工具模块
│   │   ├── food-database.js # 食物数据库（220+食物）
│   │   ├── nutrition-calc.js# 营养计算工具
│   │   ├── pregnancy-standards.js # 孕期营养标准
│   │   └── util.js          # 通用工具
│   ├── app.js               # 应用入口
│   ├── app.json             # 全局配置
│   └── app.wxss             # 全局样式
└── project.config.json      # 项目配置
```

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd healthy_eating-
```

### 2. 配置项目

1. 使用**微信开发者工具**打开项目
2. 在 `project.config.json` 中替换你的 AppID：
   ```json
   "appid": "你的小程序AppID"
   ```

### 3. 开通云开发

1. 在微信开发者工具中点击「云开发」按钮
2. 创建云开发环境（首次使用需要开通）
3. 记录环境 ID，在 `app.js` 中配置：
   ```javascript
   wx.cloud.init({
     env: '你的云开发环境ID',
     traceUser: true
   })
   ```

### 4. 创建数据库集合

在云开发控制台的数据库中创建以下集合：

- `users`：存储用户基本信息
- `diet_records`：存储饮食记录

### 5. 部署云函数

在微信开发者工具中：
1. 右键 `cloudfunctions/login` → 「创建并部署：云端安装依赖」
2. 右键 `cloudfunctions/getDailyRecord` → 「创建并部署：云端安装依赖」
3. 右键 `cloudfunctions/saveDietRecord` → 「创建并部署：云端安装依赖」
4. 右键 `cloudfunctions/getNutritionReport` → 「创建并部署：云端安装依赖」

### 6. 运行项目

点击微信开发者工具的「编译」按钮，即可在模拟器中预览小程序。

## 数据库设计

### users 集合

| 字段 | 类型 | 说明 |
|------|------|------|
| _openid | String | 用户唯一标识 |
| dueDate | Date | 预产期 |
| height | Number | 身高(cm) |
| preWeight | Number | 孕前体重(kg) |
| createTime | Date | 创建时间 |
| updateTime | Date | 更新时间 |

### diet_records 集合

| 字段 | 类型 | 说明 |
|------|------|------|
| _openid | String | 用户唯一标识 |
| date | String | 日期 (YYYY-MM-DD) |
| mealType | String | 餐次 (breakfast/lunch/dinner/snack) |
| foodId | Number | 食物ID |
| foodName | String | 食物名称 |
| amount | Number | 份量(克) |
| calories | Number | 热量(kcal) |
| protein | Number | 蛋白质(g) |
| carbs | Number | 碳水化合物(g) |
| fat | Number | 脂肪(g) |
| folicAcid | Number | 叶酸(μg) |
| calcium | Number | 钙(mg) |
| iron | Number | 铁(mg) |
| dha | Number | DHA(mg) |
| zinc | Number | 锌(mg) |
| vitaminC | Number | 维生素C(mg) |
| fiber | Number | 膳食纤维(g) |
| createTime | Date | 创建时间 |

## 截图预览

> 截图待补充

<!-- 
| 首页 | 饮食记录 | 营养分析 | 转盘决策 | 个人中心 |
|------|----------|----------|----------|----------|
| ![首页]() | ![记录]() | ![营养]() | ![转盘]() | ![我的]() |
-->

## 数据来源

食物营养数据参考《中国食物成分表标准版》

## License

MIT License
