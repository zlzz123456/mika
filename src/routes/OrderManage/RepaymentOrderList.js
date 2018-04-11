/**
 * 还款订单管理
 *
 */

import react, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Row, Form, Input, Button, Card, Table, Tabs, Select, Modal, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RepaymentDetail from '../../components/OrderManage/RepaymentDetail';

import styles from './BorrowOrderList.less'

const FormItem = Form.Item;
const Option = Select.Option;
message.config({
  top: 320,
  duration: 2,
});

@connect(state => ({
   repaymentorder: state.repaymentorder,
   borroworder: state.borroworder,
}))
@Form.create()


export default class RepaymentOrderList extends PureComponent {
  state = {
    orderId: '',
    modal: false,
    modalLoading: false,
    formValues: {
      pageSize: 10,
      currentPage: 1,
      searchParams: '',
    },
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
        serialNo:values.serialNo?values.serialNo.trim():undefined,
      };
      if(JSON.stringify(jsonParams) === '{}') {
        message.error('至少搜索一个查询条件');
      }else{
      this.setState({
        formValues:{
          currentPage: 1,
          pageSize: 10,
          searchParams:JSON.stringify(jsonParams)
        },
      });
      dispatch({
        type: 'repaymentorder/fetch',
        payload: {
          currentPage: 1,
          pageSize: 10,
          searchParams:JSON.stringify(jsonParams)
        },
      });
      }
    });
  }

  //导出-----还款单
  daochu = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = { phone:values.phone?values.phone.trim():undefined,
        realName:values.realName? values.realName.trim():undefined,
        idNo:values.idNo?values.idNo.trim():undefined,
        statusStr:values.statusStr||undefined };

      if(values.borrowTime && values.borrowTime.length != 0){
        jsonParams.startTime = values.borrowTime[0].format('YYYY-MM-DD').toString();
        jsonParams.endTime = values.borrowTime[1].format('YYYY-MM-DD').toString()
      }
      if(JSON.stringify(jsonParams) === '{}') {
          message.error('至少搜索一个查询条件');
      }else{
        var searchParams = JSON.stringify(jsonParams)
        console.log(searchParams);
        
        window.location.href="/modules/manage/biz/exportRepayOrderList.htm?searchParams="+searchParams
   
      }
    });
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (<Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={7} sm={24}>
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
        <Col md={7} sm={24}>
          <FormItem label="订单号">
            {getFieldDecorator('orderNo')(
              <Input placeholder="请输入" style={{ width: '80%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={10} sm={24}>
          <FormItem label="身份证号">
            {getFieldDecorator('idNo')(
              <Input placeholder="请输入" style={{ width: '80%' }} />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={7} sm={24}>
          <FormItem label="逾期状态">
            {getFieldDecorator('statusStr')(
              <Select style={{ width: '80%' }} placeholder="请选择">
                <Option key={1} value="逾期">逾期</Option>
                <Option key={2} value="正常">正常</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={7} sm={24}>
          <FormItem label="流水号">
            {getFieldDecorator('serialNo')(
              <Input style={{ width: '80%' }} placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col md={7} sm={24}>
          <Button htmlType="submit" type="primary" style={{marginRight:'20px'}}>查询</Button>
          <Button onClick={this.resetForm}>重置</Button>
          < Button  onClick={this.daochu} style={{ marginLeft: 16 }} >导出</ Button> 
        </Col>
      </Row>
    </Form>);
  }

  handleModalVisible(flag = false, record=''){
    this.setState({
      modal:flag,
      orderId:record
    })
  }

  render() {
    const { repaymentorder:{ data, loading }, dispatch} = this.props;
    const { modal, formValues, modalLoading, orderId } = this.state;
    const columns = [{
      title: '真实姓名',
      dataIndex: 'realName',
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '身份证号',
      dataIndex: 'idNo',
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
      title: '借款时间',
      dataIndex: 'borrowTime',
    }, {
      title: '借款金额',
      dataIndex: 'amount',
    }, {
      title: '借款期限',
      dataIndex: 'peroidValue',
    }, {
      title: '还款状态',
      dataIndex: 'statusStr',
    }, {
      title: '已还期数',
      dataIndex: 'repaidPeriod',
    }, {
      title: '逾期总额',
      dataIndex: 'dueAmount',
    }, {
      title: '账龄',
      dataIndex: 'orderAge',
    }, {
      title: '还款详情',
      dataIndex: '',
      render: (text, record) => (<a onClick={()=>this.handleModalVisible(true,record.id)}>详情</a>),
    }];

    const pagination = {
      ...data.pagination,
      showTotal:(total)=>`当前共${total}条`,
      pageSizeOptions:['10', '20', '30', '50'],
      showSizeChanger:true,
      onChange:(page, pageSize) => { //当页面改变时，做请求
        dispatch({
          type: 'repaymentorder/fetch',
          payload: {
            ...formValues,
            currentPage: page,
            pageSize: pageSize,
          }
        })
      },
      onShowSizeChange:(current, size)=> {
        dispatch({
          type: 'repaymentorder/fetch',
          payload: {
            ...formValues,
            currentPage: current,
            pageSize: size,
          }
          })
      },
    };


    const stylesVisible = (!modal)?{
    }:{
      hidden:'hidden'
    };

    return (<PageHeaderLayout title="还款订单">
        <Card bordered={false} {...stylesVisible}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <Table dataSource={data.list}
                   rowKey={ (record)=>record.id}
                   columns={columns} pagination={pagination} loading={loading}/>
          </div>
        </Card>
       {
         modal && <Card bordered={false}>
          <div className={styles.tableList}>
            <Button type="primary" onClick={()=>this.handleModalVisible()}>返回</Button>
            <RepaymentDetail dispatch={dispatch} orderId={orderId}/>
          </div>
         </Card>
       }
    </PageHeaderLayout>);
  }
}