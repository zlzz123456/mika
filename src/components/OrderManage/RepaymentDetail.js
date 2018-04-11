/**
 * Created by Administrator on 2018/1/23 0023.
 */
/**
 * Created by Administrator on 2017/12/16 0016.
 */
import React, { PureComponent } from 'react';
import { Collapse } from 'antd';
import Tablelist from './Tablelist';

const Panel = Collapse.Panel;

export default class TableDetail extends PureComponent {
  state = {
    data1:{
      title:'还款计划',
      loading: true,
      list:[],
    },
    data2:{
      title:'还款流水',
      loading: true,
      list:[],
    },
    data3:{
      title:'逾期信息',
      loading: true,
      list:[],
    },
  };

  componentDidMount(){
    const {data1, data2, data3} = this.props;
    let result1 = this.getData(this.setCallback(this.getStatevalue('data1')));
    let result2 = this.getData(this.setCallback(this.getStatevalue('data2')));
    let result3 = this.getData(this.setCallback(this.getStatevalue('data3')));

    //let result1 = composeFunction(this.getData, composeFunction(this.setCallback,this.getStatevalue));
    result1('borroworder/modallistfetch');
    result2('repaymentorder/sericesFetch');
    result3('repaymentorder/dueFetch');
  }

  composeFunction = (f,g)=>{
    return (x)=>{
      return f(g(x))
    }
  }

  /**  1.发请求 -- 传回调函数 -- 传typestr请求类型 --- 生成请求**/
  getData = (callback)=>{
    const { dispatch, orderId } = this.props;
    return (typeStr)=>dispatch({
      type:typeStr,
      payload:orderId,
      callback
    })
  }

  /** 2.设置回调函数 -- 传改变state函数 -- 传回调结果 -- 返回改变state函数 **/
  setCallback = (f)=>{
    return (result)=>{
      if(result.resultCode === 1000){
        return f(result.resultData);
      }else{
        return f([]);
      }
    }
  }

  /** 3.改变state -- 传属性名 -- 传state值 -- 改变state **/
  getStatevalue = (keyname)=>{
    const {data1,data2, data3} = this.state;
    const result = keyname ==='data1'?data1:(keyname ==='data2'?data2:data3);
    return (values)=>{
      this.setState({
        [keyname]:{ ...result, list: values, loading: false }
      })
    }
  }

  render() {
    const { data1, data2, data3 } = this.state;
    const customPanelStyle = {
      background: '#fff',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    let cloumn1 = [{
      title:'期数',
      dataIndex:'sheduleNo'
    },{
      title:'还款日期',
      dataIndex:'dueTime'
    },{
      title:'月还本金',
      dataIndex:'principal'
    },{
      title:'月还利息',
      dataIndex:'interest'
    },{
      title:'月还本息',
      dataIndex:'principalInterest'
    },{
      title:'月还服务费',
      dataIndex:'serviceFee'
    },{
      title:'月还总额',
      dataIndex:'amount'
    },{
      title:'剩余未还本金',
      dataIndex:'remainPrincipal'
    },{
      title:'一次性结清金额',
      dataIndex: 'totalAmount'
    }];

    const cloumn2 = [{
      title:'交易流水号',
      dataIndex:'serialNo',
    },{
      title:'交易类型',
      dataIndex:'repayTypeStr',
    },{
      title:'交易金额',
      dataIndex:'tradeAmount',
    },{
      title:'营销费',
      dataIndex:'marketingFee',
    },{
      title:'交易状态',
      dataIndex:'tradeStatusStr',
    },{
      title:'发送交易时间',
      dataIndex:'tradeStartTime',
    },{
      title:'是否部分还款',
      dataIndex:'partRepay',
    },{
      title:'交易渠道',
      dataIndex:'tradeChannel',
    },{
      title:'接收结果时间',
      dataIndex: 'updateTime',
    },{
      title:'银行返回交易时间',
      dataIndex:'tradeTime',
    },{
      title:'账务状态',
      dataIndex:'accountState',
    },{
      title:'交易详情',
      dataIndex:'result',
    }];

    const cloumn3 = [{
      title:'逾期期数',
      dataIndex:'sheduleNo'
    },{
      title:'逾期总额',
      dataIndex:'amount'
    },{
      title:'逾期本金',
      dataIndex:'principal'
    },{
      title:'逾期利息',
      dataIndex:'interest'
    },{
      title:'逾期服务费费',
      dataIndex:'serviceFee'
    },{
      title:'罚息',
      dataIndex:'penalty'
    }];
    const listPanel = [{...data1,columns:cloumn1}, {...data2,columns:cloumn2}, {...data3, columns:cloumn3}];

    return <Collapse style={{marginTop:40,marginBottom:20}} bordered={false} defaultActiveKey={['0']}>
        {
          listPanel.map((item,index)=>(<Panel header={item.title} key={index} style={customPanelStyle}>
              <Tablelist {...item}/>
            </Panel>))
        }
    </Collapse>
  }
}

