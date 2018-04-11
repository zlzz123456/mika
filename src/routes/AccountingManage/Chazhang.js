import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  DatePicker,
  Select,
  message,
  Modal
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

class Jianmian extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      preview: '',
      modalVisible: false
    }
  }

  /**查账**/
  handleChazhangSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fileList = this.state.fileList;
        console.log('Received values of form: ', values, 'fileList', fileList);

        function checkType(v) {
          return v.type === 'image/png' || v.type === 'image/jpeg';
        }

        function checkSize(v) {
          return v.size / 1024 / 1024 < 10
        }

        if (fileList.length > 5) {
          message.error('凭证数量超过5个，请修改')
        } else if (!fileList.every(checkType)) {
          message.error('凭证类型有误，仅支持PNG、JPG类型的图片')
        } else if (!fileList.every(checkSize)) {
          message.error('单张凭证大小不得超过10MB，请修改')
        } else {
          this.props.submit(values, fileList)
        }
      }
    });
  };

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

    const props = {
      name: 'file',
      multiple: true,
      fileList: this.state.fileList,
      onPreview: (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.setState({
            modalVisible: true,
            preview: e.target.result,
          })
        };
      },
      beforeUpload: (file) => {
        this.setState(({fileList}) => ({
          fileList: [...fileList, file],
        }));
        return false
      },
      onRemove: (file) => {
        this.setState(({fileList}) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
    };

    return (
      <div>
        <Form onSubmit={this.handleChazhangSubmit}>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {this.props.realName}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="查账金额"
          >
            {getFieldDecorator('audit', {
              rules: [
                {
                  required: true, message: '请填写查账金额',
                },{
                  pattern:/^\d*\.{0,1}\d{0,3}$/,
                  max:10,
                  message: '请填写正确查账金额',
                }
              ],
            })(
              <Input maxLength='10' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="到账时间"
          >
            {getFieldDecorator('arriveTime', {
              rules: [
                {
                  required: true, message: '请选择到账时间',
                }
              ],
            })(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择到账时间"
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="还款方式"
          >
            {getFieldDecorator('repayWay', {
              rules: [
                {
                  required: true, message: '请选择还款方式',
                }
              ],
            })(
              <Select placeholder={'选择还款方式'}>
                <Option value="1">支付宝</Option>
                <Option value="2">微信</Option>
                <Option value="3">对公转账</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="还款账号"
          >
            {getFieldDecorator('repayAccount', {
              rules: [
                {
                  required: true, message: '请填写还款账号',
                }
              ],
            })(
              <Input maxLength='34'/>
            )}
          </FormItem>
          <FormItem
            labelCol={{span: 8}}
            wrapperCol={{span: 10}}
            label="上传凭证"
          >
            {getFieldDecorator('proof', {
              rules: [
                {
                  required: true, message: '请上传图片凭证',
                }
              ],
            })(
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">请点击或拖拽文件到此区域</p>
                <p className="ant-upload-hint">
                  支持单个或批量上传<span style={{color: 'red'}}>5个</span>及以内的文件。<br/>
                  单张凭证大小不得超过<span style={{color: 'red'}}>10MB</span>。<br/>
                  支持的文件类型有：<span style={{color: 'red'}}>PNG、JPG</span>。<br/>
                  严禁上传公司机密数据或其他类型的文件
                </p>
              </Dragger>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.props.loading}>确定</Button>
          </FormItem>
        </Form>

        <Modal
          title={'图片凭证'}
          visible={this.state.modalVisible}
          onOk={()=>{this.setState({modalVisible: false})}}
          onCancel={()=>{this.setState({modalVisible: false})}}
        >
          <img src={this.state.preview} style={{width: '100%'}}/>
        </Modal>
      </div>
    )
  }
}

const WrappedJianmian = Form.create()(Jianmian);

export default WrappedJianmian
