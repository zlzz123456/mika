/**
 * 人工入账
 *
 */

import react, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Row, Form, Input, Button, Card, Table, Divider, Select, List } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RepaymentDetail from '../../components/OrderManage/RepaymentDetail';


const FormItem = Form.Item;
const Option = Select.Option;

@connect(state => ({
  auditconfirm: state.auditconfirm,
  user: state.user,
}))
@Form.create()

export default class auditconfirmList extends PureComponent {
  state = {
    orderId: '',
    titleType:'',
    modal: false,
    modalLoading: false,
    formValues: {
      pageSize: 10,
      currentPage: 1,
      searchParams: '',
    },
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'auditconfirm/fetch',
      payload: {...formValues}
    });
  }

  resetForm = ()=>{
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {
        pageSize: 10,
        currentPage: 1,
        searchParams: '',
      },
    });
  }

  handleSearch = (e)=>{
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = { phone:values.phone?values.phone.trim():undefined,
        orderNo:values.orderNo? values.orderNo.trim():undefined,
        idNo:values.idNo?values.idNo.trim():undefined,
        statusStr:values.statusStr||undefined ,
        serialNo:values.serialNo?values.idNo.trim():undefined,
      };

      this.setState({
        formValues:{
          currentPage: 1,
          pageSize: 10,
          searchParams:JSON.stringify(jsonParams)
        },
      });
      dispatch({
        type: 'auditconfirm/fetch',
        payload: {
          currentPage: 1,
          pageSize: 10,
          searchParams:JSON.stringify(jsonParams)
        },
      });
    });
  }

  renderForm(statuslist=[],repaywaylist=[],applyTypelist=[]) {
    const { getFieldDecorator } = this.props.form;
    return (<Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="手机号">
            {getFieldDecorator('phone', {
              rules: [
                { pattern: /^1[3|4|5|7|8]\d{9}$/,
                  len: 11,
                  message: '请输入有效的手机号' },
              ],
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请输入" maxLength='11' style={{ width: '80%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="订单号">
            {getFieldDecorator('orderNo')(
              <Input placeholder="请输入" style={{ width: '80%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={7} sm={24}>
          <Button htmlType="submit" type="primary" style={{marginRight:'20px'}}>查询</Button>
          <Button onClick={this.resetForm}>重置</Button>
        </Col>
      </Row>
    </Form>);
  }

  handleModalVisible(flag = false, record='',type){
    this.setState({
      modal:flag,
      orderId:record,
      titleType: type
    })
  }

  userroleBtn(rolestr,data){
    switch (rolestr) {
      case 'collector': return <div>
        <a onClick={this.handleModalVisible(true, data.orderId, '1')}>代扣</a>
        <Divider type="vertical"/>
        <a onClick={this.handleModalVisible(true, data.orderId, '2')}>减免</a>
        <Divider type="vertical"/>
        <a onClick={this.handleModalVisible(true, data.orderId, '3')}>查账</a>
      </div>
      case 'customerServiceOfficer': return  <a onClick={this.handleModalVisible(true, data.orderId, '3')}>查账</a>
      default: return <a>-</a>
    }
  }

  showInnerTable( columns ,record){
    return <Table columns={columns} dataSource={record} pagination={false}/>
  }

  render() {
    const { user:{ currentUser }, auditconfirm:{ data, loading }, dispatch} = this.props;
    const { modal, formValues, modalLoading, orderId } = this.state;

    const MoreBtns = [];
    const columns = [{
      title: '姓名',
      dataIndex: '',
      render:(text, record)=>record.user.realName
    }, {
      title: '手机号',
      dataIndex: '',
      render:(text, record)=>record.user.phone
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
      title: '逾期总额',
      dataIndex: 'amount',
    }, {
      title: '逾期本金总额',
      dataIndex: 'applyTime',
    }, {
      title: '逾期利息总额',
      dataIndex: 'completeTime',
    }, {
      title: '逾期服务费总额',
      dataIndex: 'repayWay',
    }, {
      title: '逾期罚息总额',
      dataIndex: 'payserialNumber',
    }, {
      title: '逾期详情',
      dataIndex: '',
      render:(text,record)=><a onClick={}>查看</a>
    }, {
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.status){
          case 1: return this.userroleBtn(currentUser.nid, record);
          case 0: return <p>record.operationStr</p>
          default: return <p>-</p>
        }
      }
    }];


    const innerColumns = [{
      title: '姓名',
      dataIndex: '',
      render:(text, record)=>record.user.realName
    }, {
      title: '手机号',
      dataIndex: '',
      render:(text, record)=>record.user.phone
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
      title: '逾期总额',
      dataIndex: 'amount',
    }, {
      title: '逾期本金总额',
      dataIndex: 'applyTime',
    }, {
      title: '逾期利息总额',
      dataIndex: 'completeTime',
    }, {
      title: '逾期服务费总额',
      dataIndex: 'repayWay',
    }, {
      title: '逾期罚息总额',
      dataIndex: 'payserialNumber',
    }, {
      title: '逾期详情',
      dataIndex: '',
      render:(text,record)=><a onClick={}>查看</a>
    }, {
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.status){
          case 1: return this.userroleBtn(currentUser.nid, record);
          case 0: return <p>record.operationStr</p>
          default: return <p>-</p>
        }
      }
    }];



    return (<PageHeaderLayout title="人工入账">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            { this.renderForm() }
          </div>
          <Table dataSource={data.list}
                 rowKey={ (record)=>record.id}
                 columns={columns}
                 expandedRowRender={ record => this.showInnerTable(innerColumns,record)}
                 pagination={false}
                 loading={loading}/>
        </div>
        <List header={<div> <Button type='primary'>操作记录</Button></div>}>
          <Table dataSource={data.list.operationRecords}
                 rowKey={ (record)=>record.id}
                 columns={columns}
                 pagination={false}
                 loading={loading}/>
        </List>
      </Card>
    </PageHeaderLayout>);
  }
}

