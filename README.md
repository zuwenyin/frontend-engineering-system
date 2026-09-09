# frontend-engineering-system2

从零搭建的前端工程管理实践项目，用 pnpm Monorepo 沉淀应用、公共包与工程规范。

## 当前状态

已落地：

- pnpm Workspace Monorepo（`apps/*` + `packages/*`）
- 主应用 `apps/web`（React + TypeScript + Vite）
- 共享包：`ui`、`utils`、`eslint-config`、`ts-config`
- 统一代码规范：ESLint / Prettier / TypeScript
- Git 质量门禁：Husky + lint-staged + Commitlint

规划中 / 占位：

- `apps/admin`（目录已创建，尚未接入）
- 测试体系、CI、自动化部署、脚手架与团队规范文档

## 环境要求

- Node.js `>= 22.0.0`（见 `.nvmrc`）
- pnpm `11.x`（由 `packageManager` 锁定为 `pnpm@11.9.0`）

启用 Corepack 后安装依赖：

```bash
corepack enable
pnpm install
```

根目录 `.npmrc` 开启了 `engine-strict=true`，Node / pnpm 版本不满足会直接安装失败。

## 仓库结构

```text
.
├── apps/
│   ├── web/                 # 主应用（已接入）
│   └── admin/               # 预留应用（空目录）
├── packages/
│   ├── ui/                  # 共享 UI 组件
│   ├── utils/               # 共享工具函数
│   ├── eslint-config/       # 共享 ESLint 配置
│   └── ts-config/           # 共享 TypeScript 配置
├── docs/                    # 文档占位
├── commitlint.config.mjs
├── lint-staged.config.mjs
├── pnpm-workspace.yaml
└── package.json
```

### 应用

| 包名  | 路径         | 说明                                                               |
| ----- | ------------ | ------------------------------------------------------------------ |
| `web` | `apps/web`   | React 19 + Vite 8 + Tailwind CSS 4 + React Router + TanStack Query |
| —     | `apps/admin` | 预留，尚未初始化                                                   |

`apps/web` 源码大致按分层组织：

- `app/`：应用入口、布局、路由、全局 Provider
- `pages/`：页面级组装（home / users / settings / not-found）
- `entities/`：领域实体（如 `user` 的 api / model / ui）
- `shared/`：跨页面能力（env、http 等）

### 共享包

| 包名                                          | 路径                     | 说明                                                |
| --------------------------------------------- | ------------------------ | --------------------------------------------------- |
| `@frontend-engineering-system2/ui`            | `packages/ui`            | 基础组件：`Badge` / `Button` / `Card` / `PageTitle` |
| `@frontend-engineering-system2/utils`         | `packages/utils`         | 通用工具，例如 `readBoolean`                        |
| `@frontend-engineering-system2/eslint-config` | `packages/eslint-config` | 导出 `base` / `react` 配置                          |
| `@frontend-engineering-system2/ts-config`     | `packages/ts-config`     | 导出 `base` / `node` / `react-app` 配置             |

应用通过 `workspace:*` 引用内部包，例如：

```json
"@frontend-engineering-system2/ui": "workspace:*",
"@frontend-engineering-system2/utils": "workspace:*"
```

## 常用命令

在仓库根目录执行：

```bash
pnpm dev              # 启动 apps/web 开发服务器
pnpm build            # 构建 apps/web（production）
pnpm build:staging    # 构建 apps/web（staging）
pnpm preview          # 预览 apps/web 构建产物
pnpm lint             # 递归执行各包 lint（若存在）
pnpm typecheck        # 递归执行各包 typecheck（若存在）
pnpm format           # Prettier 格式化全仓
pnpm format:check     # 检查 Prettier 格式
pnpm check            # lint + typecheck + build
```

针对单个包可用 filter：

```bash
pnpm --filter web dev
pnpm --filter @frontend-engineering-system2/ui lint
pnpm --filter @frontend-engineering-system2/utils typecheck
```

## 环境变量（apps/web）

Vite 通过 `VITE_*` 注入环境变量，示例见 `apps/web/.env.example`：

```bash
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCK=true
VITE_ENABLE_MONITORING=false
```

已提供：

- `.env.development`
- `.env.staging`
- `.env.production`

业务侧通过 `apps/web/src/shared/config/env.ts` 统一读取，不要在业务代码里直接散落 `import.meta.env`。

## 工程规范

- **ESLint**：应用与包复用 `@frontend-engineering-system2/eslint-config`
- **TypeScript**：复用 `@frontend-engineering-system2/ts-config`
- **Prettier**：根目录统一格式化
- **Husky**
  - `pre-commit`：跑 lint-staged（ESLint fix + Prettier）
  - `commit-msg`：Commitlint（Conventional Commits）

提交信息建议遵循 Conventional Commits，例如：

```text
feat: add user list page
fix(web): correct staging api base url
chore: update shared eslint config
```

## 路线图

后续计划继续覆盖：

- 测试体系（单测 / 组件测 / E2E）
- CI 质量门禁与自动化检查
- 多环境部署与上线后治理
- 工程模板、脚手架与团队规范文档
- 完善 `apps/admin` 等更多应用
