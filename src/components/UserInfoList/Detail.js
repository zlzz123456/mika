import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Spin} from 'antd';

import styles from '../../routes/UserManage/UserInfoList.less';

const FormItem = Form.Item;
const { Meta } = Card;

const Detail = Form.create({
  mapPropsToFields(props) {
    let {
      manageUserDetailModel,
      clUserAuth,
      userEmerContacts
    } = props;
    if(!manageUserDetailModel || manageUserDetailModel === null) {
      var  realName,
        sex,
        age,
        idNo,
        idAddr,
        bankCardNo,
        education,
        occupation,
        marryState,
        zhimaScore,
        taobaoAccount,
        creditCardEmail,
        liveAddr,
        registerAddr,
        registerCoordinate;
    }else{
      var {
        realName,
        sex,
        age,
        idNo,
        idAddr,
        bankCardNo,
        education,
        occupation,
        marryState,
        zhimaScore,
        taobaoAccount,
        creditCardEmail,
        liveAddr,
        registerAddr,
        registerCoordinate,
      } = manageUserDetailModel;
    }
    if(!clUserAuth){
      var idStateStr,
        contactStateStr,
        bankCardStateStr,
        phoneStateStr,
        zhimaStateStr,
        creditCardStateStr,
        taobaoStateStr,
        netSilverStateStr;
    }else{
      var  {
        idStateStr,
        contactStateStr,
        bankCardStateStr,
        phoneStateStr,
        zhimaStateStr,
        creditCardStateStr,
        taobaoStateStr,
        netSilverStateStr,
      } = clUserAuth;
    }



    if( userEmerContacts && userEmerContacts.length != 0){
      if(userEmerContacts.length == 1){
        if(userEmerContacts[0].type == '10'){
          var  aidLink = userEmerContacts[0].phone,
            aidName = userEmerContacts[0].name,
            aidWith = userEmerContacts[0].relation;
          var  otherLink ='',otherName ='', otherWith = '';
        }else{
          var  otherLink = userEmerContacts[0].phone,
            otherName = userEmerContacts[0].name,
            otherWith = userEmerContacts[0].relation;
          var  aidLink ='', aidName ='', aidWith ='';
        }
      }else if(userEmerContacts.length == 2 || userEmerContacts.length > 2){
        if(userEmerContacts[0].type == '10'){
          var  aidLink = userEmerContacts[0].phone,
            aidName = userEmerContacts[0].name,
            aidWith = userEmerContacts[0].relation,
            otherLink = userEmerContacts[1].phone,
            otherName = userEmerContacts[1].name,
            otherWith = userEmerContacts[1].relation;
        }else{
          var  aidLink = userEmerContacts[1].phone,
            aidName = userEmerContacts[1].name,
            aidWith = userEmerContacts[1].relation,
             otherLink = userEmerContacts[0].phone,
            otherName = userEmerContacts[0].name,
            otherWith = userEmerContacts[0].relation;
        }
      }
    }else{
      var  otherLink ='',otherName ='', otherWith = '',
           aidLink ='', aidName ='', aidWith ='';
    }
    return {
      realName:  Form.createFormField({
        value: realName?realName:""
      }),
      sex:  Form.createFormField({
        value: sex?sex:""
      }),
      age:  Form.createFormField({
        value: age?age:""
      }),
      idNo:  Form.createFormField({
        value: idNo?idNo:""
      }),
      idAddr:  Form.createFormField({
        value: idAddr?idAddr:""
      }),
      bankCardNo:  Form.createFormField({
        value: bankCardNo?bankCardNo:""
      }),
      education:  Form.createFormField({
        value: education?education:""
      }),
      occupation:  Form.createFormField({
        value: occupation?occupation:""
      }),
      marryState:  Form.createFormField({
        value: marryState?marryState:""
      }),
      zhimaScore:  Form.createFormField({
        value: zhimaScore?zhimaScore:""
      }),
      taobaoAccount:  Form.createFormField({
        value: taobaoAccount?taobaoAccount:""
      }),
      creditCardEmail:  Form.createFormField({
        value: creditCardEmail?creditCardEmail:""
      }),
      liveAddr:  Form.createFormField({
        value: liveAddr?liveAddr:""
      }),
      registerAddr:  Form.createFormField({
        value: registerAddr?registerAddr:""
      }),
      registerCoordinate:  Form.createFormField({
        value: registerCoordinate?registerCoordinate:""
      }),
      idState:  Form.createFormField({
        value: idStateStr?idStateStr:""
      }),
      contactState:  Form.createFormField({
        value: contactStateStr?contactStateStr:""
      }),
      bankCardState:  Form.createFormField({
        value: bankCardStateStr?bankCardStateStr:""
      }),
      phoneState:  Form.createFormField({
        value: phoneStateStr?phoneStateStr:""
      }),
      zhimaState:  Form.createFormField({
        value: zhimaStateStr?zhimaStateStr:""
      }),
      creditCardState:  Form.createFormField({
        value: creditCardStateStr?creditCardStateStr:""
      }),
      taobaoState:  Form.createFormField({
        value: taobaoStateStr?taobaoStateStr:""
      }),
      netSilverState:  Form.createFormField({
        value: netSilverStateStr?netSilverStateStr:""
      }),
      aidName:  Form.createFormField({
        value: aidName?aidName:""
      }),
      aidLink:  Form.createFormField({
        value: aidLink?aidLink:""
      }),
      aidWith:  Form.createFormField({
        value: aidWith?aidWith:""
      }),
      otherName:  Form.createFormField({
        value: otherName?otherName:""
      }),
      otherLink:  Form.createFormField({
        value: otherLink?otherLink:""
      }),
      otherWith:  Form.createFormField({
        value: otherWith?otherWith:""
      }),

    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  let { manageUserDetailModel } = props;
  if(manageUserDetailModel){
    var {
      livingImg,
      frontImg,
      backImg,
    } = manageUserDetailModel;
  }else{
    var livingImg = '',
      frontImg = '',
      backImg = '';
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
  const formItemLayout1 = {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 20
    },
  };
  return (
    <Form layout="inline">
      <Row style={{marginBottom:40}} gutter={16}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }}>
          <Card key="peopleimg"
            hoverable
            style={{ width: 240}}
                cover={<a href={livingImg} target="_blank"><div style={{backgroundImage:`url(${livingImg})`}} className={styles.coverdiv}>&nbsp;</div></a>}
          >
            <Meta
              title="人脸正面照"
            />
          </Card>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }}>
          <Card key="fontimg"
            hoverable
            style={{ width: 240 }}
            cover={<a href={frontImg} target="_blank"><div style={{backgroundImage:`url(${frontImg})`}} className={styles.coverdiv}>&nbsp;</div></a>}
          >
            <Meta key="endimg"
              title="身份证正面照"
              style={{textAlign:'center',width:'100%'}}
            />
          </Card>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }}>
          <Card
            hoverable
            style={{  width: 240}}
            cover={<a href={backImg} target="_blank"><div style={{backgroundImage:`url(${backImg})`}} className={styles.coverdiv}>&nbsp;</div></a>}
          >
            <Meta
              title="身份证背面照"
            />
          </Card>
        </Col>
      </Row>
      <Divider>用户基本信息</Divider>
      <Row style={{marginTop:40}} gutter={16}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='真实姓名' {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('realName',{})(<Input className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='性别' {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('sex',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <FormItem label='身份证号' {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('idNo',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='年龄'  {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('age',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='婚姻'  {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('marryState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <FormItem label='身份证地址' {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('idAddr',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='学历'  {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('education',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='职业' {...formItemLayout} className={styles.formitem}>
            {getFieldDecorator('occupation',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <FormItem label='银行卡号' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('bankCardNo',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='芝麻分' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('zhimaScore',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='淘宝账号' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('taobaoAccount',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span:10, offset: 1 }}>
          <FormItem label='现住址' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('liveAddr',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>

      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='账单邮箱' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('creditCardEmail',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
          <FormItem label='注册经纬度' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('registerCoordinate',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <FormItem label='注册所在地' {...formItemLayout}  className={styles.formitem}>
            {getFieldDecorator('registerAddr',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>

      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='紧急联系人姓名'  {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('aidName',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2}}>
          <FormItem label='紧急联系人联系方式' {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('aidLink',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='紧急联系人与本人关系' {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('aidWith',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='其他联系人姓名' {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('otherName',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2}}>
          <FormItem label='其他联系人联系方式' {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('otherLink',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='其他联系人与本人关系' {...formItemLayout1}  className={styles.formitem}>
            {getFieldDecorator('otherWith',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Divider>认证状态</Divider>
      <Row style={{marginTop:40}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
          <FormItem label='实名认证'>
            {getFieldDecorator('idState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='芝麻认证'>
            {getFieldDecorator('zhimaState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='运营商认证'>
            {getFieldDecorator('phoneState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
          <FormItem label='联系人认证'>
            {getFieldDecorator('contactState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='淘宝认证'>
            {getFieldDecorator('taobaoState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='账单邮箱认证'>
            {getFieldDecorator('creditCardState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
          <FormItem label='银行卡认证'>
            {getFieldDecorator('bankCardState',{})(<Input  className={styles.noselect} disabled={true}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        </Col>
      </Row>
    </Form>
  );
});

export default Detail;
