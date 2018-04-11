/**
 * 金融产品分期列表菜单 -- 所有接口请求
 */

import request from '../utils/request';

//获取产品列表
export async function queryProductList(params){
  let { id, name } = params;
  // console.log('params');
  // console.log(name);
  // console.log('encodeURIComponent_params');
  // console.log(encodeURIComponent(name));
  // console.log('encodeURI_params');
  // console.log(encodeURI(name));
  // console.log('escape_params');
  // console.log(escape(name));
  let  paramsStr = `id=${id}&name=${encodeURIComponent(name)}`;
  return request('/modules/manage/prod/list.htm',{
    method:'POST',
    body:paramsStr
  })
}

//查看产品详情
export async function queryDetail(params){
  let paramsStr = `id=${params}`;
  return request('/modules/manage/product/baseDetail.htm',{
    method:'POST',
    body: paramsStr
  })
}

//查看利率 或支付信审费或账户管理费
export async function queryDetailFee(params){
  let { id, rateVersion, type } = params;
  let paramsStr = `id=${id}&rateVersion=${rateVersion}&type=${type}`;
  return request('/modules/manage/product/feeItemDetail.htm',{
    method: 'POST',
    body: paramsStr
  })
}
