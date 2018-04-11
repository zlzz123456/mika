/**
 * 父级菜单-- 财务管理
 *  组件: 查账审核
 *
 */

import react, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Row, Form, Input, Button, Card, Table, Tabs, Select, Modal } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ConfirmAudit from '../../components/AccountingManage/confirmAudit';

import styles from './Audit.less'

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
    btnloading:false,
    modal: false,
    modalLoading: false,
    detailData:{},
    formValues: {
      pageSize: 10,
      currentPage: 1,
      searchParams: '',
    },
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'auditconfirm/searchlistfetch'
    })
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
      var jsonParams = { name:values.name?values.name.trim():undefined,
        phone:values.phone? values.phone:undefined,
        orderNo:values.orderNo?values.orderNo:undefined,
        status:values.status||undefined ,
        repayWay:values.repayWay||undefined,
        applyType:values.applyType||undefined,
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

  handleOk = (modalType, data)=>{
    const { dispatch } = this.props;
    const { formValues } = this.state;
    if(modalType == '1'){
      dispatch({
        type:'auditconfirm/actionOrderstatus',
        payload: data,
        callback:(result)=>{
          if(result.resultCode === 1000){
            this.setState({
              modal:false
            })
            Modal.success({
              title:'审核成功',
              onOk:()=>{
                dispatch({
                  type: 'auditconfirm/fetch',
                  payload: {...formValues}
                })
              }
            })
          }else{
            this.setState({
              modal:false
            })
            Modal.error({
              title:result.resultMessage,
            })
          }
        }
      })
    }
  }

  renderForm(statuslist=[],repaywaylist=[],applyTypelist=[]) {
    const { getFieldDecorator } = this.props.form;
    return (<Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={5} sm={24}>
          <FormItem label="姓名">
            {getFieldDecorator('name')(
              <Input placeholder="请输入" style={{ width: '80%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
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
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={5} sm={24}>
          <FormItem label="审核状态" >
            {getFieldDecorator('status')(
              <Select style={{ width: '80%' }} placeholder="请选择">
                { statuslist }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <FormItem label="还款方式">
            {getFieldDecorator('repayWay')(
              <Select style={{ width: '80%' }} placeholder="请选择">
                { repaywaylist }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <FormItem label="申请类型">
            {getFieldDecorator('applyType')(
              <Select style={{ width: '80%' }} placeholder="请选择">
                { applyTypelist }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <Button htmlType="submit" type="primary" style={{marginRight:'20px'}}>查询</Button>
          <Button onClick={this.resetForm}>重置</Button>
        </Col>
      </Row>
    </Form>);
  }

  handleModalVisible =(flag = false, record='',type)=>{
    const {dispatch} = this.props;
    this.setState({
      modal:flag,
      orderId: record,
      titleType: type,
      modalLoading:true,
    });
    if(flag){
      dispatch({
        type:'auditconfirm/orderDetail',
        payload: record,
        callback:(result)=>{
          this.setState({
            detailData:result.resultData,
            modalLoading:false
          })
        }
      })
    }else{
      this.setState({
        modalLoading:false
      })
    }
  }

  render() {
    const { auditconfirm:{ data, loading,  confirmStatusList, repayWayList, applyTypeList }, dispatch} = this.props;
    const { modal, formValues, titleType, orderId, detailData, btnloading , modalLoading} = this.state;
    const statuslist= confirmStatusList.length?confirmStatusList.map((item,index)=><Option key={index} value={item.code}>{item.value}</Option>):[];
    const repaywaylist= repayWayList.length?repayWayList.map((item,index)=><Option key={index} value={item.code}>{item.value}</Option>):[];
    const applyTypelist= applyTypeList.length?applyTypeList.map((item,index)=><Option key={index}  value={item.code}>{item.value}</Option>):[];

    const columns = [{
      title: '审核状态',
      dataIndex: 'status',
      render:(text)=>{
        switch(text){
          case 1: return '待审核';
          case 2: return '审核通过';
          case 3: return '审核拒绝';
        }
      }
    }, {
      title: '姓名',
      dataIndex: '',
      render:(text, record)=>record.user?record.user.realName:''
    }, {
      title: '手机号',
      dataIndex: '',
      render:(text, record)=>record.user?record.user.phone:'-'
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
      title: '查账金额',
      dataIndex: 'amount',
    }, {
      title: '申请时间',
      dataIndex: 'applyTime',
    }, {
      title: '审核完成时间',
      dataIndex: 'completeTime',
    }, {
      title: '还款方式',
      dataIndex: 'repayWay',
      render:(text)=>{
        switch(text){
          case 1:return '支付宝';
          case 2: return '微信';
          case 3: return '对公账户';
          default: return text;
        }
      }
    }, {
      title: '还款流水号',
      dataIndex: 'payserialNumber',
    }, {
      title: '还款账户',
      dataIndex: 'repayAccount',
    }, {
      title: '申请人',
      dataIndex: 'applyUser',
    }, {
      title: '申请类型',
      dataIndex: 'applyType',
      render:(text)=>{
        switch (text){
          case 1 : return '逾期还款';
          case 2 : return '正常还款';
        }
      }
    }, {
      title: '审核人',
      dataIndex: 'opeUser',
    }, {
      title: '审批拒绝原因',
      dataIndex: 'refusedCause',
    }, {
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.status){
          case 1: return <a onClick={()=>this.handleModalVisible(true, record.rcId, '1')}>审核</a>
          default: return <a onClick={()=>this.handleModalVisible(true, record.rcId, '0')}>详情</a>
        }
      }
    }];

    const pagination = {
      ...data.pagination,
      showTotal:(total)=>`当前共${total}条`,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showSizeChanger:true,
      onChange:(page, pageSize) => { //当页面改变时，做请求
        this.setState({
          formValues: {
            ...formValues,
           currentPage: page,
           pageSize: pageSize,
          }
        })
        dispatch({
          type: 'auditconfirm/fetch',
          payload: {
            ...formValues,
            currentPage: page,
            pageSize: pageSize,
          }
        })
      },
      onShowSizeChange:(current, size)=> {
        this.setState({
          formValues: {
            ...formValues,
            currentPage: current,
            pageSize: size,
          }
        })
        dispatch({
          type: 'auditconfirm/fetch',
          payload: {
              ...formValues,
             currentPage: current,
             pageSize: size,
          },
        })
      },
    };

    return (<PageHeaderLayout title="查账审核">
      <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              { this.renderForm(statuslist,repaywaylist,applyTypelist) }
            </div>
            <Table dataSource={data.list}
                   rowKey={ (record)=>record.rcId}
                   columns={columns}
                   pagination={pagination}
                   loading={loading}/>
          </div>
        </Card>
      <Modal visible={modal}
             width={720}
             footer={titleType ==1?[]:[<Button onClick={()=>this.handleModalVisible()}>返回</Button>]}
             onCancel={()=>this.handleModalVisible()}
             title={ titleType ==1?'审核':'详情' }>
        {modal && <ConfirmAudit dataOk={modalLoading} modalType={titleType} handleOk={this.handleOk} btnloading={btnloading} data={detailData} userId={orderId}
                                handleCancel={()=>this.handleModalVisible()}/>}
      </Modal>
    </PageHeaderLayout>);
  }
}

