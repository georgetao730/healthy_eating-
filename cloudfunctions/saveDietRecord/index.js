const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  const {
    recordId,
    action,
    date,
    mealType,
    foodName,
    amount,
    calories,
    protein,
    carbs,
    fat,
    folicAcid,
    calcium,
    iron,
    dha,
    zinc,
    vitaminC,
    fiber
  } = event;
  
  try {
    // 删除操作
    if (action === 'delete' && recordId) {
      await db.collection('diet_records').doc(recordId).remove();
      return {
        code: 0,
        message: '删除成功'
      };
    }
    
    // 更新操作
    if (recordId) {
      await db.collection('diet_records').doc(recordId).update({
        data: {
          date,
          mealType,
          foodName,
          amount,
          calories,
          protein,
          carbs,
          fat,
          folicAcid: folicAcid || 0,
          calcium: calcium || 0,
          iron: iron || 0,
          dha: dha || 0,
          zinc: zinc || 0,
          vitaminC: vitaminC || 0,
          fiber: fiber || 0,
          updatedAt: db.serverDate()
        }
      });
      return {
        code: 0,
        message: '更新成功'
      };
    }
    
    // 新增操作
    const result = await db.collection('diet_records').add({
      data: {
        _openid: openid,
        date,
        mealType,
        foodName,
        amount,
        calories,
        protein,
        carbs,
        fat,
        folicAcid: folicAcid || 0,
        calcium: calcium || 0,
        iron: iron || 0,
        dha: dha || 0,
        zinc: zinc || 0,
        vitaminC: vitaminC || 0,
        fiber: fiber || 0,
        createdAt: db.serverDate()
      }
    });
    
    return {
      code: 0,
      data: { recordId: result._id },
      message: '保存成功'
    };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
