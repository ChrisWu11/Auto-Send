const Router = require("@koa/router");
const Auth = require("../../middlewares/auth");
var robot = require("robotjs");
const { exec } = require('child_process');
const iconv = require('iconv-lite');

const contentRouter = new Router({
  // 设置路由前缀 /content
  prefix: "/content",
});

function sleep (time){
  return new Promise(resolve => setTimeout(resolve,time));
}

// 获取文章内容接口
contentRouter.get("/", async (ctx) => {
  openWX();
  sleep(500);
  search('鸿金')
  ctx.body = "发送成功";
});

function openWX(){
  robot.keyToggle("alt", "down");
  robot.keyToggle("control", "down");
  robot.keyTap("w");
  robot.keyToggle("alt", "up");
  robot.keyToggle("control", "up");
}

async function search(name){
  console.log(1);
  robot.keyToggle("control", "down");
  robot.keyTap("f");
  await robot.keyToggle("control", "up");
  console.log(2);

  // sleep(200);
  await exec('clip').stdin.end(iconv.encode(name, 'gbk'));
  await sleep(200);
  // robot.typeString(name);
  robot.keyToggle("control", "down");
  robot.keyTap("v");
  robot.keyToggle("control", "up");
  console.log(3);

  // sleep(1000);
  robot.keyTap("enter");
  // sleep(2500);
  console.log(4);

  sendMsg('自动发送测试');
}


async function sendMsg(msg){
  await sleep(200)
  console.log(5);

  await exec('clip').stdin.end(iconv.encode(msg, 'gbk'));
  console.log(6);

  await sleep(200);
  robot.keyToggle("control", "down");
  robot.keyTap("v");
  robot.keyToggle("control", "up");
  console.log(7);

  // sleep(2500);
  robot.keyTap("enter");
  console.log(8);

}

// 新增文章内容接口
contentRouter.post("/", new Auth(1).middleware, async (ctx) => {
  ctx.body = "新增文章内容成功";
});

module.exports = contentRouter;
