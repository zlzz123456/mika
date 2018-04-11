/**
 * Created by Administrator on 2018/1/25 0025.
 */
import React from 'react';
import { Card, Tabs, Modal } from 'antd';
import DaikouForm from './TabForm/daikouForm';
import ReduceForm from './TabForm/reduceForm';
import ChazhangForm from './TabForm/chazhangForm';

const TabPane = Tabs.TabPane;

class Tablist export React.Component{
  state={
    activekey:1
  }
  handleOk = (obj)=>{
    const { dispatch } = this.props;
    return  dispatch({
      type: obj.typeStr,
      payload: obj.formData,
      callback: obj.callback
    })
  }

  setCallback(data){
    if(data.resultCode === 1000){
      Modal.success({
        title:'操作成功'
      })
    }else{
      Modal.error({
        title:'操作失败'
      })
    }

  }

  render(){
    const { record } = this.props;
    return  <Card>
      <Tabs
      defaultActiveKey="1"
      tabPosition={mode}
      style={{ height: 220 }}
      onChange=(key)=>{
        this.setState({
          activekey:key
        })
    }
    >
      <TabPane tab="代扣" key="1">
        <DaikouForm data={record} modalTyp={activekey} handleOk={this.handleOk}/>
      </TabPane>
      <TabPane tab="减免" key="2">
        <ReduceForm data={record} modalTyp={activekey} handleOk={this.handleOk}/>
      </TabPane>
      <TabPane tab="查账" key="3">
        <ChazhangForm data={record} modalTyp={activekey} handleOk={this.handleOk}/>
      </TabPane>
    </Tabs>
    </Card>
  }
}

