import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App(props: any) {
  //热区大小 100  100
  interface itemObj {
    left: number;
    width: number;
    top: number;
    height: number;
  }

  const [itemStyle, setStyle] = useState<itemObj[]>([
    // { left: 100, width: 100, top: 100, height: 100 },
  ]);

  const boxRef = useRef<any>(null);

  const handleStart = (e: any, index: number) => {
    const el: any = document.getElementsByClassName(`test-div-${index}`)[0];
    const mouseDownLeft = e.nativeEvent.offsetX; //点击的当前元素距离当前元素左边的距离
    const mouseDownTop = e.nativeEvent.offsetY; //点击的当前元素距离当前元素上边的距离
    const mouseDownX = e.clientX; //点击区域距离父元素左的距离
    const mouseDownY = e.clientY; //点击body上的距离
    const clickBoxLeft = el.offsetLeft; //元素距离父元素左的距离
    const clickBoxTop = el.offsetTop; //元素距离父元素上的距离
    const clickBoxWeight = el.offsetWidth;
    const clickBoxHeight = el.offsetHeight;

    let direction = '';
    //判断鼠标点击的区域方向
    if (mouseDownLeft < 20) {
      direction = 'left';
    } else if (mouseDownLeft + 20 > itemStyle[index].width) {
      direction = 'right';
    } else if (mouseDownTop < 20) {
      direction = 'top';
    } else if (mouseDownTop + 20 > itemStyle[index].height) {
      direction = 'bottom';
    }

    //判断是否在左上角-右上角-右下角-左下角
    if (mouseDownLeft < 20 && mouseDownTop < 20) {
      direction = 'left-top';
    } else if (
      mouseDownLeft < 20 &&
      mouseDownTop + 20 > itemStyle[index].height
    ) {
      direction = 'left-bottom';
    } else if (
      mouseDownLeft + 20 > itemStyle[index].width &&
      mouseDownTop < 20
    ) {
      direction = 'right-top';
    } else if (
      mouseDownLeft + 20 > itemStyle[index].width &&
      mouseDownTop + 20 > itemStyle[index].height
    ) {
      direction = 'right-bottom';
    }

    if (!direction) direction = 'drag';

    document.onmousemove = function (e) {
      const xx = e.clientX;
      const yy = e.clientY;
      const _itemStyle = itemStyle;

      if (direction === 'left') {
        const _width = clickBoxWeight + mouseDownX - xx;
        const _left = xx - boxRef.current.offsetLeft;
        _itemStyle[index].width = _width;
        _itemStyle[index].left = _left;
      }

      if (direction === 'right') {
        const _width = clickBoxWeight + xx - mouseDownX;
        _itemStyle[index].width = _width;
      }

      if (direction === 'top') {
        const _height = clickBoxHeight + mouseDownY - yy;
        const _top = yy - boxRef.current.offsetTop;
        _itemStyle[index].height = _height;
        _itemStyle[index].top = _top;
      }
      if (direction === 'bottom') {
        const _height = clickBoxHeight + yy - mouseDownY;
        _itemStyle[index].height = _height;
      }

      if (direction === 'left-top') {
        const _width = clickBoxWeight + mouseDownX - xx;
        const _left = xx - boxRef.current.offsetLeft;
        _itemStyle[index].width = _width;
        _itemStyle[index].left = _left;
        const _height = clickBoxHeight + mouseDownY - yy;
        const _top = yy - boxRef.current.offsetTop;
        _itemStyle[index].height = _height;
        _itemStyle[index].top = _top;
      }
      if (direction === 'left-bottom') {
        const _width = clickBoxWeight + mouseDownX - xx;
        const _left = xx - boxRef.current.offsetLeft;
        _itemStyle[index].width = _width;
        _itemStyle[index].left = _left;
        const _height = clickBoxHeight + yy - mouseDownY;
        _itemStyle[index].height = _height;
      }
      if (direction === 'right-top') {
        const _width = clickBoxWeight + xx - mouseDownX;
        _itemStyle[index].width = _width;
        const _height = clickBoxHeight + mouseDownY - yy;
        const _top = yy - boxRef.current.offsetTop;
        _itemStyle[index].height = _height;
        _itemStyle[index].top = _top;
      }

      if (direction === 'right-bottom') {
        const _width = clickBoxWeight + xx - mouseDownX;
        _itemStyle[index].width = _width;
        const _height = clickBoxHeight + yy - mouseDownY;
        _itemStyle[index].height = _height;
      }

      if (direction === 'drag') {
        const maxLeft = boxRef.current.offsetWidth - el.offsetWidth;
        const minLeft = 0;
        const minTop = 0;
        const maxTop = boxRef.current.offsetHeight - el.offsetHeight;
        let _left = xx - mouseDownX + clickBoxLeft;
        let _top = yy - mouseDownY + clickBoxTop;
        const maxWidth = boxRef.current.offsetWidth;
        const maxHeight = boxRef.current.offsetHeight;
        let _width = el.offsetWidth;
        let _height = el.offsetHeight;
        if (_left < minLeft) {
          _left = 0;
        }
        if (_left > maxLeft) {
          _left = maxLeft;
        }
        if (_top < minTop) {
          _top = 0;
        }
        if (_top > maxTop) {
          _top = maxTop;
        }

        if (_width > maxWidth) {
          _width = maxWidth;
        }
        if (_height > maxHeight) {
          _height = maxHeight;
        }

        _itemStyle[index].left = _left;
        _itemStyle[index].top = _top;
        _itemStyle[index].width = _width;
        _itemStyle[index].height = _height;
      }
      setStyle([..._itemStyle]);
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      direction = '';
    };
    if (e.preventDefault) {
      e.preventDefault();
    }
  };

  const complete = () => {
    console.log(itemStyle, '=====');
  };

  const setHot = () => {
    itemStyle.push({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
    });
    setStyle([...itemStyle]);
  };

  const getItemStyle = (index: number) => {
    const { width, left, top, height } = itemStyle[index];

    return {
      top: top + 'px',
      width: width + 'px',
      left: left + 'px',
      height: height + 'px',
    };
  };

  return (
    <div>
      <div className="drag-all" ref={boxRef}>
        <img
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1473836766,4030812874&fm=26&gp=0.jpg"
          alt=""
          style={{
            width: '100%',
          }}
        />
        {itemStyle.map((_: any, index: number) => (
          <div
            className={`test-div test-div-${index}`}
            style={getItemStyle(index)}
            onMouseDown={(e) => handleStart(e, index)}
          ></div>
        ))}
      </div>
      <div
        style={{
          width: '100px',
          height: '100px',
          background: 'red',
        }}
        onClick={setHot}
      >
        生成热区
      </div>

      <div onClick={complete}>完成</div>
    </div>
  );
}

export default App;
