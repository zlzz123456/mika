/**
 * Created by Administrator on 2017/12/11 0011.
 */
/*
 * 组件名称：用户信息列表
 * 功能：列表的查询，
 * model: limitlist
 * api: api
 *
 *  */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Spin} from 'antd';
import moment from 'moment';
import StandardTable from '../../components/StandardTable';
import Detail from '../../components/UserInfoList/Detail';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserInfoList.less';

const FormItem = Form.Item;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;
const dateFormat ='YYYY-MM-DD';
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
message.config({
  top: 320,
  duration: 2,
});

@connect(state => ({
  userlist: state.userlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {
      pageSize: 10,
      currentPage: 1,
      searchParams: ''
    },
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userlist/channelNav', //TODO:加载渠道枚举数据
    });
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //
  //   dispatch({
  //     type: 'userlist/fetch',    //TODO:组件加载完成后，获取表格数据
  //     payload: {
  //       pageSize: 10,
  //       currentPage: 1,
  //       searchParams: ''
  //     }
  //   });
  // }

  /* TODO: 表格的分页处理 - 以及内部状态管理：表单数据[ formValues ] */
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.setState({
      formValues:{
        ...params
      }
    });
    dispatch({
      type: 'userlist/fetch',
      payload: params,
    });
  }


  /*TODO: 弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
  handleModalVisible = (flag = false,record={}) => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible:flag
    });
    if(flag&&record.userId){
      //显示用户信息 - 弹框
      dispatch({
        type: 'userlist/userDetailfetch',
        payload: record.userId
      })
    }else{
      //关闭弹框
      dispatch({
        type: 'userlist/changeModal',
        payload: flag
      })
    }
  }

  /* TODO:条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = { phone:values.phone?values.phone.trim():undefined,
        realName:values.realName?values.realName.trim():undefined,
        registerClient:values.registerClient||undefined, registerChannel:values.registerChannel||undefined};
      if(values.registerTime && values.registerTime.length != 0){
          jsonParams.registerStartTime = values.registerTime[0].format('YYYY-MM-DD').toString();
          jsonParams.registerEndTime = values.registerTime[1].format('YYYY-MM-DD').toString()
      }
      if(JSON.stringify(jsonParams) === '{}') {
         message.error('至少搜索一个查询条件');
      }else{
        this.setState({
          formValues:{
            currentPage: 1,
            pageSize: 10,
            searchParams:JSON.stringify(jsonParams)
          },
        });
        dispatch({
          type: 'userlist/fetch',
          payload: {
            currentPage: 1,
            pageSize: 10,
            searchParams:JSON.stringify(jsonParams)
          },
        });
      }
    });
  }

  /* TODO:条件查询 - 清空查询条件  - 内部状态管理：初始化表单数据[ formValues ] */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {
        pageSize: 10,
        currentPage: 1,
        searchParams: ''
      }
    });
  }

  /*TODO: 生成条件查询表单 ,参数是：渠道枚举数据 select的下拉选项 */
  renderAdvancedForm(params) {
    const { getFieldDecorator } = this.props.form;
    const optionparams = params.length!=0?params.map(item=><Option key={item} value={item}>{item}</Option>):[];
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone',{
                rules:[
                  { pattern:/^1[3|4|5|7|8]\d{9}$/,
                    len:11,
                    message:'请输入有效的手机号'}
                ],
                validateTrigger:'onBlur'
              })(
                <Input placeholder="请输入"  maxLength="11" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('realName')(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="注册时间">
              {getFieldDecorator('registerTime')(
                <RangePicker style={{ width: '80%' }} format={dateFormat}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="注册渠道">
              {getFieldDecorator('registerChannel')(
                <Select placeholder="请选择" style={{ width: '80%'}}>
                  {optionparams}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="注册客户端">
              {getFieldDecorator('registerClient')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option value="Android">Android</Option>
                  <Option value="iOS">iOS</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
             <span style={{ float: 'center', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>查询</Button>
                <Button  onClick={this.handleFormReset}>重置</Button>
              </span>
          </Col>
        </Row>
      </Form>
    );
  }

  /*TODO:UI组件渲染*/
  render() {

    const { userlist: { loading , data , userinfo, channellist} ,  dispatch } = this.props;
    const { modalVisible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '姓名',
        dataIndex: 'realName',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
      },
      {
        title: '注册客户端',
        dataIndex: 'registerClient',
      },
      {
          title: '注册渠道',
          dataIndex: 'registerChannel',
      },
      {
        title: '操作',
        render: (text,record) => {
          var dataUser = record;
          return (
            <div>
              <a onClick={() => this.handleModalVisible(true,dataUser)}>用户详情</a>
            </div>
          )},
      },
    ];

    return (
      <PageHeaderLayout title="用户信息">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm(channellist)}
            </div>
            <StandardTable
              columns = { columns }
              loading={ loading }
              data={data}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="用户详情"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible()}
          width={1200}
          bodyStyle={{ height:'640px',overflowY:'auto'}}
          footer ={[
            <Button key="btn" type="primary" onClick={() => this.handleModalVisible()}>返回</Button>
          ]}
        >
          {
            userinfo.manageUserDetailModel|| userinfo.clUserAuth || userinfo.userEmerContacts ? <Detail {...userinfo} />:<Spin size="small" style={{ marginLeft: 8 }} />
          }
        </Modal>
      </PageHeaderLayout>
    );
  }
}
