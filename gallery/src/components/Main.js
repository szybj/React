require('normalize.css/normalize.css');
require('styles/App.scss');
import ReactDOM from 'react-dom';

import React from 'react';

let getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);
let get30RateRandom = () => (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
let imageDatas = require('../data/imageDatas.json');
imageDatas = (imageDatasArr => {
  for (let i = 0, j = imageDatasArr.length; i < j; i++){
    let singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData
  }
  return imageDatasArr
})(imageDatas);
// 单个图片组件
class ImgFigure extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  // imgFigure 的点击事件
  handleClick (ev) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
     } else {
      this.props.centerImg();
    }
    ev.stopPropagation();
    ev.preventDefault();
  }
  render() {
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    if (this.props.arrange.rotate) {
      ['MozTransform','msTransform','WebkitTransform', 'transform'].forEach(item => {
        styleObj[item] = `rotate(${this.props.arrange.rotate}deg)`
      })
    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11
    }
    let imgFigureClassName = `img-figure${this.props.arrange.isInverse ? ' is-inverse' : ''}`;
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
class ControllerUnit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (ev) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.centerImg();
    }
    ev.stopPropagation();
    ev.preventDefault();
  }
  render () {
    let controllerUnitClassName = 'controller-unit';
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center ';
      //如果翻转显示翻转状态
      if (this.props.arrange.isInverse) {
        controllerUnitClassName += 'is-inverse'
      }
    }
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    )
  }
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
          right: 0
      },
      hPosRange: { // 水平方向的取值范围
        leftSecX: [0, 0],
          rightSecX: [0, 0],
          y: [0, 0]
      },
      vPosRange: { // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: []
    };
  }
  // 翻转图片 index 当前被执行inverse操作的图片对应信息数组的index值
  inverse (index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({imgsArrangeArr});
    }
  }
  // 图片居中
  centerImg (index) {
    return() => {
      this.rearrange(index)
    }
  }
  // 重新布局所有图片 centerIndex指定居中排布哪个图片
  rearrange (centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2), // 顶部区域显示图片的数量
        topImgSpliceIndex= 0, // 顶部区域图片分割位置
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 居中centerIndex的图片
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    // 取出要布局顶部图片的状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    imgsArrangeTopArr = imgsArrangeTopArr.map(item => {
      item = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30RateRandom(),
        isCenter: false
      };
      return item
    });
    // 布局左右两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      // 前半部分布局在左边，后半部分布局在右边
      hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30RateRandom(),
        isCenter: false
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({imgsArrangeArr});
  }
  // 组件加载后，计算每张图片位置范围
  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.floor(stageW / 2),
        halfStageH = Math.floor(stageH / 2);
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.floor(imgW / 2),
        halfImgH = Math.floor(imgH / 2);

    // 计算中心图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };
    // 计算左右两侧区域图片取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算顶部区域图片取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    let n = Math.floor(Math.random() * 10);
    this.rearrange(n);
  }
  render() {
    let controllerUnits = [],
      imgFigures = [];
    imageDatas.forEach((item, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure data={item}
                                 key={index}
                                 ref={`imgFigure${index}`}
                                 arrange={this.state.imgsArrangeArr[index]}
                                 inverse={this.inverse(index)}
                                 centerImg={this.centerImg(index)}
      />);
      controllerUnits.push(<ControllerUnit key={index}
                                           arrange={this.state.imgsArrangeArr[index]}
                                           inverse={this.inverse(index)}
                                           centerImg={this.centerImg(index)}/>)
    });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
