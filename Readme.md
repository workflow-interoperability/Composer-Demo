# 业务网络模型

本项目包含一个用于互操作的区块链业务网络模型

## 项目结构

- dist/

    包含打包好的业务网络，该文件可直接用于区块链网络的安装和部署

- lib/logic.js

    该文件包含各种transaction function，包括更改资产状态、更改资产访问权限、更改资产数据以及发布资产操作

- models/

    模型定义

- permission.acl

    权限控制定义文件

## 如何使用

1. 安装`hyperledger composer`环境

1. `./run.sh`，若需要同时暴露rest操作接口，则运行文件最后一行注释的内容