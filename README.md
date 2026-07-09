# Java 面试知识库

一套基于纯 HTML/CSS/JS 的 Java 后端面试复习站点，无需构建工具，双击 `index.html` 即可本地使用。

## 页面目录

| 文件 | 内容 | 面试题 |
|------|------|--------|
| [index.html](index.html) | 首页导航总览 | — |
| [juc.html](juc.html) | JUC 并发编程 — JMM / synchronized / volatile / CAS / AQS / 线程池 / 虚拟线程 | ×19 |
| [spring.html](spring.html) | Spring — IoC / Bean 生命周期 / AOP / 事务 / 三级缓存循环依赖 | ×19 |
| [gc-principles.html](gc-principles.html) | JVM GC — G1（Region / SATB / RSet / CSet / Evacuation / Young GC 机制 / 完整流程）& ZGC（染色指针 / 多重映射 / 读屏障 / 并发周期）& CMS | ×27 |
| [mysql.html](mysql.html) | MySQL — B+ Tree 索引 / MVCC / 锁 / 日志 / 主从复制 | ×19 |
| [redis.html](redis.html) | Redis — 数据结构 / 持久化 / 缓存三大问题 / 分布式锁 / 淘汰策略 / 哨兵 & Cluster | ×18 |
| [mq.html](mq.html) | 消息队列 — Kafka / RocketMQ / 可靠性 / 顺序 / 幂等 | ×17 |
| [distributed.html](distributed.html) | 分布式系统 — CAP / 分布式事务 / 分布式锁 / 注册中心 / Snowflake / 限流熔断 | ×18 |
| [jvm.html](jvm.html) | JVM 内存与类加载 — 运行时数据区 / 对象内存布局 / Class 文件结构 / 类加载机制 / 双亲委派 / JIT | ×19 |
| [architecture.html](architecture.html) | 架构设计 — 微服务（拆分/通信/注册发现/配置中心/API 网关/分布式事务/服务容错/可观测性/灰度治理）与 DDD 领域驱动设计（战略设计/战术建模/贫血充血/领域事件/CQRS/四层架构落地），面试题以实战场景为主 | ×16 |

## 使用方式

双击 `index.html` 用浏览器直接打开，无需安装任何依赖或启动服务器。

```
# Windows
start index.html

# macOS
open index.html
```

## 功能特性

- **深色模式** — 右上角切换，偏好持久化至 `localStorage`
- **侧边栏导航** — 滚动自动高亮当前章节，移动端为抽屉式弹出
- **手风琴问答** — 支持单题展开 / 全部展开收起
- **全页搜索** — `Ctrl+K` 或 `/` 触发，客户端模糊匹配
- **阅读进度条** — 页面顶部实时显示阅读进度
- **代码高亮** — 检测到 Java / Shell 代码时懒加载 Prism.js
- **移动端适配** — 响应式布局，侧边栏抽屉，表格横向滚动

## 文件结构

```
interview/
├── index.html            # 首页（引用 shared.css / index.css / shared.js / search-data.js）
├── juc.html              # JUC 并发编程
├── spring.html           # Spring 框架原理
├── gc-principles.html    # JVM GC 原理
├── mysql.html            # MySQL 核心知识
├── redis.html            # Redis 原理
├── mq.html               # 消息队列
├── distributed.html      # 分布式系统
├── jvm.html              # JVM 内存与类加载
├── architecture.html     # 架构设计（微服务 / DDD 领域驱动，实战为主）
├── style/
│   ├── shared.css        # 公共样式（设计 token、布局、移动端适配、深色模式）
│   ├── shared.js         # 公共脚本（侧边栏、手风琴、搜索、TOC、深色模式切换）
│   ├── index.css         # 首页卡片专属样式
│   └── search-data.js    # 全页搜索索引数据
└── README.md
```

## 外部依赖（仅 CDN，无本地安装）

| 依赖 | 用途 |
|------|------|
| Google Fonts | Outfit、DM Mono 字体 |
| Zeoseven Fonts API | 更纱黑体 SC（CJK 中文）|
| Prism.js 1.29.0 | 代码语法高亮（按需懒加载）|
