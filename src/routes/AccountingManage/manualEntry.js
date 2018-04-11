import React, {PureComponent} from 'react';
import {
  Table,
  Card,
  Form,
  Modal,
  Input,
  Button,
  message,
  Select,
  Tabs,
} from 'antd'
import {
  overdueorderlist,// 搜索逾期订单信息列表
  daikou,// 申请代扣
  sysUserInfo,// 获取角色身份
  jianmian,// 申请减免
  chazhang,// 申请查账
} from '../../services/audit';

import styles from './maualEntry.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import WrappedDaikou from './Daikou'
import WrappedJianmian from './Jianmian'
import WrappedChazhang from './Chazhang'

export default class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      detailData: [],
      recordData: [],
      tableLoading: false,

      models: '0',

      searchPhone: '',
      searchOrderNo: '',

      operationStr: '',

      userId: null,
      orderId: null,

      isDue: false,
      overdueStatus: null,

      role: '',// 角色
      LimitedRole: 'customerServiceOfficer'// 限权角色
      // LimitedRole: 'system'// 限权角色
    }
  }

  /**获取数据**/
  getData(params) {
    this.setState({
      models: '0',
      tableLoading: true
    });
    overdueorderlist(
      params
    ).then(res => {
      if (res.resultCode === 1000) {
        // 有值
        if (res.resultData.userId) {
          let listData = [{
            id: res.resultData.id,
            realName: res.resultData.user.realName,
            phone: res.resultData.user.phone,
            orderNo: res.resultData.orderNo,
            dueAmount: res.resultData.dueAmount,
            duePrincipal: res.resultData.duePrincipal,
            dueInterest: res.resultData.dueInterest,
            dueServiceFee: res.resultData.dueServiceFee,
            duePenalty: res.resultData.duePenalty,
          }];

          let models;
          switch (res.resultData.overdueStatus) {
            /**未逾期**/
            case 0:
              /**判断是否可以操作，canOpe 1 展示操作栏，canOpe 2 隐藏操作栏**/
              if (res.resultData.canOpe === 1) {
                message.success('该用户未逾期');
                models = '3';
              } else if (res.resultData.canOpe === 2) {
                models = '0'
              }
              break;
            /**已逾期**/
            case 1:
              /**判断是否可以操作，canOpe 1 展示操作栏，canOpe 2 隐藏操作栏**/
              if (res.resultData.canOpe === 1) {
                /**判断角色是否为限权角色，不是：展示代扣，是：展示查账**/
                if (this.state.role !== this.state.LimitedRole) {
                  models = '1'
                } else {
                  models = '3'
                }
              } else if (res.resultData.canOpe === 2) {
                models = '0'
              }
              break;
            /**已还款**/
            case 2:
              message.success('该用户全部欠款已还清');
              models = '0';
              break;
          }

          this.setState({
            listData,
            detailData: res.resultData.overdueOrderDetail,
            recordData: res.resultData.operationRecords,

            models,

            operationStr: res.resultData.operationStr,

            userId: res.resultData.userId,
            orderId: res.resultData.orderId,

            /**是否逾期**/
            isDue: res.resultData.overdueStatus === 1,
            overdueStatus: res.resultData.overdueStatus,

            tableLoading: false,
          });
        } else {
          // 无值
          message.warning('没有查到逾期，请修改手机号或订单号后重试');
          this.setState({
            listData: [],
            detailData: [],
            recordData: [],
            models: '0',
            operationStr: '',
            userId: null,
            orderId: null,
            overdueStatus: null,
            tableLoading: false,
          });
        }
      } else {
        message.warning('请输入正确的查询条件');
        this.setState({
          listData: [],
          detailData: [],
          recordData: [],
          models: '0',
          operationStr: '',
          userId: null,
          orderId: null,
          overdueStatus: null,
          tableLoading: false,
        });
      }
    })
  }

  /**搜索条件**/
  handleSearchPhoneChange(e) {
    this.setState({
      searchPhone: e.target.value
    })
  }

  handleSearchOrderNoChange(e) {
    this.setState({
      searchOrderNo: e.target.value
    })
  }

  /**搜索**/
  search() {
    this.getData({
      phone: this.state.searchPhone,
      orderNo: this.state.searchOrderNo,
    })
  }

  /**重置**/
  reset() {
    this.setState({
      searchPhone: '',
      searchOrderNo: '',
      listData: [],
      detailData: [],
      recordData: [],
      models: '0',
      operationStr: '',
      userId: null,
      orderId: null,
      tableLoading: false,
    });
  }

  /**标签页更换**/
  tabsChange(key) {
    this.setState({
      models: key
    })
  }

  /**代扣**/
  handleDaikouSubmit(values) {
    let that = this;
    confirm({
      title: '提示',
      content: '确认代扣操作？',
      onOk() {
        that.setState({
          tableLoading: true
        });
        daikou({
          userId: that.state.userId,
          orderId: that.state.orderId,
          amount: values.amount
        }).then(res => {
          that.setState({
            tableLoading: false
          });
          if (res.resultCode === 1000) {
            message.success('代扣成功');
            that.getData({
              phone: that.state.searchPhone,
              orderNo: that.state.searchOrderNo,
            })
          } else {
            message.error(res.resultMessage)
          }
        })
      }
    });
  };

  /**抓取角色身份**/
  getRole() {
    sysUserInfo().then(res => {
      if (res.resultCode === 1000) {
        this.setState({
          role: res.resultData.role
        })
      }
    })
  }

  /**减免**/
  handleJianmianSubmit(values) {
    let that = this;
    confirm({
      title: '提示',
      content: '确认减免操作？',
      onOk() {
        that.setState({
          tableLoading: true
        });
        jianmian({
          useAmount: that.state.listData[0].duePenalty,
          amount: values.penalty,
          planId: that.state.listData[0].id,
          orderId: that.state.orderId,
          userId: that.state.userId,
        }).then(res => {
          that.setState({
            tableLoading: false
          });
          if (res.resultCode === 1000) {
            message.success('减免成功');
            that.getData({
              phone: that.state.searchPhone,
              orderNo: that.state.searchOrderNo,
            })
          } else {
            message.error(res.resultMessage)
          }
        })
      }
    });
  };

  /**查账**/
  handleChazhangSubmit(values, fileList) {
    let that = this;
    confirm({
      title: '提示',
      content: '确认查账操作？',
      onOk() {
        that.setState({
          tableLoading: true
        });

        let formData = new FormData();
        fileList.map((v) => {
          formData.append('files', v);
        });
        formData.append('planId', that.state.listData[0].id);
        formData.append('orderId', that.state.orderId);
        formData.append('userId', that.state.userId);
        formData.append('amount', values.audit);
        formData.append('arriveTime', values.arriveTime._d);
        formData.append('repayWay', values.repayWay);
        formData.append('repayAccount', values.repayAccount);
        formData.append('isDue', that.state.isDue);

        chazhang(formData).then(res => {
          that.setState({
            tableLoading: false
          });
          if (res.resultCode === 1000) {
            message.success('查账成功');
            that.getData({
              phone: that.state.searchPhone,
              orderNo: that.state.searchOrderNo,
            })
          } else {
            message.error(res.resultMessage)
          }
        })
      }
    });
  }

  /**生命周期**/
  componentDidMount() {
    this.getRole()
  }

  render() {


    /**逾期情况**/
    const columns = [
      {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName'
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo'
      },
      {
        title: '逾期总额',
        dataIndex: 'dueAmount',
        key: 'dueAmount'
      },
      {
        title: '逾期本金总额',
        dataIndex: 'duePrincipal',
        key: 'duePrincipal'
      },
      {
        title: '逾期利息总额',
        dataIndex: 'dueInterest',
        key: 'dueInterest'
      },
      {
        title: '逾期服务费总额',
        dataIndex: 'dueServiceFee',
        key: 'dueServiceFee'
      },
      {
        title: '逾期罚息总额',
        dataIndex: 'duePenalty',
        key: 'duePenalty'
      },
      {
        title: '操作',
        key: 'operation',
        render: () => {
          return (
            <div>
              {
                /**判断是否可以操作，models 0 展示提示语，models 非0 展示操作按钮**/
                this.state.models !== '0' ?
                  <span>
                  {/**未逾期用户和非限权操作员 可以展示三个按钮**/}
                    {(this.state.overdueStatus !== 0 && this.state.role !== this.state.LimitedRole) &&
                    <span>
                      <a onClick={() => {
                        this.setState({models: '1'})
                      }} style={{marginRight: '24px'}}>
                        代扣
                      </a>
                      <a onClick={() => {
                        this.setState({models: '2'})
                      }} style={{marginRight: '24px'}}>
                        减免
                      </a>
                    </span>
                    }
                    <a onClick={() => {
                      this.setState({models: '3'})
                    }}>
                      查账
                    </a>
                </span> :
                  <span style={{color: this.state.overdueStatus === 2 ? '#67C23A' : '#E6A23C'}}>
                  {this.state.overdueStatus === 2 ? '该用户全部欠款已还清' : this.state.operationStr}
                </span>
              }
            </div>
          )
        }
      },
    ];

    const expandedRowRender = () => {
      const columns = [
        {
          title: '逾期期数',
          dataIndex: 'sheduleNo',
          key: 'sheduleNo',
          render: (text, record, index) => {
            return (
              <span>第{text}期</span>
            )
          }
        },
        {
          title: '逾期总额',
          dataIndex: 'amount',
          key: 'amount'
        },
        {
          title: '逾期本金',
          dataIndex: 'principal',
          key: 'principal'
        },
        {
          title: '逾期利息',
          dataIndex: 'interest',
          key: 'interest'
        },
        {
          title: '逾期服务费费',
          dataIndex: 'serviceFee',
          key: 'serviceFee'
        },
        {
          title: '罚息',
          dataIndex: 'penalty',
          key: 'penalty'
        },
      ];

      return (
        <Table
          columns={columns}
          dataSource={this.state.detailData}
          pagination={false}
          loading={this.state.tableLoading}
          rowKey={record => record.sheduleNo}
        />
      );
    };

    /**操作记录**/
    const columnsForRecord = [
      {
        title: '交易类型',
        dataIndex: 'transactionType',
        key: 'transactionType'
      },
      {
        title: '发送交易时间',
        dataIndex: 'sendTime',
        key: 'sendTime'
      },
      {
        title: '接收结果时间',
        dataIndex: 'endTime',
        key: 'endTime'
      },
      {
        title: '交易金额',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '交易状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          return (
            <div>
              {text === 1 && '处理中'}
              {text === 2 && '成功'}
              {text === 3 && '失败'}
            </div>
          )
        }
      },
      {
        title: '失败原因',
        dataIndex: 'failReason',
        key: 'failReason'
      },
      {
        title: '操作人',
        dataIndex: 'operation',
        key: 'operation'
      },
    ];

    return (
      <div>
        <Card>
          <Form layout={'inline'} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <FormItem label={'手机号'}>
              <Input value={this.state.searchPhone} onChange={this.handleSearchPhoneChange.bind(this)}
                     placeholder={'不支持模糊查询'}/>
            </FormItem>
            <FormItem label={'订单号'}>
              <Input value={this.state.searchOrderNo} onChange={this.handleSearchOrderNoChange.bind(this)}
                     placeholder={'不支持模糊查询'}/>
            </FormItem>
            <Button type={'primary'} onClick={this.search.bind(this)}>
              查询
            </Button>
            <Button style={{marginLeft: '15px'}} onClick={this.reset.bind(this)}>
              重置
            </Button>
          </Form>
        </Card>
        {/**逾期情况**/}
        <Card>
          <h1 style={{display: 'inline', marginRight: '10px'}}>
            逾期情况
          </h1>
          <span>(点击 <img src={require("../../assets/add.png")} alt="" width={20} height={20}/> 展开查看 <b>逾期详情</b>)</span>
          <Table
            className={styles["components-table-demo-nested"]}
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={this.state.listData}
            rowKey={record => record.id}
            loading={this.state.tableLoading}
            pagination={false}
          />
        </Card>
        {/**三个操作框**/}
        {/**判断是否可以操作，models 非0 展示操作框**/}
        {this.state.models !== '0' &&
        <Card>
          <Tabs activeKey={this.state.models} onChange={this.tabsChange.bind(this)} size={'large'}
                className={styles["form"]}>
            {/**未逾期用户和非限权操作员 可以展示三个操作框**/}
            {(this.state.overdueStatus !== 0 && this.state.role !== this.state.LimitedRole) &&
            <TabPane tab={'代扣'} key="1">
              <WrappedDaikou
                realName={this.state.listData[0].realName}
                dueAmount={this.state.listData[0].dueAmount}
                loading={this.state.tableLoading}
                submit={this.handleDaikouSubmit.bind(this)}
                key={this.state.models}/>
            </TabPane>}
            {(this.state.overdueStatus !== 0 && this.state.role !== this.state.LimitedRole) &&
            <TabPane tab={'减免'} key="2">
              <WrappedJianmian
                realName={this.state.listData[0].realName}
                duePenalty={this.state.listData[0].duePenalty}
                loading={this.state.tableLoading}
                submit={this.handleJianmianSubmit.bind(this)}
                key={this.state.models}/>
            </TabPane>}
            <TabPane tab={'查账'} key="3">
              <WrappedChazhang
                realName={this.state.listData[0].realName}
                loading={this.state.tableLoading}
                submit={this.handleChazhangSubmit.bind(this)}
                key={this.state.models}/>
            </TabPane>
          </Tabs>
        </Card>}
        {/**操作记录**/}
        <Card>
          <h1>
            操作记录
          </h1>
          <Table
            columns={columnsForRecord}
            dataSource={this.state.recordData}
            rowKey={(record, index) => index}
            loading={this.state.tableLoading}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}

