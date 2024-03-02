import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./mycontext";

const USER_ID_MIN = 1;
const USER_ID_MAX = 10;

function Logon() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [userid, setUserid] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserid(e.target.value);
  };

  const handleSuccessfulLogon = (username: string) => {
    context.dispatch({
      type: "LOGON",
      value: { userid, username, isLogon: true },
    });

    setTimeout(() => {
      navigate("/album/list", {});
    }, 1000);

    setMsg("");
    setLoading(false);
  };

  const handleLogonError = (errorMessage: string) => {
    context.dispatch({
      type: "LOGOUT",
      value: { userid: "", username: "", isLogon: false },
    });

    setMsg(errorMessage);
    setLoading(false);
  };

  const logon = () => {
    if (parseInt(userid) >= USER_ID_MIN && parseInt(userid) <= USER_ID_MAX) {
      setLoading(true);

      let url = `https://jsonplaceholder.typicode.com/users?id=${userid}`;

      axios
        .get(url)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const username = res.data[0].username;
            handleSuccessfulLogon(username);
          } else {
            handleLogonError("Invalid user data received from the server.");
          }
        })
        .catch((error) => {
          handleLogonError("An error occurred while fetching user data.");
          console.error(error);
        });
    } else {
      handleLogonError("User ID는 1~10번만 가능합니다.");
    }
  };

  return (
    <div>
      <h1>Logon</h1>
      <input
        type="text"
        id="userid"
        onChange={onChange}
        value={userid}
        placeholder="User ID..."
      />
      <button type="button" onClick={logon} disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <p className="error-msg">{msg}</p>
    </div>
  );
}

export default Logon;