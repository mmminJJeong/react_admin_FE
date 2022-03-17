import { useRoutes } from "react-router-dom";
import Store from "./component/storeComponent/Store";
import StoreManageMenu from "./component/storeComponent/StoreManageMenu";
import Notice from "./component/customerSupComponent/Notice";
import StoreInquiry from "./component/customerSupComponent/StoreInquiry";
import Log from "./component/logComponent/errorLog";

export default function Router() {
  return useRoutes([
    { path: "/storeManage", element: <Store /> },
    { path: "/storeManageMenu", element: <StoreManageMenu /> },
    { path: "/notice", element: <Notice /> },
    { path: "/storeInquiry", element: <StoreInquiry /> },
    { path: "/logManage", element: <Log /> },
  ]);
}
