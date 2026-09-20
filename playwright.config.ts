import { defineConfig, devices } from "@playwright/test"

// defineConfig 用于定义 Playwright 配置。
// 它可以提供类型检查和编辑器代码提示。
export default defineConfig({
  // 指定 E2E 测试文件所在的目录。
  // Playwright 会在根目录的 e2e 目录中查找测试文件，
  // 例如 e2e/users.spec.ts。
  testDir: "./e2e",

  // 设置每个测试用例的最长运行时间，单位为毫秒。
  // 30_000 表示 30 秒。
  // 单个测试超过 30 秒仍未结束，就会被判定为失败。
  timeout: 30_000,

  // 设置测试失败后的重试次数。
  // 0 表示失败后不自动重试。
  retries: 0,

  // 配置测试结果的输出方式。
  reporter: [
    // list reporter 会在终端中逐条显示测试结果。
    ["list"],

    // html reporter 会生成 HTML 测试报告。
    // open: "never" 表示运行结束后不自动打开报告。
    // 可以通过 pnpm test:e2e:report 手动查看。
    ["html", { open: "never" }],
  ],

  // use 中的配置会应用于所有测试和浏览器项目。
  use: {
    // 设置被测试应用的基础地址。
    // 配置后，page.goto("/") 会访问：
    // http://127.0.0.1:4173/
    baseURL: "http://127.0.0.1:4173",

    // 记录测试执行过程中的 trace。
    // retain-on-failure 表示测试通过时删除 trace，
    // 只有测试失败时才保留，用于查看操作、DOM 和网络请求。
    trace: "retain-on-failure",

    // 控制测试截图。
    // only-on-failure 表示只在测试失败时保存截图。
    screenshot: "only-on-failure",
  },

  // 配置运行测试前需要启动的本地 Web 服务。
  webServer: {
    // Playwright 运行测试前会执行该命令。
    // 当前命令会构建 UI 包，并以 E2E 模式启动 apps/web。
    command: "pnpm dev:e2e",

    // Playwright 会等待这个地址可以访问，
    // 确认可访问后才开始运行测试。
    url: "http://127.0.0.1:4173",

    // 等待 Web 服务启动的最长时间，单位为毫秒。
    // 120_000 表示最多等待 120 秒。
    // 超时后仍无法访问 url，E2E 测试会直接失败。
    timeout: 120_000,
  },

  // projects 用于定义需要在哪些浏览器或设备环境中运行测试。
  projects: [
    {
      // 当前浏览器项目的名称。
      // 测试报告和终端输出中会显示 chromium。
      name: "chromium",

      // 当前项目专属的浏览器配置。
      use: {
        // 使用 Playwright 内置的 Desktop Chrome 设备参数。
        // 展开后包含桌面端视口、userAgent、deviceScaleFactor
        // 以及是否为移动设备等配置。
        //
        // 这里实际仍然使用 Playwright 下载的 Chromium，
        // Desktop Chrome 主要提供桌面版 Chrome 的设备参数，
        // 并不表示调用电脑中安装的 Google Chrome。
        ...devices["Desktop Chrome"],
      },
    },
  ],
})
