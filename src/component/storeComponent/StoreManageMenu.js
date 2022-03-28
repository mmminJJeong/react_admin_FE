import "antd/dist/antd.css";
import { Tree } from "antd";
import Form from ".././utilComponenet/formComponent/FormComponent";
import Modal from "../utilComponenet/modalComponent/Modal";
import { useCallback, useEffect, useState } from "react";
import BASE_URL from "../../utils/Api";
import axios from "axios";
import GridDataModal from ".././utilComponenet/modalComponent/GridDataModal";
import FormDataModal from "../utilComponenet/modalComponent/FormDataModal";

export default function StoreManageMenu() {
  const [modalOpen, setModalOpen] = useState(false); //모달오픈
  const [formModalOpen, setFormModalOpen] = useState(false); //모달오픈
  const [gridModalOpen, setGridModalOpen] = useState(false); //모달오픈
  const [formData, setFormData] = useState({}); // 메뉴 추가 폼 데이터
  const [modalFormData, setModalFormData] = useState({}); // 메뉴 그리드 Post 데이터
  const [treeMenu, setTreeMenu] = useState([]); // Tree 메뉴 데이터
  const [companyNo, setCompanyNo] = useState("1"); // select box 회사 코드 데이터
  const [menuIndexNo, setMenuIndexNo] = useState("");
  const [groupIndexNo, setGroupIndexNo] = useState(""); // modal 안에 grid/form Group IndexNo 지정
  const [menuColumnList, setMenuColumnList] = useState([]); // 메뉴 그리드 Get 데이터
  const [selectCompany, setSelectCompany] = useState([]); // 입점사 Select 데이터


  useEffect(() => {
    axios
      .get(BASE_URL + "/menu", {
        params: { companyIdx: companyNo },
      })
      .then((response) => {
        setTreeMenu(response.data);
      });
  }, [companyNo]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/company")
      .then((response) => {
        setSelectCompany(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addMenu = (e) => {
    let menuFormData = new FormData();
    menuFormData.append(
      "menuFormData",
      new Blob(
        [
          JSON.stringify({
            companyIdx: formData.company_idx,
            name: formData.name,
            codes: formData.codes,
            upmenu: formData.upmenu,
            isregi: formData.isregi,
            isexcel: formData.isexcel,
            listColumnIdx: formData.list_column_idx,
            orders: formData.orders,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    axios
      .post(BASE_URL + "/menu", menuFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => setCompanyNo("2"));
  };

  const menuColumnGet = async () => {
    await axios
      .get(BASE_URL + "/menuFormGroup", { params: { menuIdx: menuIndexNo } })
      .then((response) => {
        console.log(response.data);
        setMenuColumnList(response.data);
      });
  };

  const menuColumnAdd = async () => {
    let newFormData = new FormData();

    console.log(modalFormData);

    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            menuIdx: modalFormData.menu_idx,
            groupName: modalFormData.groupName,
            orders: modalFormData.orders,
            groupShow: modalFormData.groupShow,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    await axios
      .post(BASE_URL + "/menuFormGroup", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        menuColumnGet();
      });
  };

  const menuColumnDel = (e) => {
    const indexNo = e.target.name;
    // axios
    //   .delete(BASE_URL + "/menu/column", { data: { indexNo } })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFormData({ menu_idx: "", groupName: "", orders: "" });
  };

  const gridOpenModal = (e) => {
    setGroupIndexNo(e.target.name);
    setGridModalOpen(true);
  }

  const gridCloseModal = () => {
    setGridModalOpen(false);
  }

  const formOpenModal = (e) => {
    setGroupIndexNo(e.target.name);
    setFormModalOpen(true);
  }

  const formCloseModal = () => {
    setFormModalOpen(false);
  }

  const onSelect = (selectedKeys, info) => {
    if (info.node.isLeaf) {
      setModalFormData({ ...modalFormData, menu_idx: selectedKeys[0] });
      setMenuIndexNo(info.node.indexNo);
    } else {
      setMenuIndexNo(info.node.indexNo);
      setFormData({
        ...formData,
        company_idx: info.node.companyIdx,
        upmenu: info.node.indexNo,
      }); // input Form에 company, upmenu 넘버 세팅
    }
    console.log("selected", selectedKeys, info);
  };

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeModalForm = (e) => {
    setModalFormData({ ...modalFormData, [e.target.name]: e.target.value });
  };

  const changeSelect = (e) => {
    setCompanyNo(e.target.value);
  };

  const addFormGroup = (e) => {
    menuColumnGet();
    openModal();
    console.log(menuIndexNo);
  }

  const addGridData = (e) => {
    gridOpenModal();

  }

  const addFormData = (e) => {
    console.log(menuIndexNo);
  }

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사사용 메뉴 관리</h3>
            </div>
            <div className="btn-wrap">
              <button className="mes-button" onClick={addMenu}>
                전송
              </button>
              <button className="mes-button" onClick={addFormGroup}>
                폼 그룹 데이터
              </button>
            </div>
            <div>
              <select onChange={changeSelect}>
                {selectCompany.map((item) => (
                  <option key={item.indexNo} value={item.indexNo}>
                    {item.cname}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div style={{ width: "10%", border: "1px solid" }}>
                <Tree
                  defaultExpandedKeys={["0-0-0", "0-0-1"]}
                  defaultSelectedKeys={["0-0"]}
                  onSelect={onSelect}
                  treeData={treeMenu}
                />
              </div>
              <div style={{ marginLeft: "100px", width: "100%" }}>
                <Form
                  items={[
                    {
                      value: {
                        name: "company_idx",
                        text: "회사코드",
                        readonly: true,
                      },
                    },
                    {
                      value: {
                        name: "upmenu",
                        text: "대메뉴번호",
                        readonly: true,
                      },
                    },
                    {
                      value: {
                        name: "name",
                        text: "메뉴이름",
                      },
                    },
                    {
                      value: {
                        name: "codes",
                        text: "코드",
                      },
                    },

                    {
                      value: {
                        name: "isregi",
                        text: "isregi",
                      },
                    },
                    {
                      value: {
                        name: "isexcel",
                        text: "isexcel",
                      },
                    },
                    {
                      value: {
                        name: "list_column_idx",
                        text: "list_column_idx",
                      },
                    },
                    {
                      value: {
                        name: "orders",
                        text: "정렬",
                      },
                    },
                  ]}
                  changeForm={changeForm}
                />
              </div>
              <Modal
                open={modalOpen}
                closeModal={closeModal}
                changeModalForm={changeModalForm}
                addModalColumn={menuColumnAdd}
                columnList={menuColumnList}
                columnDel={menuColumnDel}
                handleChildModal={{
                  gridOpen: { gridOpenModal },
                  formOpen: { formOpenModal },
                }}
              />
              <GridDataModal
                open={gridModalOpen}
                closeModal={gridCloseModal}
                groupIndexNo={groupIndexNo}
              />
              <FormDataModal
                open={formModalOpen}
                closeModal={formCloseModal}
                groupIndexNo={groupIndexNo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}