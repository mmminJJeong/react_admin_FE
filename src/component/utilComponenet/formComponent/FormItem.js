import React from "react";
import styled from "styled-components";

const InputTitle = styled.div`
width:180px;
height: 31px;
background-color: #f6f6f6;
margin-bottom: 10px;
padding-left:5px;
font-size: 18px;
display:flex;
align-items:center;
`


const FormItem = ({ text, name, changeForm, content, readOnly }) => {
  return (
    <div style={{ display: "flex" }}>
      <InputTitle>
        {text}
      </InputTitle>
      <div style={{ marginLeft: "5px", width: "100%" }}>
        <input
          name={name}
          style={{ width: "100%", height: "90%" }}
          onChange={changeForm}
          placeholder={text}
          value={content}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};
export default FormItem;
