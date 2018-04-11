/**
 * Created by Administrator on 2018/1/3 0003. -- wdw
 * 页面 - 银联信息
 * props: 待定
 */

import React, { Component } from 'react';
import { Row, Col } from 'antd';

class UnionpayInfo extends Component {
  state = {
    UnionpayInfo: {},
  }

  componentDidMount() {
    const { userId, dispatch, detailUrl } = this.props;
    dispatch({
      type: detailUrl,
      payload: userId,
      callback: (result) => {
        if (result.resultCode === 1000) {
          this.setState({
            UnionpayInfo: result.resultData || {},
          });
        }
      },
    });
  }


  ListSerise(data, classStyle, titleStr) {
    if (!(JSON.stringify(data) === "{}")) {
      var { S0502, S0464, S0474 } = data;
      var str = '-';
      switch (Number(S0502)) {
        case 1: str='4年换5个省份';
        break;
        case 2: str='4年换4个省份';
        break;
        case 3: str='4年换3个省份';
        break;
        case 4: str='4年换2个省份';
        break;
        case 5: str='4年没有换过省份';
        break;
      }
    } else {
      var S0502,
        S0464,
        S0474;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>地域流动性（1~5）</Col>
        <Col span={6}>{str || '-'}</Col>
        <Col span={6}>卡性质</Col>
        <Col span={6}>{S0464 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>还款能力指标</Col>
        <Col span={6}>{S0474 || '-'}</Col>
      </Row>
    </div>);
  }
  ListSerise1(data, classStyle, titleStr) { // 近12月使用信息
    if (!(JSON.stringify(data) === "{}")) {
      var { S0135, S0483Name, S0504, S0474, S0544, S0686, S0687, S0057, S0060, S0551, S0615, S0174, S0175, S0478, S0479, S0629, S0630, S0631 } = data;
    } else {
      var
        S0135,
        S0474,
        S0483Name,
        S0504,
        S0135,
        S0544,
        S0686,
        S0687,
        S0057,
        S0060,
        S0551,
        S0615,
        S0174,
        S0175,
        S0478,
        S0479,
        S0629,
        S0630,
        S0631;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>常驻城市（笔数）</Col>
        <Col span={6}>{S0483Name || '-'}</Col>
        <Col span={6}>常驻城市（天数）</Col>
        <Col span={6}>{S0504 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>最近一笔交易时间</Col>
        <Col span={6}>{S0135 || '-'}</Col>
        <Col span={6}>月均消费金额</Col>
        <Col span={6}>{S0544 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>银行卡入账总金额</Col>
        <Col span={6}>{S0686 || '-'}</Col>
        <Col span={6}>银行卡入账总笔数</Col>
        <Col span={6}>{S0687 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>网购金额</Col>
        <Col span={6}>{S0057 || '-'}</Col>
        <Col span={6}>网购笔数</Col>
        <Col span={6}>{S0060 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>交易总金额（消费类）</Col>
        <Col span={6}>{S0551 || '-'}</Col>
        <Col span={6}>交易类型数量</Col>
        <Col span={6}>{S0615 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>夜间交易金额占比</Col>
        <Col span={6}>{S0174 || '-'}</Col>
        <Col span={6}>夜间交易笔数占比</Col>
        <Col span={6}>{S0175 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>月均交易金额</Col>
        <Col span={6}>{S0478 || '-'}</Col>
        <Col span={6}>月均交易笔数</Col>
        <Col span={6}>{S0479 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>取现金额占比</Col>
        <Col span={18}>{S0629 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>每月取现金额</Col>
        <Col span={18}>{S0630 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>每月取现笔数</Col>
        <Col span={18}>{S0631 || '-'}</Col>
      </Row>
    </div>);
  }

  ListFourSerise(data, classStyle, titleStr) {
    if (!(JSON.stringify(data) === "{}")) {
      var {
          S0426, S0427, S0428,
          S0429, S0430, S0431,
          S0432, S0433, S0434,
          S0435, S0436, S0437,
          S0438, S0439, S0440,
          S0441,
          S0442,
          S0443,
          S0444,
          S0445,
          S0446,
          S0447,
          S0448,
          S0449,
          S0204,
          S0205,
          S0672,
          S0453,
          S0454,
          S0428,
        } = data;
    } else {
      var S0426,
        S0427,
        S0428,
        S0429,
        S0430,
        S0431,
        S0432,
        S0433,
        S0434,
        S0435,
        S0436,
        S0437,
        S0438,
        S0439,
        S0440,
        S0441,
        S0442,
        S0443,
        S0444,
        S0445,
        S0446,
        S0447,
        S0448,
        S0449,
        S0204,
        S0205,
        S0672,
        S0453,
        S0454,
        S0428;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6} />
        <Col span={6}>1个月</Col>
        <Col span={6}>6个月</Col>
        <Col span={6}>12个月</Col>
      </Row>
      <Row>
        <Col span={6}>博彩消费金额</Col>
        <Col span={6}>{S0426 || '-'}</Col>
        <Col span={6}>{S0427 || '-'}</Col>
        <Col span={6}>{S0428 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>博彩消费笔数 </Col>
        <Col span={6}>{S0429 || '-'}</Col>
        <Col span={6}>{S0430 || '-'}</Col>
        <Col span={6}>{S0431 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>法律服务消费金额 </Col>
        <Col span={6}>{S0432 || '-'}</Col>
        <Col span={6}>{S0433 || '-'}</Col>
        <Col span={6}>{S0434 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>法律服务消费笔数</Col>
        <Col span={6}>{S0435 || '-'}</Col>
        <Col span={6}>{S0436 || '-'}</Col>
        <Col span={6}>{S0437 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>罚款金额</Col>
        <Col span={6}>{S0438 || '-'}</Col>
        <Col span={6}>{S0439 || '-'}</Col>
        <Col span={6}>{S0440 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>罚款笔数 </Col>
        <Col span={6}>{S0441 || '-'}</Col>
        <Col span={6}>{S0442 || '-'}</Col>
        <Col span={6}>{S0443 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>纳税金额 </Col>
        <Col span={6}>{S0444 || '-'}</Col>
        <Col span={6}>{S0445 || '-'}</Col>
        <Col span={6}>{S0446 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>纳税笔数 </Col>
        <Col span={6}>{S0447 || '-'}</Col>
        <Col span={6}>{S0448 || '-'}</Col>
        <Col span={6}>{S0449 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>公用事业缴费金额</Col>
        <Col span={6}>{S0204 || '-'}</Col>
        <Col span={6}>{S0205 || '-'}</Col>
        <Col span={6}>{S0672 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}> 公用事业缴费笔数 </Col>
        <Col span={6}>{S0453 || '-'}</Col>
        <Col span={6}>{S0454 || '-'}</Col>
        <Col span={6}>{S0428 || '-'}</Col>
      </Row>
    </div>);
  }


  render() {
    const { classStyle, userId, listUrl, dispatch } = this.props;
    const { UnionpayInfo } = this.state;

    return (<div>
      <div className={classStyle.listDiv}>
        {
          this.ListSerise(UnionpayInfo, classStyle, '基本信息')
        }
      </div>
      <div className={classStyle.listDiv}>
        <div className={classStyle.listSerise}>
          {
          this.ListSerise1(UnionpayInfo, classStyle, '近12月使用信息')
        }
        </div>
      </div>
      <div className={classStyle.listDiv}>
        {
          this.ListFourSerise(UnionpayInfo, classStyle, '使用信息')
        }
      </div>
    </div>);
  }
}

export default UnionpayInfo;
