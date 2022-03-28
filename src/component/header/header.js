import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResultContext } from "../../Context";

export default function HEADER() {
  const [menuNav, setMenuNav] = useState(0); // 헤더 style 변경 state
  const { setSideMenu } = useResultContext();

  const setMenu = (navLocation) => {
    setMenuNav(navLocation); // 헤더 style 변경 함수
    setSideMenu(navLocation); // sidebar 변경 state
  };

  return (
    <div id="headerIn">
      <div className="header-top">
        <div className="logos" style={{ lineHeight: "1" }}>
          broanex
        </div>
        <div className="gnbTop">
          <ul className="list1">
            <li>
              <div className="user">
                <a href="/">
                  전체 관리자 <span>님</span> (proad00)
                </a>
              </div>
            </li>
            <li>
              <div className="headerseach1">
                <select
                  id="headerSeach"
                  className="headerSelect"
                  name="headerSeach"
                >
                  <option value={"menu"}>메뉴</option>
                  <option value={"member"}>회원</option>
                </select>
              </div>
              <div className="headerseach2">
                <div id="header-SeachText">
                  <input
                    type="text"
                    className="from1"
                    placeholder="메뉴검색"
                  ></input>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav">
        <ul>
          <Link
            to="/storeManage"
            className={menuNav === 1 ? "navListActive" : "navlist"}
            onClick={() => {
              setMenu(1);
            }}
          >
            <div className="topLinkText">입점사관리</div>
          </Link>

          <Link
            to="/notice"
            className={menuNav === 2 ? "navListActive" : "navlist"}
            onClick={() => {
              setMenu(2);
            }}
          >
            <div className="topLinkText">고객지원</div>
          </Link>

          <Link
            to="/logManage"
            className={menuNav === 3 ? "navListActive" : "navlist"}
            onClick={() => {
              setMenu(3);
            }}
          >
            <div className="topLinkText">로그관리</div>
          </Link>
        </ul>
      </div>
    </div>
  );
}
