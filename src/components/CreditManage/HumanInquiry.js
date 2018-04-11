/**
 * Created by Administrator on 2018/1/3 0003. -- liuy
 * 页面 - 人行征信
 * props: 待定
 */

import React, { Component } from 'react';
import { Row, Col } from 'antd';

class HuMan extends Component {
  state = {
    HuManInfo: {},
  }

  componentDidMount() {
    const { userId, dispatch, detailUrl } = this.props;
    dispatch({
      type: detailUrl,
      payload: userId,
      callback: (result) => {
        if (result.resultCode === 1000) {
          this.setState({
            HuManInfo: result.resultData || {},
          });
        }
      },
    });
  }


  ListSerise(data, classStyle, titleStr) { // 基本信息
    if (!(JSON.stringify(data) === "{}")) {
      console.log(111)
      var {  reportTime, marriage, grade, score, isCompulsoryExecutionRecords, isPubliCrecords  } = data;
    } else {
      var reportTime,
        marriage,
        grade,
        score,
        isCompulsoryExecutionRecords,
        isPubliCrecords;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>报告时间</Col>
        <Col span={6}>{reportTime || '-'}</Col>
        <Col span={6}>婚姻状况</Col>
        <Col span={6}>{marriage || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>评级</Col>
        <Col span={6}>{grade || '-'}</Col>
        <Col span={6}>得分</Col>
        <Col span={6}>{score || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>强制执行记录</Col>
        <Col span={6}>{!isNaN(isCompulsoryExecutionRecords) ? isCompulsoryExecutionRecords : '-'}</Col>
        <Col span={6}>公共记录</Col>
        <Col span={6}>{!isNaN(isPubliCrecords) ? isPubliCrecords : '-'}</Col>
      </Row>
            </div>);
  }
  ListSerise1(data, classStyle, titleStr) { // 信用卡信息

    if (data) {
      var {  cardNum, cUnclearedNum, cOverdueNum, cOverdue90Num, cGuaranteeNum, cIsStatusBad, cIsStatusFreez, cIsStatusStop  } = data;

    } else {
      var cardNum,
        cUnclearedNum,
        cOverdueNum,
        cOverdue90Num,
        cGuaranteeNum,
        cIsStatusBad,
        cIsStatusFreez,
        cIsStatusStop;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>信用卡数</Col>
        <Col span={6}>{!isNaN(cardNum) ? cardNum : '-'}</Col>
        <Col span={6}>未结清/未销户数</Col>
        <Col span={6}>{!isNaN(cUnclearedNum) ? cUnclearedNum : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>逾期账户数</Col>
        <Col span={6}>{!isNaN(cOverdueNum) ? cOverdueNum : '-'}</Col>
        <Col span={6}>90天以上逾期账户数</Col>
        <Col span={6}>{!isNaN(cOverdue90Num) ? cOverdue90Num : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>为他人担保笔数</Col>
        <Col span={6}>{!isNaN(cGuaranteeNum) ? cGuaranteeNum : '-'}</Col>
        <Col span={6}>呆账账户数</Col>
        <Col span={6}>{!isNaN(cIsStatusBad) ? cIsStatusBad : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>冻结账户数</Col>
        <Col span={6}>{!isNaN(cIsStatusFreez) ? cIsStatusFreez : '-'}</Col>
        <Col span={6}>止付账户数</Col>
        <Col span={6}>{!isNaN(cIsStatusStop) ? cIsStatusStop : '-'}</Col>
      </Row>
    </div>);
  }
  ListSerise2(data, classStyle, titleStr) { // 房贷信息

    if (data) {
      var { houseloanNum, hlUnclearedNum, hlOverdueNum, hlOverdue90Num, hlGuaranteeNum, hlIsStatusBad, hlIsStatusFreez, hlIsStatusStop  } = data;


    } else {
      var houseloanNum,
        hlUnclearedNum,
        hlOverdueNum,
        hlOverdue90Num,
        hlGuaranteeNum,
        hlIsStatusBad,
        hlIsStatusFreez,
        hlIsStatusStop;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>房贷数</Col>
        <Col span={6}>{!isNaN(houseloanNum) ? houseloanNum : '-'}</Col>
        <Col span={6}>未结清/未销户数</Col>
        <Col span={6}>{!isNaN(hlUnclearedNum) ? hlUnclearedNum : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>逾期账户数</Col>
        <Col span={6}>{!isNaN(hlOverdueNum) ? hlOverdueNum : '-'}</Col>
        <Col span={6}>90天以上逾期账户数</Col>
        <Col span={6}>{!isNaN(hlOverdue90Num) ? hlOverdue90Num : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>为他人担保笔数</Col>
        <Col span={6}>{!isNaN(hlGuaranteeNum) ? hlGuaranteeNum : '-'}</Col>
        <Col span={6}>呆账账户数</Col>
        <Col span={6}>{!isNaN(hlIsStatusBad) ? hlIsStatusBad : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>冻结账户数</Col>
        <Col span={6}>{!isNaN(hlIsStatusFreez) ? hlIsStatusFreez : '-'}</Col>
        <Col span={6}>止付账户数</Col>
        <Col span={6}>{!isNaN(hlIsStatusStop) ? hlIsStatusStop : '-'}</Col>
      </Row>
    </div>);
  }
  ListSerise3(data, classStyle, titleStr) { // 其他贷款信息
    if (!(JSON.stringify(data) === "{}")) {
      var { creditReferenceRiskDataOtherLoan: { otherloanNum, olUnclearedNum, olOverdueNum, olOverdue90Num, olGuaranteeNum, olIsStatusBad, olIsStatusFreez, olIsStatusStop } } = data;
    } else {
      var otherloanNum,
        olUnclearedNum,
        olOverdueNum,
        olOverdue90Num,
        olGuaranteeNum,
        olIsStatusBad,
        olIsStatusFreez,
        olIsStatusStop;
    }
    return (<div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>其他贷款数</Col>
        <Col span={6}>{!isNaN(otherloanNum) ? otherloanNum : '-'}</Col>
        <Col span={6}>未结清/未销户数</Col>
        <Col span={6}>{!isNaN(olUnclearedNum) ? olUnclearedNum : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>逾期账户数</Col>
        <Col span={6}>{!isNaN(olOverdueNum) ? olOverdueNum : '-'}</Col>
        <Col span={6}>90天以上逾期账户数</Col>
        <Col span={6}>{!isNaN(olOverdue90Num) ? olOverdue90Num : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>为他人担保笔数</Col>
        <Col span={6}>{!isNaN(olGuaranteeNum) ? olGuaranteeNum : '-'}</Col>
        <Col span={6}>呆账账户数</Col>
        <Col span={6}>{!isNaN(olIsStatusBad) ? olIsStatusBad : '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>冻结账户数</Col>
        <Col span={6}>{!isNaN(olIsStatusFreez) ? olIsStatusFreez : '-'}</Col>
        <Col span={6}>止付账户数</Col>
        <Col span={6}>{!isNaN(olIsStatusStop) ? olIsStatusStop : '-'}</Col>
      </Row>
            </div>);
  }

  render() {
    const { classStyle, userId, listUrl, dispatch } = this.props;
    const { HuManInfo } = this.state;
    return (<div>
      <div className={classStyle.listDiv}>
        {
          this.ListSerise(HuManInfo, classStyle, '基本信息')
        }
      </div>
      <div className={classStyle.listDiv}>
        <div className={classStyle.listSerise}>
          {
          this.ListSerise1(HuManInfo, classStyle, '信用卡信息')
        }
        </div>
      </div>
      <div className={classStyle.listDiv}>
        {
          this.ListSerise2(HuManInfo, classStyle, '房贷信息')
        }
      </div>
      <div className={classStyle.listDiv}>
        {
          this.ListSerise3(HuManInfo, classStyle, '其他贷款信息')
        }
      </div>
  </div>);
  }
}

export default HuMan;
