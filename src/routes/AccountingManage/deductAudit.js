import React, {PureComponent} from 'react';
import {Table, Card, Form, Modal, Input, Button, message, Select} from 'antd'
import {
  findDeductListByPage,// 分页减免审核列表
  updateListByIds,// 更新系统参数
  updateDeductStatus, // 通过 或拒绝（修改状态）
} from '../../services/audit';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      tableLoading: false,
      pagination: {
        current: '',
        pageSize: '',
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: '',
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },

      searchName: '',
      searchPhone: '',
      searchOrderNo: '',
      searchStatus: '',

      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  }

  /**获取数据**/
  getData(params) {
    this.setState({
      tableLoading: true
    });
    findDeductListByPage(
      params
    ).then(res => {
      if (res.resultCode === 1000) {
        this.setState({
          listData: res.resultData,
          tableLoading: false,
          pagination: res.page
        });
      } else {
        message.error('网络错误，请重试')
      }
    })
  }

  /**控制页码器**/
  handlePageChange(pagination) {
    this.setState({
      pagination: pagination
    });
    this.getData({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      searchParams: JSON.stringify({
        realName: this.state.searchName,
        phone: this.state.searchPhone,
        orderNo: this.state.searchOrderNo,
      }),
      status: this.state.searchStatus
    });
  }

  /**搜索条件**/
  handleSearchNameChange(e) {
    this.setState({
      searchName: e.target.value
    })
  }

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

  handleSearchStatusChange(value) {
    this.setState({
      searchStatus: value ? value : ''
    })
  }

  /**搜索**/
  search() {
    this.getData({
      pageSize: this.state.pagination.pageSize,
      currentPage: this.state.pagination.current,
      searchParams: JSON.stringify({
        realName: this.state.searchName,
        phone: this.state.searchPhone,
        orderNo: this.state.searchOrderNo,
      }),
      status: this.state.searchStatus
    })
  }

  /**重置**/
  reset() {
    this.props.form.resetFields();
    this.setState({
      searchName: '',
      searchPhone: '',
      searchOrderNo: '',
      searchStatus: '',
    })
  }

  /**通过**/
  /**拒绝**/
  update(record, status) {
    let that = this;
    confirm({
      title: '提示',
      content: `确认 ${status === 2 ? '通过' : '拒绝'} 此审核？`,
      onOk() {
        updateDeductStatus({
          id: record.id,
          status: status,
          desc: ''
        }).then(res => {
          if (res.resultCode === 1000) {
            message.success('操作成功');
            that.search()
          } else {
            message.error('网络错误，请重试')
          }
        })
      },
      onCancel() {
      }
    });
  }

  /**复选框**/
  onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRowKeys});
  };

  /**批量审核通过**/
  batchAudit() {
    let that = this;
    confirm({
      title: '提示',
      content: '批量审核通过？',
      onOk() {
        updateListByIds({
          ids: that.state.selectedRowKeys
        }).then(res => {
          if (res.resultCode === 1000) {
            that.setState({
              selectedRowKeys: []
            });
            message.success('批量审核通过 成功');
            that.search()
          } else {
            message.error('网络错误，请重试')
          }
        })
      },
      onCancel() {
      }
    });
  }

  /**生命周期**/
  componentDidMount() {
    this.getData({
      pageSize: this.state.pagination.defaultPageSize,
      currentPage: this.state.pagination.defaultCurrent,
      searchParams: JSON.stringify({
        realName: this.state.searchName,
        phone: this.state.searchPhone,
        orderNo: this.state.searchOrderNo,
      }),
      status: this.state.searchStatus
    })
  }

  render() {
    const {loading, selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      getCheckboxProps: record => ({
        disabled: record.status !== 1, // Column configuration not to be checked
      }),
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [{
      title: '审核状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      render: (text, record, index) => {
        return (
          <div style={{color: text === '审核通过' ? '#67C23A' : text === '审核拒绝' ? '#F56C6C' : '#E6A23C'}}>
            {text}
          </div>
        )
      }
    }, {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    }, {
      title: '申请减免金额',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '可减免总额（含申请金额）',
      dataIndex: 'useAmount',
      key: 'useAmount',
    }, {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '审核完成时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '申请人',
      dataIndex: 'proposer',
      key: 'proposer',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => {
        return (
          <div>
            {record.status === 1 && <div>

              <a onClick={this.update.bind(this, record, 2)}>
                通过
              </a>

              <a style={{marginLeft: '10px', color: 'red'}} onClick={this.update.bind(this, record, 3)}>
                拒绝
              </a>

            </div>}{record.status !== 1 && '--'}
          </div>
        )
      }
    }];
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card>
          <Form layout={'inline'} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <FormItem label={'姓名'}>
              <Input value={this.state.searchName} onChange={this.handleSearchNameChange.bind(this)}
                     placeholder={'不支持模糊查询'}/>
            </FormItem>
            <FormItem label={'手机号'}>
              <Input value={this.state.searchPhone} onChange={this.handleSearchPhoneChange.bind(this)}
                     placeholder={'不支持模糊查询'}/>
            </FormItem>
            <FormItem label={'订单号'}>
              <Input value={this.state.searchOrderNo} onChange={this.handleSearchOrderNoChange.bind(this)}
                     placeholder={'不支持模糊查询'}/>
            </FormItem>
            <FormItem label={'审核状态'}>
              {getFieldDecorator('searchStatus')(
                <Select style={{width: 180}} allowClear placeholder={'请选择'} onChange={this.handleSearchStatusChange.bind(this)}>
                  <Option value={1}>审核中</Option>
                  <Option value={2}>审核通过</Option>
                  <Option value={3}>审核拒绝</Option>
                </Select>
              )}
            </FormItem>
            <Button type={'primary'} onClick={this.search.bind(this)}>
              查询
            </Button>
            <Button style={{marginLeft: '15px'}} onClick={this.reset.bind(this)}>
              重置
            </Button>
          </Form>

        </Card>
        <Card>
          <div style={{marginBottom: 16}}>
            <Button
              type="primary"
              disabled={!hasSelected}
              loading={loading}
              onClick={this.batchAudit.bind(this)}
            >
              批量审核通过
            </Button>
            <span style={{marginLeft: 8}}>
            {hasSelected ? `您选中了 ${selectedRowKeys.length} 笔订单` : ''}
          </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.listData}
            pagination={this.state.pagination}
            onChange={this.handlePageChange.bind(this)}
            bordered rowKey={record => record.id}
            loading={this.state.tableLoading}/>
        </Card>
      </div>
    );
  }
}
const WrappedTableList = Form.create()(TableList);

export default WrappedTableList
