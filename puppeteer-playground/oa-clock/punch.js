const dayjs = require('dayjs');
const puppeteer = require('puppeteer'); // v13.0.0 or later
const username = 'jiangyi@corp-ci.com';
const password = 'jy19950301,'
const start = '2017-03-27'; // 入职时间


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({"width":1440,"height":789})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("http://oa.corp-ci.com/oa.php/login");
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/邮箱OR姓名拼音"],["body > div > div.login-content > div > div > form > div:nth-child(2) > input"],["xpath//html/body/div/div[2]/div/div/form/div[2]/input"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/邮箱OR姓名拼音"],["body > div > div.login-content > div > div > form > div:nth-child(2) > input"],["xpath//html/body/div/div[2]/div/div/form/div[2]/input"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 76,
            y: 29.71875,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/邮箱OR姓名拼音"],["body > div > div.login-content > div > div > form > div:nth-child(2) > input"],["xpath//html/body/div/div[2]/div/div/form/div[2]/input"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/邮箱OR姓名拼音"],["body > div > div.login-content > div > div > form > div:nth-child(2) > input"],["xpath//html/body/div/div[2]/div/div/form/div[2]/input"]], targetPage, { timeout, visible: true });
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select(username);
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type(username);
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, username);
        }
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/打卡系统密码"],["body > div > div.login-content > div > div > form > div:nth-child(3) > input"],["xpath//html/body/div/div[2]/div/div/form/div[3]/input"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/打卡系统密码"],["body > div > div.login-content > div > div > form > div:nth-child(3) > input"],["xpath//html/body/div/div[2]/div/div/form/div[3]/input"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 70,
            y: 22.8671875,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/打卡系统密码"],["body > div > div.login-content > div > div > form > div:nth-child(3) > input"],["xpath//html/body/div/div[2]/div/div/form/div[3]/input"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/打卡系统密码"],["body > div > div.login-content > div > div > form > div:nth-child(3) > input"],["xpath//html/body/div/div[2]/div/div/form/div[3]/input"]], targetPage, { timeout, visible: true });
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select(password);
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type(password);
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, password);
        }
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await scrollIntoViewIfNeeded([["aria/立即登录"],["body > div > div.login-content > div > div > form > button"],["xpath//html/body/div/div[2]/div/div/form/button"],["text/立即登录"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/立即登录"],["body > div > div.login-content > div > div > form > button"],["xpath//html/body/div/div[2]/div/div/form/button"],["text/立即登录"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 114,
            y: 15.015625,
          },
        });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[1];
        await scrollIntoViewIfNeeded([["aria/个人打卡列表","aria/[role=\"generic\"]"],["body > div > div > dl.subnav-item.subnav-open.checked > dd > a:nth-child(4) > div"],["xpath//html/body/div/div/dl[1]/dd/a[4]/div"],["text/个人打卡列表"]], frame, timeout);
        const element = await waitForSelectors([["aria/个人打卡列表","aria/[role=\"generic\"]"],["body > div > div > dl.subnav-item.subnav-open.checked > dd > a:nth-child(4) > div"],["xpath//html/body/div/div/dl[1]/dd/a[4]/div"],["text/个人打卡列表"]], frame, { timeout, visible: true });
        await element.click({
          offset: {
            x: 84,
            y: 27,
          },
        });
    }

    async function punch(start_time, end_time) {
      console.log('pubch', start_time, end_time)
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          await scrollIntoViewIfNeeded([["#start_time"],["xpath///*[@id=\"start_time\"]"]], frame, timeout);
          const element = await waitForSelectors([["#start_time"],["xpath///*[@id=\"start_time\"]"]], frame, { timeout, visible: true });
          await element.click({
            offset: {
              x: 90,
              y: 22.8671875,
            },
          });
      }
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          await scrollIntoViewIfNeeded([["#start_time"],["xpath///*[@id=\"start_time\"]"]], frame, timeout);
          const element = await waitForSelectors([["#start_time"],["xpath///*[@id=\"start_time\"]"]], frame, { timeout, visible: true });
          await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, start_time);
      }
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          await scrollIntoViewIfNeeded([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, timeout);
          const element = await waitForSelectors([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, { timeout, visible: true });
          await element.click({
            offset: {
              x: 31.21875,
              y: 17.8671875,
            },
          });
      }
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          await scrollIntoViewIfNeeded([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, timeout);
          const element = await waitForSelectors([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, { timeout, visible: true });
          await element.click({
            delay: 525.8999999985099,
            offset: {
              x: 3.21875,
              y: 14.8671875,
            },
          });
      }
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          await scrollIntoViewIfNeeded([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, timeout);
          const element = await waitForSelectors([["#end_time"],["xpath///*[@id=\"end_time\"]"]], frame, { timeout, visible: true });
          await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, end_time);
      }
      {
          const targetPage = page;
          let frame = targetPage.mainFrame();
          frame = frame.childFrames()[2];
          const promises = [];
          promises.push(frame.waitForNavigation());
          await scrollIntoViewIfNeeded([["aria/搜 索"],["#print_area > div.punch-box.wrap > div.search-box.justify-search > button.btn.search-btn"],["xpath///*[@id=\"print_area\"]/div[2]/div[2]/button[1]"],["text/搜 索"]], frame, timeout);
          const element = await waitForSelectors([["aria/搜 索"],["#print_area > div.punch-box.wrap > div.search-box.justify-search > button.btn.search-btn"],["xpath///*[@id=\"print_area\"]/div[2]/div[2]/button[1]"],["text/搜 索"]], frame, { timeout, visible: true });
          await element.click({
            offset: {
              x: 55.328125,
              y: 11.8671875,
            },
          });
          await Promise.all(promises);
      }

      {
        page.waitForNetworkIdle()
        await page.screenshot({
          path: `punch/${start_time}~${end_time}.png`,
        });
      }
    }

    async function next (start) {
      const now = new Date();
      const startDate = new Date(start)
      if (startDate > now) {
        return 
      }
      const end = dayjs(start).add(7, 'day').format('YYYY-MM-DD')
      await punch(start, end)
      await next(end)
    }

    await next(start)
    
    await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
      const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
      if (!element) {
        throw new Error(
          'The element could not be found.'
        );
      }
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      const timeoutId = setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          clearTimeout(timeoutId);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
