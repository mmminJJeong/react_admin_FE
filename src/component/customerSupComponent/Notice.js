import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Form from ".././utilComponenet/formComponent/FormComponent";
import { useCallback, useEffect, useState } from "react";
import BASE_URL from "../../utils/Api";
import axios from "axios";
import styled from "styled-components";

const SubmitBtn = styled.button`
width: 70px;
border-radius: 4px;
border: none;
background: #e6d8b1;
height: 35px;
line-height: 1.5em;
text-align: center;
color: #222;
font-weight: 600;
font-size:18px;
cursor: pointer;
&:hover {
  background-color: #f2bc36;
  color: #fff;
  transition: 0.2s;
}`

const EditBtn = styled.button`
width: 70px;
border-radius: 4px;
border: none;
background: #e6d8b1;
height: 35px;
line-height: 1.5em;
text-align: center;
color: #222;
font-weight: 600;
font-size:18px;
margin-left: 10px;
cursor: pointer;
&:hover {
  background-color: #f2bc36;
  color: #fff;
  transition: 0.2s;
}`

export default function Notice() {
  const [boardData, setBoardData] = useState({
    subject: "",
    memo: "",
    files: [{ filename: "" }],
  });
  const [gridData, setGridData] = useState([]);
  const gridColumn = [
    { key: "indexNo", width: 100, label: "No", align: "center" },
    { key: "subject", width: 150, label: "제목", align: "center" },
    { key: "regidate", width: 150, label: "작성일", align: "center" },
    {
      key: "delete",
      width: 150,
      label: "삭제",
      align: "center",
      formatter: function (args) {
        return (
          <button name={args.item.value.indexNo} onClick={handleDelete}>
            삭제
          </button>
        );
      },
    },
  ];

  const getBoard = useCallback(() => {
    axios.get(BASE_URL + "/systemBoard").then((response) => {
      gridSetData(response.data);
      console.log("response : ", response);
    });
  }, []);

  useEffect(() => {
    getBoard();
  }, []);

  const changeForm = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  const textChange = (e) => {
    setBoardData({ ...boardData, memo: e.target.value });
  };

  const addBoard = () => {
    if (boardData.subject === "" || boardData.memo === "") {
      return false;
    }
    let newFormData = new FormData();
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            subject: boardData.subject,
            memo: boardData.memo,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    newFormData.append("file", boardData.files);

    axios
      .post(BASE_URL + "/systemBoard", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        getBoard();
        console.log(response);
      });
  };

  const updateBoard = () => {
    if (!boardData.indexNo) {
      window.confirm("리스트 선택하세요.");
      return false;
    }

    let newFormData = new FormData();
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            subject: boardData.subject,
            memo: boardData.memo,
            indexNo: boardData.indexNo,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    newFormData.append("file", boardData.files);

    axios
      .put(BASE_URL + "/systemBoard", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        getBoard();
        console.log(response);
      });
  };

  const deleteBoard = (indexNo) => {
    axios
      .delete(BASE_URL + "/systemBoard", { data: { indexNo } })
      .then((response) => {
        getBoard();
        console.log(response);
      });
  };

  const gridSetData = (datas) => {
    const gridArraySet = [];
    datas.map((data) => {
      {
        const value = { value: data };
        gridArraySet.push(value);
      }
    });
    setGridData(gridArraySet);
  };

  const handleFile = (e) => {
    console.log(e.target);
    setBoardData({ ...boardData, files: e.target.files[0] });
  };

  const handleDelete = (e) => {
    if (e.target) {
      deleteBoard(e.target.name);
    } else {
      setBoardData({
        ...boardData,
        indexNo: e.item.value.indexNo,
        subject: e.item.value.subject,
        memo: e.item.value.memo,
        files: e.item.value.files
      });
      console.log(boardData);
    }
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>공지사항</h3>
            </div>
            <div className="btn-wrap">
              <SubmitBtn
                onClick={addBoard}
              >
                등록
              </SubmitBtn>
              <EditBtn
                onClick={updateBoard}
              >
                수정
              </EditBtn>
            </div>
            <div style={{ display: "flex" }}>
              <Grid
                gridColumn={gridColumn}
                gridData={gridData}
                onClick={handleDelete}
              />
              <div style={{ flex: "1" }}>
                <Form
                  items={[
                    {
                      value: {
                        name: "subject",
                        text: "제목",
                        content: boardData.subject,
                      },
                    },
                  ]}
                  changeForm={changeForm}
                />
                <textarea
                  name="memo"
                  onChange={textChange}
                  value={boardData.memo}
                  style={{ width: "100%", height: "500px" }}
                />
                <span>업로드 파일 : </span>
                {boardData.files[0] && <span>{boardData.files[0].filename}</span>}
                <input type="file" onChange={handleFile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
