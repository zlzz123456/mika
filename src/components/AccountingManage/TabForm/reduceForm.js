/**
 * Created by Administrator on 2018/1/25 0025.
 */
/**
 * Created by Administrator on 2017/12/16 0016.
 */
import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

var UserDetail =(props) =>{
  const { getFieldDecorator } = props.form
  const { modalType, form, handleOk, handleCancel, data , menu, btnloading} = props;
  const optionList = menu.length ==0 ?[]:menu.map((item)=><Option key={item} value={item}>{item}</Option>);
  const canEdit = modalType === 'change';
  console.log(data);
  if(data && data != undefined){
    var {  name,
      userName,
      password,
      roleNidStr,
      statusStr } = data
  }else{
    // if(modalType === 'add')  form.resetFields();
    var name = '',
      userName = '',
      password = '',
      roleNidStr ='',
      statusStr = '';
  }
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
      var jsonParams = { name:values.name|| undefined, userName:values.userName ||undefined,
        roleNidStr:values.roleNidStr|| undefined, statusStr:values.statusStr||undefined ,
        password:values.password||undefined };
      if(modalType === 'change'){
        jsonParams.id = data.id;
      }
      var json = {
        userInfo: JSON.stringify(jsonParams)
      };
      handleOk(modalType,json);
    });
  };

  var handleReset = ()=>{
    form.resetFields();
    handleCancel();
  }
  return <Form layout="vertical" style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="姓名" {...formItemLayout}>
      {getFieldDecorator('name',{
        rules: [{
          required: true , message: '请输入用户名！',
        },{
          max:20,
          message: '用户名最大长度20位',
        }],
        initialValue:name
      })(<Input/>)}
    </FormItem>
    <FormItem label="逾期总额" {...formItemLayout}>
      {getFieldDecorator('userName',{
        rules: [{
          required: true , message: '请输入登录名！',
        },{
          max:20,
          message: '登录名最大长度20位',
        }],
        initialValue:userName
      })(<Input disabled={canEdit} />)}
    </FormItem>
    <FormItem label="代扣金额"  {...formItemLayout}>
      {getFieldDecorator('password',{
        rules: [{
          required: true , message: '请设置密码！密码组合:字母+数组'
        },{
          max:20,
          pattern:/^(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/,
          message:'密码设置长度6-20，不要含中文和空格'
        }],
        placeholder:'请设置密码！密码组合:字母+数组',
        validateTrigger:'onBlur',
        initialValue:password
      })(<Input   />)}
    </FormItem>
    <FormItem>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>
    </FormItem>
  </Form>
}
UserDetail = Form.create()(UserDetail);

export default  UserDetail

