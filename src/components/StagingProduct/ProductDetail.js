/**
 * Created by Administrator on 2017/12/15 0015.
 */
import React from 'react';
import { Row, Col, Form, Input} from 'antd';
import styles from '../../routes/UserManage/UserInfoList.less';
const FormItem = Form.Item;

const ProductDetail  = Form.create({
  mapPropsToFields(props) {
    if(!props.data){
      var name,
        periodValue,
        singleMax,
        singleMin,
        step;
    }else{
      var  {
        name,periodValue,singleMax,singleMin,step
      } = props.data
    }
    return {
      name:  Form.createFormField({
        value: name||""
      }),
      periodValue:  Form.createFormField({
        value: periodValue||""
      }),
      singleMax:  Form.createFormField({
        value: singleMax||""
      }),
      singleMin:  Form.createFormField({
        value: singleMin||""
      }),
      step:  Form.createFormField({
        value: step||""
      }),
    }
  }
})(
  (props)=>{
    const { getFieldDecorator } = props.form;
    var { period,calculateMode,type} = props.data;
    var typeStr = type == 1? 'PDL':'分期';
    var calculateModeStr = calculateMode == 1?'PDL计算公式':'等额本息';
    var periodStr = period ==2 ?'按期':'按天';
    var suppotStr =  period == 2? '支持期数':'支持天数';
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
    return <div>
      <Form>
        <Row style={{marginTop:40}} gutter={16}>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='产品名称' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('name',{})(<Input disabled={true}/>)}
            </FormItem>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='产品类型' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('typeStr',{
                initialValue:typeStr,
              })(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row  gutter={16}>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='计算方式' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('calculateModeStr',{
                initialValue:calculateModeStr,
              })(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='单笔借款上限' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('singleMax',{})(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row  gutter={16}>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='单笔借款下限' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('singleMin',{})(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='递增借款额' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('step',{})(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row  gutter={16}>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem label='还款间隔单位' {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('periodStr',{
                initialValue:periodStr,
              })(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <FormItem   label={suppotStr} {...formItemLayout} className={styles.formitem}>
              {getFieldDecorator('periodValue',{})(<Input  disabled={true}/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  }
);

export default ProductDetail;

