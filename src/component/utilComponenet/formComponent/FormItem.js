import React from "react";

const FormItem = ({ text, name, changeForm, readonly }) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "20%",
          height: "30px",
          background: "#F6F6F6",
          marginBottom: "5px",
          paddingLeft: "5px",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {text}
      </div>
      <div style={{ marginLeft: "5px", width: "20%" }}>
        <input
          name={name}
          style={{ width: "100%", height: "24px" }}
          placeholder={text}
          readOnly={readonly}
          onChange={changeForm}
        />
      </div>
    </div>
  );
};

export default FormItem;
