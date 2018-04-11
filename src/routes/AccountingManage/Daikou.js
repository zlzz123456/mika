import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd'

const FormItem = Form.Item;

class Daikou extends PureComponent {

  constructor(props) {
    super(props);
  }
  /**代扣**/
  handleDaikouSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submit(values)
      }
    });
  };
  /**校验输入的额度**/
  checkAmount(rule, value, callback) {
    console.log(value);
    if (value > this.props.dueAmount) {
      callback('代扣金额不得超出逾期总额！')
    } else if (value === '0') {
      callback('代扣金额不得为0！')
    }else {
      callback()
    }
  }
  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 8,
      },
    };
    return (
      <div>
        <Form onSubmit={this.handleDaikouSubmit}>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {this.props.realName}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="逾期总额"
          >
            {this.props.dueAmount}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="代扣金额"
          >
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true, message: '请填写代扣金额',
                },
                {
                  validator: this.checkAmount.bind(this)
                }
              ],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.props.loading}>确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedDaikou = Form.create()(Daikou);

export default WrappedDaikou
