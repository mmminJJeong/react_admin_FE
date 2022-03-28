import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Form from ".././utilComponenet/formComponent/FormComponent";
import BASE_URL from "../../utils/Api";
import { useEffect, useState } from "react";
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
color: #333;
font-weight: 600;
font-size:18px;
cursor: pointer;
&:hover {
  background-color: #f2bc36;
  color: #fff;
  transition: 0.2s;
}
`

const gridColumn = [
  { key: "cname", width: 150, label: "사업자명", align: "center" },
  { key: "bnumber", width: 150, label: "사업자등록번호", align: "center" },
  { key: "ctype1", width: 100, label: "업종", align: "center" },
  { key: "ctype2", width: 100, label: "업태", align: "center" },
  { key: "dname", width: 100, label: "대표자", align: "center" },
  { key: "dphone", width: 100, label: "대표자폰", align: "center" },
  { key: "damName", width: 100, label: "담당자", align: "center" },
  { key: "damPhone", width: 150, label: "담당자연락처", align: "center" },
  { key: "damCp", width: 100, label: "담당자휴대폰", align: "center" },
  { key: "damEmail", width: 100, label: "담당자이메일", align: "center" },
  { key: "zipcode", width: 100, label: "도로명", align: "center" },
  { key: "addr1", width: 100, label: "주소", align: "center" },
  { key: "addr2", width: 100, label: "상세주소", align: "center" },
  { key: "usedomain", width: 100, label: "도메인", align: "center" },
];

const API_URL = BASE_URL;

export default function Home() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [re, setRe] = useState(0);

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(API_URL + "/company")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [re]);

  const viewData = [];
  for (let i = 0; i < data.length; i++) {
    viewData.push({ value: data[i] });
  }

  const handelCreate = () => {
    const createData = window.confirm("데이터를 생성 하시겠습니까?");

    const newFormData = new FormData();
    newFormData.append(
      "newFormData",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (createData) {
      axios
        .post(API_URL + "/company", newFormData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          if (re === 0) {
            setRe(1);
          } else if (re === 1) {
            setRe(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사관리</h3>
            </div>
            <div className="btn-wrap">
              <SubmitBtn
                onClick={handelCreate}
              >
                전송
              </SubmitBtn>
            </div>
            <div style={{ display: "flex" }}>
              <Grid gridColumn={gridColumn} gridData={viewData} />
              <Form
                items={[
                  { value: { name: "cname", text: "사업자명" } },
                  { value: { name: "bnumber", text: "사업자등록번호" } },
                  { value: { name: "ctype1", text: "업종" } },
                  { value: { name: "ctype2", text: "업태" } },
                  { value: { name: "dname", text: "대표자 명" } },
                  { value: { name: "dphone", text: "대표 전화" } },
                  { value: { name: "dfax", text: "대표 팩스" } },
                  { value: { name: "damName", text: "담당자 명" } },
                  { value: { name: "damPhone", text: "담당자 전화" } },
                  { value: { name: "damCp", text: "담당자 휴대폰" } },
                  { value: { name: "damEmail", text: "담당자 이메일" } },
                  { value: { name: "zipcode", text: "도로 명" } },
                  { value: { name: "addr1", text: "주소" } },
                  { value: { name: "addr2", text: "상세주소" } },
                  { value: { name: "usedomain", text: "도메인" } },
                ]}
                changeForm={changeForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
