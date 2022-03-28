import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MouseEventSubscribe from "../../../utils/mouseEventSubscribe";
import Segment from "../../../utils/Segment";
import Wrapper from "../../../utils/Wrapper";
import { DataGrid } from "axui-datagrid";
import "axui-datagrid/style.css";

const MyBox = styled.div`
  position: relative;
  background: #eee;
  .resizer {
    position: absolute;
    right: -12px;
    bottom: -12px;
    width: 15px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    transform: rotate(45deg);
    cursor: se-resize;
    user-select: none;
  }
`;

const ResizingGridTemplate = ({ gridData, gridColumn, onClick }) => {
  const [boxWidth, setBoxWidth] = useState("1000");
  const [boxHeight, setBoxHeight] = useState("600");
  const [gridItem, setGridItem] = useState({
    gridColumn: [],
    gridData: [],
  });

  useEffect(() => {
    if (gridColumn && gridData) {
      setGridItem({ ...gridItem, gridColumn: gridColumn, gridData: gridData });
    }
  }, [gridData]);

  const containerRef = useRef();

  const handleColResizerMove = (e) => {
    const { left: containerLeft, top: containerTop } =
      containerRef.current.getBoundingClientRect();
    MouseEventSubscribe(
      (mpos) => {
        setBoxWidth(mpos.clientX - containerLeft);
        setBoxHeight(mpos.clientY - containerTop);
      },
      () => {
        // resize 종료 (마우스 업 이벤트 발생.)
      }
    );
  };

  return (
    <div>
      <Wrapper>
        <Segment padded>
          <MyBox
            style={{
              width: boxWidth + "px",
              height: boxHeight + "px",
              border: "1px solid #ccc",
            }}
            ref={containerRef}
          >
            <DataGrid
              width={boxWidth - 2}
              height={boxHeight - 2}
              style={{ fontSize: "13px" }}
              columns={gridItem.gridColumn}
              data={gridItem.gridData}
              dataLength={gridItem.gridData.length}
              options={{}}
              onClick={onClick}
            />
            <div className="resizer" onMouseDownCapture={handleColResizerMove}>
              ⇆
            </div>
          </MyBox>
        </Segment>
      </Wrapper>
    </div>
  );
};

export default ResizingGridTemplate;
