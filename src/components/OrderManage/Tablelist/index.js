/**
 * Created by Administrator on 2018/1/24 0024.
 */
import React from 'react';
import { Table } from  'antd';

var Tablelist = (props)=>{
  const { columns , list , loading } = props;
  return <Table columns={columns}
                dataSource={ list }
                pagination={false}
                loading={loading}
                size="small" bordered />
}
export default Tablelist
