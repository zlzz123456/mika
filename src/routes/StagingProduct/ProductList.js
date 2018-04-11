/*
 * 组件名称：分期产品列表
 * 功能：列表的查询，
 * model: staging_productlist
 * api: ordermanage
 *
 *  */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Tabs} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ProductDetail from '../../components/StagingProduct/ProductDetail';
import ProductTable from '../../components/StagingProduct/ProductTable';

import styles from './ProductList.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  productlist: state.productlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modal: false,
    formValues: {},
    recordData:'',
    activeKey:'0',
    dataDetail:{},
    interestData:[], //利息
    payData:[], //支付信审费
    accoutData:[], //账户管理费
    penaltyData:[], //罚息,
    feeType:'1', //1是元2是%
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productlist/fetch',
      payload: {
        id:'',
        name:''
      }
    });
  }

  /*TODO: 弹框的显示与隐藏 - 查看订单详情 - 传递数据[orderId]*/
  handleModalVisible = (flag = false,record='') => {
    const { dispatch } = this.props;
    if(flag){
      this.setState({
        modal: flag,
        recordData: record,
      });
      dispatch({
        type:'productlist/productfetch',
        payload:record.id,
        callback:(result)=>{
          this.setState({
            dataDetail: result.resultData,
          })
        }
      })
    }else{
      this.setState({
        modal: flag,
        recordData: '',
        activeKey:'0',
      })
    }
  }

  /* TODO:  Tab标签的切换事件 --  */
  onSwitch = (key) => {
    var { dispatch } = this.props;
    var { recordData } = this.state;
    this.setState({
      activeKey:key,
    });
    if(key == 0 ){
      dispatch({
        type:'productlist/productfetch',
        payload: recordData.id,
        callback:(result)=>{
          this.setState({
            dataDetail: result.resultData
          })
        }
      });
    }else{
      let { id, rateVersion } = recordData;
      let params = {
        id,
        rateVersion,
        type:key
      };
      dispatch({
        type:'productlist/productfeefetch',
        payload: params,
        callback:(result)=>{
          this.setData(key,result);
        }
      });
    }
  };

  /* TODO:条件查询 - 清空查询条件  - 内部状态管理：初始化表单数据[ formValues ] */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues:{
        id:'',
        name:''
      },
    });
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
      var jsonParams = {
        id:values.id?values.id.trim():'',
        name:values.name?values.name.trim():''
      };
      this.setState({
        formValues:{
          ...jsonParams
        },
      });
      dispatch({
        type: 'productlist/fetch',
        payload: {
          ...jsonParams
        },
      });
    });
  }

  /*TODO: 生成条件查询表单 ,参数是：无 */
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="产品ID">
              {getFieldDecorator('id',{
                rules:[
                  { max:2,pattern:/^\d{1,2}$/,message:'产品ID应为小于99的整数'}
                ],
                validateTrigger:'onBlur'
              })(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="产品名称">
              {getFieldDecorator('name',{
                // rules:[
                //   { pattern:/^[\u4e00-\u9fa5A-Za-z\d-.]+$/,message:'输入含有特殊字符，空格，请检查'}
                // ],
                // validateTrigger:'onBlur'
              })(
                <Input placeholder="请输入" style={{ width: '80%' }} />
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

  /** 数据转换函数 ：根据不同类型生成相应的array数据 -
   * result : [
   *        {
   *        periodNum: number,
   *        feeType: number,
   *        prodFeeItemModels:[ { userLevel: 1,fee: 0.2},{userLevel: 2,fee: 0.2},...{userLevel: -1,fee: 0.2}]
   *        }
   *         ]
   *生成的新数据 newResult :[
   *     {
   *        titleV: string,
   *        1: 0.12,
   *        2: 0.2,
   *        ...
   *        -1: 0.1,
   *       ]
   *
   * **/
  setData = (key,result)=>{
    const typeStr = [
      'dataDetail',
      'accoutData',
      'payData',
      'interestData',
      'penaltyData'
    ];
     var Typename  = typeStr[key];
     var me = this;
      if(result.resultCode === 1000){
        //1.创建一个临时对象
        var tempResult  = {};
        if( result.resultData.length ){
          var tempArr = [];
          var feeType = '';
          result.resultData.map((obj)=>{
            let tempObj = {
              titleV: obj.periodNum,
            }
            feeType = obj.feeType,
              obj.prodFeeItemModels.map((obj)=>{
                tempObj[obj.userLevel] = (obj.fee !='' || obj.fee ==0 )?obj.fee:''
              })
            tempArr.push(tempObj)
          });
          tempResult[Typename] = tempArr;
          me.setState({
            ...tempResult,
            feeType
          })
        }else{
          tempResult[Typename] ={
            ...result.data
          };
          me.setState({
            ...tempResult,
          })
        }
      }
  };

  render() {
    const { productlist: { loading, data } ,  dispatch } = this.props;
    const {  activeKey , modal, recordData, dataDetail, interestData, payData, accoutData, penaltyData ,feeType} = this.state;
    var { period } = recordData;
    const columns = [{
      title:'产品ID',
      dataIndex:'id'
    },{
      title:'产品名称',
      dataIndex:'name'
    },{
      title:'产品类型',
      dataIndex:'type',
      render:(text)=> text === 1?'PDL':'分期'
    },{
      title:'支持产品',
      dataIndex:'periodValue',
      width:160,
      render:(text,record) => {
        let temp =  text.split(',').map((item)=>{
          let typeStr =( record.period == 1? '天':'期');
          return item+typeStr
        });
        return temp.join(',');
      }
    },{
      title:'创建时间',
      dataIndex:'createTime'
    },{
      title:'修改时间',
      dataIndex:'updateTime'
    },{
      title:'操作',
      dataIndex:'',
      render:(text,record)=>{
        var data = record;
        return (
          <div>
            <a onClick={() => this.handleModalVisible(true,data)}>产品详情</a>
          </div>
        )
      }
    }];

    return (
      <PageHeaderLayout title="产品列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
            <StandardTable
              columns = { columns }
              loading={loading}
              data={data}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="产品详情"
          visible={modal}
          onCancel={() => this.handleModalVisible()}
          width={900}
          footer={[
            <Button key="back" type="primary"  onClick={()=>this.handleModalVisible()}>
              返回
            </Button>
          ]}
        >
          {
            modal && <Tabs defaultActiveKey={ activeKey } onChange={this.onSwitch}>
              <TabPane tab="基础信息" key='0'>
                <ProductDetail canEdit={true} data={ dataDetail }/>
              </TabPane>
              <TabPane tab="利率" key="3">
                {activeKey == '3' && <ProductTable data={ interestData } page={false}  key="Interest" feeType={feeType} period={period}/>}
              </TabPane>
              <TabPane tab="支付信审费" key="2">
                {activeKey == '2' &&<ProductTable data={ payData }  page={false}  key="pay" feeType={feeType}  period={period}/>}
              </TabPane>
              <TabPane tab="账户管理费" key="1">
                {activeKey == '1' && <ProductTable data={ accoutData } key="accout" page={false}  feeType={feeType} period={period}/>}
              </TabPane>
              <TabPane tab="罚息" key="4">
                {activeKey=='4'  && <ProductTable data={ penaltyData }  key="penalty" page={false}  feeType={feeType} period={period}/>}
              </TabPane>
            </Tabs>
          }
          </Modal>
      </PageHeaderLayout>
    );
  }
}
