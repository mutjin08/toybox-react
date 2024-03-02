import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
import axios from "axios";
import { PhotoType } from "./type/commonType";
import ImageList from "./ImageList";

function PhotoList() {
    let location = useLocation();
    let { id, title } = location.state; // 선택한 사진 목록 id, title
    let [photoItems, setPhotoItems] = useState<PhotoType[]>([]);
    const [userid, setUserid] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    let context = useContext(AppContext);
    useEffect(() => {
        const controller = new AbortController();
        context.state = getStateFromLocalStorage("appState");
        let { userid, username } = context.state;
        setUserid(userid);
        setUsername(username);

        let url = "https://jsonplaceholder.typicode.com/photos?albumId=" + id;
        console.log(url);
        axios.get(url, { signal: controller.signal })
            .then((res) => {
                console.log(res.data[0]);
                setPhotoItems(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            console.log("마지막 정리작업을 하고 나간다");
            controller.abort();
        }
    }, []);

    const buttonClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="titlecontainer">
                <h1 style={{ color: 'black', width:'70%' }}>{title}</h1>
                <p style={{ color: 'gray' }}>{id}</p>
                <button type='button' onClick={buttonClick}>뒤로</button>
            </div>
            <ImageList images={photoItems} />
        </div>
    );
}

export default PhotoList;
