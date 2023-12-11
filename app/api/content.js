const Router = require("@koa/router");
var robot = require("robotjs");
const { exec } = require('child_process');
const iconv = require('iconv-lite');
const users = require('../../data/users')

const contentRouter = new Router({
  // 设置路由前缀 /content
  prefix: "/content",
});

function sleep (time){
  return new Promise(resolve => setTimeout(resolve,time));
}

// 获取文章内容接口
contentRouter.get("/", async (ctx) => {
  console.log(users)
  openWX();
  search('Chris Wu')
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
  for(let user of users){
    console.log(user.nickname)
    robot.keyToggle("control", "down");
    robot.keyTap("f");
    await robot.keyToggle("control", "up");
    await exec('clip').stdin.end(iconv.encode(user.nickname, 'gbk'));
    await sleep(200);


    robot.keyToggle("control", "down");
    robot.keyTap("v");
    robot.keyToggle("control", "up");


    robot.keyTap("enter");
    console.log(111)
    await sendMsg(user.msg);
    await sleep(200);
  }
  // robot.keyToggle("control", "down");
  // robot.keyTap("f");
  // await robot.keyToggle("control", "up");
  // await exec('clip').stdin.end(iconv.encode(name, 'gbk'));
  // await sleep(200);

  // robot.keyToggle("control", "down");
  // robot.keyTap("v");
  // robot.keyToggle("control", "up");


  // robot.keyTap("enter");
 

  // sendMsg('自动发送测试');
}


async function sendMsg(msg){
  await sleep(200)
  await exec('clip').stdin.end(iconv.encode(msg, 'gbk'));
  await sleep(200);
  robot.keyToggle("control", "down");
  robot.keyTap("v");
  robot.keyToggle("control", "up");
  robot.keyTap("enter");
}

module.exports = contentRouter;
