import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd'

const FormItem = Form.Item;

class Jianmian extends PureComponent {

  constructor(props) {
    super(props);
  }
  /**减免**/
  handleJianmianSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submit(values)
      }
    });
  };
  /**校验输入的额度**/
  checkPenalty(rule, value, callback) {
    console.log(value);
    if (value > this.props.duePenalty) {
      callback('减免金额不得超出可减免金额！')
    } else if (value === '0') {
      callback('减免金额不得为0！')
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
        <Form onSubmit={this.handleJianmianSubmit}>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {this.props.realName}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="可减免金额"
          >
            {this.props.duePenalty}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="减免金额"
          >
            {getFieldDecorator('penalty', {
              rules: [
                {
                  required: true, message: '请填写减免金额',
                },
                {
                  validator: this.checkPenalty.bind(this)
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
const WrappedJianmian = Form.create()(Jianmian);

export default WrappedJianmian
