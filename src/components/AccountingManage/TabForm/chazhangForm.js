/**
 * 查账审核
 * - props: handleOk, modalType(表单类型)
 * userId 用户id ==userId
 * orderId 订单id ==orderId
 * id 还款计划id== planId
 * user 用户信息 == user
 *overdueStatus 是否逾期 === isDue boolean
 */
import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

var UserDetail =(props) =>{
  const { getFieldDecorator } = props.form
  const { modalType, form, handleOk, data , repaywayList, btnloading } = props;
  const optionList = repaywayList.length ==0 ?[]:repaywayList.map((item)=><Option key={item} value={item}>{item}</Option>);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  var handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = {
        amount: values.amount || undefined,
        arriveTime: values.arriveTime,
        repayWay: values.repayWay,
        repayAccount: values.repayAccount,
        file: values.file,
      };
      if (modalType === '3') {
        jsonParams.userId = data.userId;
        jsonParams.orderId = data.orderId;
        jsonParams.planId = data.id;
        jsonParams.isDue = data.overdueStatus === '1' ? true : false;
      }

      handleOk(modalType, jsonParams);
    });
  };

  return <Form layout="vertical" style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="姓名" {...formItemLayout}>
      <Input value={realName} disabled={true}/>
    </FormItem>
    <FormItem label="查账金额" {...formItemLayout}>
      {getFieldDecorator('amount',{
        rules: [{
          required: true , message: '请输入用户名！',
        },{
          max:20,
          message: '用户名最大长度20位',
        }],
        initialValue:name
      })(<Input/>)}
    </FormItem>
    <FormItem label="到账时间" {...formItemLayout}>
      {getFieldDecorator('arriveTime',{
        rules: [{
          required: true, message: '请选择到账时间！',
        }],
      })(<Input disabled={canEdit} />)}
    </FormItem>
    <FormItem label="还款方式"  {...formItemLayout}>
      {getFieldDecorator('repayWay', {
        rules: [{
          required: true, message: '请输入还款方式！',
        }],
      })(<Select>
        { optionList }
      </Select>)}
    </FormItem>
    <FormItem label="还款账号"  {...formItemLayout}>
      {getFieldDecorator('repayAccount',{
        rules: [{
          required: true , message: '请输入还款账号'
        },{
          max:20,
          pattern:/^(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/,
          message:'请输入还款账号'
        }],
        placeholder:'请输入还款账号',
        validateTrigger:'onBlur',
        initialValue:password
      })(<Input   />)}
    </FormItem>
    <FormItem label="上传图片"  {...formItemLayout}>
      {getFieldDecorator('file',{
        rules: [{
          required: true , message: '请选择'
        }],
      })(<Input />)}
    </FormItem>
    <FormItem>
      <Button type="primary"  style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>
    </FormItem>
  </Form>
}
UserDetail = Form.create()(UserDetail);

export default  UserDetail

