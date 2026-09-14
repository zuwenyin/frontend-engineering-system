# @zuwy/frontend-engineering-system-utils

## 0.2.1

### Patch Changes

- 64fe143: feat: 增加CHANFELOG.md文件

## 0.2.0

### Minor Changes

- 6bda594: ## feat(utils): 新增一批通用工具函数

  新增一批通用工具函数，全部从包入口导出，并附带 JSDoc 使用示例。属于**向后兼容的功能新增**，版本号按 **minor** 递增（`0.1.0` → `0.2.0`）。

  ### ✨ 新增内容

  | 分类     | 方法                                                  | 说明                                    |
  | -------- | ----------------------------------------------------- | --------------------------------------- |
  | 类型判断 | `isNil` · `isDefined` · `isPlainObject` · `isEmpty`   | 空值 / 类型守卫 / 空判定                |
  | 数组     | `unique` · `uniqueBy` · `chunk` · `groupBy`           | 去重、按 key 去重、分块、分组           |
  | 对象     | `pick` · `omit` · `deepClone`                         | 属性挑选 / 剔除、深拷贝                 |
  | 字符串   | `capitalize` · `truncate` · `camelCase` · `kebabCase` | 首字母大写、截断、命名风格转换          |
  | 数字     | `clamp` · `randomInt`                                 | 区间钳制、随机整数                      |
  | 函数     | `debounce` · `throttle` · `once`                      | 防抖 / 节流（均带`cancel`）、只执行一次 |
  | 异步     | `sleep` · `retry`                                     | 延时、失败重试                          |

  ### 📦 导出方式

  所有方法均从包入口统一导出：

  ```ts
  import { debounce, groupBy, retry, sleep, isNil } from "@zuwy/frontend-engineering-system-utils"
  ```

  ### 📝 文档

  每个方法均补充了 JSDoc 注释，包含 `@param`、`@returns` 与 `@example` 使用示例，IDE 中可直接查看提示与用法。

  ### 🏷️ 版本影响
  - 变更类型：`minor`（向后兼容的功能新增）
  - 升级建议：可以直接升级，无需改动现有代码
