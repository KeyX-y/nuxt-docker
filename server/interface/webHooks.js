const Router = require('koa-router')
const axios = require('./utils/axios')
const crypto = require('crypto-js')
const { execSync } = require('child_process');

let router = new Router()

/**
 * 创建子进程，执行命令
 * @param {String} command 需要执行的命令
 * @param {Boolean} reBuild 是否重新构建应用
 * @param {Function} callback 执行命令后的回调
 */
function execCommand(command, reBuild, callback) {
  command && execSync(command, { stdio: [0, 1, 2] }, callback);
  // 根据配置文件，重新构建项目
  console.log('构建新项目')
  // reBuild && build();
}

function upgrade() {
  execCommand('git pull -f && npm install', true);
}

router.post('/webhooks', async (ctx) => {
  const SECRET_TOKEN = 'eWFfeGlhb0AxNjMuY29t';
  // 计算签名
  // const signature = `sha1=${crypto
  //   .createHmac('sha1', SECRET_TOKEN)
  //   .update(JSON.stringify(req.body))
  //   .digest('hex')}`;
  // // 验证签名和 Webhooks 请求中的签名是否一致
  // const isValid = signature === req.headers['x-hub-signature'];
  if (true) {
    ctx.body = {
      msg: 'Authorized'
    }
    upgrade();
  } else {
    // 鉴权失败，返回无权限提示
    ctx.body = {
      msg: 'Permission Denied'
    }
  }
})

module.exports = router