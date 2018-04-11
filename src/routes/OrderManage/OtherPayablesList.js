/**
 * 其他应付款列表管理
 *
 */

import react, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Row, Form, Input, Button, Card, Table, Tabs, Select, Modal, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import OtherDetail from '../../components/OrderManage/OtherDetail';

import styles from './BorrowOrderList.less'

const FormItem = Form.Item;
const Option = Select.Option;
message.config({
  top: 320,
  duration: 2,
});

@connect(state => ({
   otherOrder: state.otherOrder
}))
@Form.create()


class otherOrderList extends PureComponent {
  state = {
    modal: false,
    visible: false,
    modalLoading: false
  }

  /*TODO: 溢出页弹框的显示与隐藏 - 查看溢出页详情 - 传递数据[orderId , 事件类型 ]*/
  handleModalVisible = (flag = false,record,typeName) => {
    const { dispatch } = this.props;
    if (flag && record && typeName) {
      if( typeName == 'detail') {
        dispatch({
          type: 'otherOrder/detailfetch',
          payload: record
        })
      }
    } else {
      dispatch ({
        type: 'otherOrder/changeModal',
        payload: flag
      })
    }
  }
  showModal = () => { // 弹出退款对话框
    // this.setState({
    //   visible: true,
    // });
  }
  handleOk = (e) => { // 关闭退款对话框
    // this.setState({
    //   visible: false,
    // });
  }
  handleCancel = (e) => { // 关闭退款对话框
    // this.setState({
    //   visible: false,
    // });
  }
  // 查询条件
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
        realName:values.realName?values.realName.trim():undefined,
      };
      if(JSON.stringify(jsonParams) === '{}') {
        message.error('至少搜索一个查询条件');
      }else{
      dispatch({
        type: 'otherOrder/fetch',
        payload: {
          phone: jsonParams.phone,
          orderNo: jsonParams.orderNo,
          idNo: jsonParams.idNo,
          realName: jsonParams.realName
        },
      });
      }
    });
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (<Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={7} sm={24}>
          <FormItem label="姓名">
            {getFieldDecorator('realName')(
              <Input placeholder="请输入" style={{ width: '100%' }} />
            )}
          </FormItem>
        </Col>
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
              <Input placeholder="请输入" maxLength='11' style={{ width: '100%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={7} sm={24}>
          <FormItem label="订单号">
            {getFieldDecorator('orderNo')(
              <Input placeholder="请输入" style={{ width: '100%' }} />
            )}
          </FormItem>
        </Col>
        <Col md={3} sm={24}>
          <Button htmlType="submit" type="primary" style={{marginRight:'20px'}}>搜索</Button>
        </Col>
      </Row>
    </Form>);
  }


  render() {
    let { otherOrder:{ data, loading, otherorderdetail }, dispatch} = this.props;
    const { modal, modalLoading, visible } = this.state;
    const columns = [{
      title: '姓名',
      dataIndex: 'realName',
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '订单号',
      dataIndex: 'idNo',
    }, {
      title: '其他应付款',
      dataIndex: 'orderNo',
    }, {
      title: '是否结清',
      dataIndex: 'isSettle',
    }, {
      title: '退款操作',
      dataIndex: 'refund',
      render: (text, refund) => {
        let refundId = refund.refundId;
        return (
          <div>
            <a onClick={() => this.showModal(true, refundId, 'refund')}>退款</a>
          </div>
        )
      },
    }, {
      title: '挂账/退款记录',
      dataIndex: 'record1',
      render: (text, record) => {
        console.log(record, 'record1111111')
        let dataOrderId = record.id;
        return (
          <div>
            <a onClick={() => this.handleModalVisible(true, dataOrderId, 'detail')}>查看</a>
          </div>
        )
      },
    }];

    return (<PageHeaderLayout title="其他应付款">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <Table
              loading={loading}
              bordered
              dataSource={data.list}
              rowKey='id'
              columns={columns}
          />
          </div>
        </Card>
        <Modal title="退款操作"
        visible={visible}
        onOk={this.handleOk}
        width={600}
        onCancel={this.handleCancel()}
        >
          退款金额: 100元
        </Modal>
        <Modal
          title="退款记录"
          visible={modal}
          onCancel={() => this.handleModalVisible()}
          width={900}
          footer = {[
            <Button type="primary" onClick={()=>this.handleModalVisible()}>返回</Button>
          ]}
        >
        <OtherDetail data={otherorderdetail}/>
        </Modal>
    </PageHeaderLayout>);
  }
}
export default otherOrderList;