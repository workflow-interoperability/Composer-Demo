## 本区块链网络功能说明

>一个通用的、用于多方间订单发布与接收的区块链网络模型，运行于基于浏览器的Hyperledger Composer开发环境——Composer Playground。关于相关概念的详细解释与Composer Playground环境的运行与使用可参阅此链接[Hyperledger Composer 基础](https://www.ibm.com/developerworks/cn/cloud/library/cl-model-test-your-blockchain-network-with-hyperledger-composer-playground/index.html?ca=drs-)

该区块链网络中，所有参与者都可以作为某个订单的发起者或接受者，来发布订单、完成订单。

这个区块链网络定义了：
  - __Participant__: `Member` //即参与者
  - __Assets__: `Process` //即订单
  - __Transaction__: `Publish` `Accepted` `Accomplished`

 各对象详细介绍（各对象的定义代码见model.cto文件）：
  - __Member__：包括ID（memberId）、职业（profession）。
ID用来确认每一个Member
  - __Process__：包括ID（processId） 、状态（status）、是否被发起者签名完成（isAccomplishSender）、是否被接受者签名完成（isAccomplishReceiver）、订单发起者（sender）、订单接受者（receiver）
  - __Publish__： 包括订单状态（Oder）
  - __Accepted__, __Accomplished__：更改订单状态

该区块链网络运行机制：

  - 参与者发布订单，等待其他相应职业（若订单有指定职业）的参与者接受，待双方签名确认完成后，订单状态变为已完成

测试该区块链网络：

  - 进入Composer Playground，点击 `Deploy a new business network`，在 2. Model Network Starter Template 中点击 `Drop here to upload or browse`，上传本地 __process3-business-network.bna__  文件，后点击右侧 `Deploy` 按钮进入该区块链网络的测试界面
  - 进入 __Test__ 标签，点击 `Create New Participant`，设定成员ID与职业后，点击创建新成员
  - 点击右上角 __admin__ 选项，进入 __ID Registry__ ，点击 `Issue New ID` 创建新用户， *ID Name* 选项可以任填字符， *Participant* 选项需要天上先前创建的Member成员的ID，完成后将鼠标悬停至 **My IDs for process3-business-network** 中的目标，点击 `Use Now` 即可切换至该身份 
  - 回到 **Test** 标签中，点击左下角 `Submit Transaction` 即可用 *Publish* 选项发布订单。该订单的 *sender* 会自动设置为当前身份的Member ID。若要接受某个订单，可使用 *Accepted* 选项，注意其中 *process* 的ID编号要与目标订单的ID对应
  - 创建多个成员，可进行多成员间的订单发布、接受、签名完成等交互，注意使用每个订单的ID来辨别不同的订单

## 本地network安装及删除

启动脚本已经写入`package.json`中，在安装network之前，需要先安装fabric，具体参考官方文档；完成安装后，需要依次执行`npm run prepublish` `npm run deploy` `npm run start`，完成后，network便被成功安装到了本地；

由于官方并没有给删除的命令，所以删除时需要手动删除所有的fabric容器，之后如果需要安装，可以参考上一段内容
