/**
 * Created by Administrator on 2017/12/16 0016.
 */
import React from 'react';
import { Table } from 'antd';

const TableDetail = (props) => {
  var { data } = props;
  const loading = data ? false : true;
  let cloumns = [{
    title:'操作时间',
    dataIndex:'createTime'
  },{
    title:'操作项',
    dataIndex:'repayTypeStr'
  },{
    title:'流水号',
    dataIndex:'repayId'
  },{
    title:'应还金额',
    dataIndex:'shouldAmount'
  },{
    title:'实还金额',
    dataIndex:'amount'
  },{
    title:'溢出金额',
    dataIndex:'surplusAmount'
  },{
    title:'操作人',
    dataIndex:'createPersonName'
  }];
  return <Table columns={ cloumns }
                loading = {loading}
                bordered
                dataSource={ data }/>
};

export default TableDetail;
