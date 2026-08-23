## 环境要求

- Node.js >= 22.0.0
- pnpm 11.x

本项目通过 `packageManager` 固定包管理器版本，并通过 `pnpm-workspace.yaml` 管理 Monorepo 工作区。

## 安装依赖

```bash
corepack enable
pnpm install
```

## 常用命令

```bash
pnpm dev
pnpm build
pnpm preview
```

- `pnpm dev`：从根目录启动 `apps/web` 开发服务器。
- `pnpm build`：构建 `apps/web`。
- `pnpm preview`：本地预览 `apps/web` 构建产物。