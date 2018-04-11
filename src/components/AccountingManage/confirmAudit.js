/**
 * Created by Administrator on 2018/1/25 0025.
 */
/**
 * Created by Administrator on 2017/12/16 0016.
 */
import React, { Component } from 'react';
import { Row, Col, Form, Input , Select, Button, Divider } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class OrderDetail extends Component{
  state = {
    showTab:''
  };

  handleChange=(value)=>{
    this.setState({
      showTab: value
    })
  }

  handleSubmit = (e) => {
     const { modalType, form, handleOk, data } = this.props;
      e.preventDefault();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const values = {
          ...fieldsValue
        };
        var jsonParams = {
          refusedCause: values.desc || '',
          status: values.status,
          payserialNumber: values.payserialNumber||''
        };
        jsonParams.rcId = data.rcId;
        handleOk(modalType,jsonParams);
      });
    };

  handleReset = ()=>{
    this.props.handleCancel();
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const { modalType, data, btnloading, dataOk } = this.props;
    const { showTab } = this.state;
    const  repaywayNeed = data.repayWay !== 2?/^[a-zA-Z0-9]{16,34}$/:/^[a-zA-Z0-9]{1,}$/;
    const  repaywayNeedStr = data.repayWay !== 2?'还款流水号长度16-34位':'请输入微信还款流水号';
    const  repaywayNeedLength = data.repayWay !== 2?'34':'99';
    const canEdit = modalType == '0';
    if(data && data != undefined && (!dataOk)){
      var {  name, //姓名
        amount, //还款金额
        repayWay, //还款方式
        repayAccount, //还款账户
        evidenceImgs, //图片凭证
        createTime, //申请时间
        arriveTime, //到账时间
        desc,// 拒绝原因
        status, //审核状态
        payserialNumber //流水号
      } = data
    }else{
      // if(modalType === 'add')  form.resetFields();
      var name = '',
        amount = '', //还款金额
        repayWay = '', //还款方式
        repayAccount = '', //还款账户
        evidenceImgs = [], //图片凭证
        createTime = '', //申请时间
        arriveTime = '', //到账时间
        desc = '',// 拒绝原因
        status = '', //审核状态
        payserialNumber='' //流水号
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };




  const repayWayStr = ((num)=>{
     switch (num){
       case 1: return '支付宝';
       case 2: return '微信';
       case 3: return '对公转账';
       default:return '未知';
     }
  })(repayWay);

  return <Form style={{width:'90%',marginLeft:'5%',marginTop:'20px'}}>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={12} sm={24}>
        <FormItem label="姓名" {...formItemLayout}>
          <Input disabled={true} value={name}/>
        </FormItem>
      </Col>
      <Col md={12} sm={24}>
        <FormItem label="还款方式" {...formItemLayout}>
          <Input  disabled={true} value={repayWayStr}/>
        </FormItem>
      </Col>
    </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem label="还款账户" {...formItemLayout}>
            <Input  disabled={true}  value={repayAccount}/>
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="到账金额" {...formItemLayout}>
            <Input  disabled={true} value={amount}/>
          </FormItem>
        </Col>
      </Row>
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={12} sm={24}>
        <FormItem label="到账时间" {...formItemLayout}>
          <Input  disabled={true}  value={arriveTime}/>
        </FormItem>
      </Col>
      <Col md={12} sm={24}>
        <FormItem label="申请时间" {...formItemLayout}>
          <Input  disabled={true} value={createTime}/>
        </FormItem>
      </Col>
    </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
         <Col md={5} sm={24}>
           <span style={{width:'100%',textAlign:'right',display:'block'}}>图片凭证：</span>
         </Col>
         <Col md={18} sm={24} style={{ paddingLeft:0 }}>
          <div className="imgDiv" style={{width:'100%',height:'154px',display:'flex',padding:'5px 0'}}>
            {
              evidenceImgs.map((item,index)=><a className="imglist" href={item} key={`a_${index}`} target="_blank" style={{width:'120px',cursor:'pointer',height:'120px',display:'block',border:'1px solid #ccc',overflow:'hidden'}}><img src={item} key={index} style={{ width: '100%'}} /></a>)
            }
          </div>
        </Col>
       </Row>
       <Row>
         <Col>
           <FormItem label="审核：" {...formItemLayout}  style={{width:'80%'}}>
             {getFieldDecorator('status',{
               rules: [{
                 required: true , message: '请选择！',
               }],
               initialValue: (canEdit? status :''),
             })(<Select disabled={canEdit} onChange={this.handleChange}  style={{width:'80%'}}>
               <Option value={2} key='2'>通过</Option>
               <Option value={3} key='3'>拒绝</Option>
             </Select>)}
           </FormItem>
         </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
         <Col>
            {
              showTab == 2 || status == 2?(<FormItem label="还款流水号"  {...formItemLayout}  style={{width:'80%'}}>
                {getFieldDecorator('payserialNumber',{
                  rules: [{
                    required: true , message: '请输入还款流水号！',
                  },{
                    max: repaywayNeedLength,
                    pattern: repaywayNeed,
                    message: repaywayNeedStr,
                  }],
                  initialValue: payserialNumber
                })(<Input maxLength = {repaywayNeedLength}  disabled={canEdit} style={{ width:'80%' }} />)}
              </FormItem>)
            :(<FormItem label="拒绝原因" {...formItemLayout}  style={{ width:'80%' }} >
              {getFieldDecorator('desc',{
                rules: [{
                  required: true , message: '请输入拒绝原因！',
                },{
                  max:20,
                  pattern:/^[\u4e00-\u9fa5]{0,}$/,
                  message: '输入只能是中文拒绝原因',
                }],
                initialValue:desc
              })(<Input disabled={canEdit}  style={{width:'80%'}}/>)}
            </FormItem>)
            }
          </Col>
      </Row>
    {
     !canEdit && <Row>
       <Col>
         <Divider/>
         <FormItem style={{textAlign:'center'}}>
            <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>this.handleSubmit(e)}>确定</Button>
            <Button onClick={()=>this.handleReset()} style={{marginLeft:'15px'}}>取消</Button>
         </FormItem>
       </Col>
     </Row>
    }
  </Form>
  }
};

OrderDetail = Form.create()(OrderDetail);

export default OrderDetail

