import { useContext, useEffect, useState } from "react";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
import { useNavigate, Outlet } from "react-router-dom";
import "./css/Layout.css";

function Layout() {
  let context = useContext(AppContext);
  let navigate = useNavigate();

  const [userid, setUserid] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  let logout = () => {
    context.dispatch({
      type: "LOGOUT",
      value: { userid: "", username: "", isLogon: false }
    });
    setTimeout(() => {
      navigate("/", {});
    }, 1000);
  };

  useEffect(() => {
    const controller = new AbortController();
    context.state = getStateFromLocalStorage("appState");
    let { userid, username } = context.state;
    setUserid(userid);
    setUsername(username);

    return () => {
      console.log("마지막 정리작업을 하고 나간다");
      controller.abort();
    };
  }, [context]);

  return (
    <div className="layout-container">
      <header>
        <h1>Hanaro Album</h1>
        {context.state.isLogon && (
          <div className="user-info-container">
            <p style={{ color: "gray" }}>{userid}</p>
            <p style={{ color: "black" }}>{username}</p>
            <button type="button" onClick={logout}>
              Sign Out
            </button>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p style={{ fontSize: "18px" }}>
          &copy; 2024 Hanaro Album. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Layout;