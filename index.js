let puppeteer = require('puppeteer');
let fs = require('fs');

async function init() {

  try {
    let browser = await puppeteer.launch();

    let page = await browser.newPage();

    await page.goto(process.argv[2]);

    let data = await page.evaluate(() => {

      let hasData = e => (e ? e : "无数据");

      // dom
      let title = document.title;

      // template
      return `
  # dom-data

  > 通过puppeteer插件,获取相关dom所展示的数据

  ## 网站标题:${hasData(title)}`;

    });

    await browser.close();

    fs.writeFile('README.md', data, err => {
      if (!err) {
        console.log('ok')
      }
    });

  } catch (e) {
    console.log(e.message);
  }
}

init();