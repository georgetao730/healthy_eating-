const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  try {
    // 查询用户是否已存在
    const userRes = await db.collection('users').where({ _openid: openid }).get();
    
    if (userRes.data.length === 0) {
      // 新用户 - 创建记录
      await db.collection('users').add({
        data: {
          _openid: openid,
          nickName: event.nickName || '准妈妈',
          dueDate: '',
          height: 0,
          prePregnancyWeight: 0,
          createdAt: db.serverDate()
        }
      });
    }
    
    return {
      code: 0,
      openid: openid,
      userInfo: userRes.data.length > 0 ? userRes.data[0] : null,
      message: 'success'
    };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
