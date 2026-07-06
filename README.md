# Java 面试知识库

一套基于纯 HTML/CSS/JS 的 Java 后端面试复习站点，无需构建工具，双击 `index.html` 即可本地使用。

## 页面目录

| 文件 | 内容 |
|------|------|
| [index.html](index.html) | 首页导航 — Java 面试知识库总览 |
| [gc-principles.html](gc-principles.html) | JVM GC — G1 & ZGC 深度解析 |
| [spring.html](spring.html) | Spring — IoC / AOP / 事务 / 循环依赖 |
| [mysql.html](mysql.html) | MySQL — 索引 / 事务 / MVCC / 锁 / 主从 |
| [redis.html](redis.html) | Redis — 数据结构 / 持久化 / 集群 / 分布式锁 |
| [mq.html](mq.html) | 消息队列 — Kafka / RocketMQ / 可靠性 / 幂等 / 顺序，面试题 ×15 |
| [juc.html](juc.html) | JUC 并发编程 — JMM / synchronized / CAS / AQS / 线程池 / 虚拟线程，面试题 ×16 |
| [distributed.html](distributed.html) | 分布式系统 — CAP / 分布式事务 / 分布式锁 / 注册中心 / Snowflake / 限流熔断，面试题 ×15 |

## 使用方式

双击 `index.html` 用浏览器直接打开，所有资源均为本地文件，无需网络或服务器。

## 文件结构

```
interview/
├── index.html            # 首页
├── gc-principles.html    # JVM GC 专题
├── spring.html           # Spring 专题
├── mysql.html            # MySQL 专题
├── redis.html            # Redis 专题
├── mq.html               # 消息队列专题
├── juc.html              # JUC 并发编程专题
├── distributed.html      # 分布式系统专题
├── shared.css            # 公共样式（响应式布局、移动端适配）
├── shared.js             # 公共脚本（侧边栏、滚动监听、TOC）
└── README.md
```
