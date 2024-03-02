import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, getStateFromLocalStorage } from './mycontext';
import axios from 'axios';
import './css/AlbumList.css';

type ItemType = {
    id: number;
    userId: number;
    title: string;
};

function AlbumList() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [selectItem, setSelectItem] = useState<ItemType>({ id: -1, userId: 0, title: "" });
    const [userid, setUserid] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    let context = useContext(AppContext);

    useEffect(() => {
        const controller = new AbortController();
        context.state = getStateFromLocalStorage("appState");

        let { userid, username } = context.state;
        setUserid(userid);
        setUsername(username);

        // Check if there's a selected item in localStorage
        const storedSelectedItem = localStorage.getItem("selectedItem");
        if (storedSelectedItem) {
            setSelectItem(JSON.parse(storedSelectedItem));
        }

        let url = "https://jsonplaceholder.typicode.com/albums?userId=" + userid;
        console.log(url);
        axios.get(url, { signal: controller.signal })
            .then((res) => {
                console.log(res.data[0]);
                setItems(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            console.log("마지막 정리작업을 하고 나간다 ");
            controller.abort();
        };
    }, []);

    const itemClick = (item: ItemType) => {
        setSelectItem({ ...item });
        localStorage.setItem("selectedItem", JSON.stringify(item));
        console.log(item.id, "selected");
    };

    const navigate = useNavigate();
    const buttonClick = () => {
        navigate("/photo/list", { state: selectItem });
    };

    return (
        <div>
            <div className="titlecontainer">
                <h1>앨범 목록</h1>
                <button type='button'
                    disabled={selectItem.id === -1 ? true : false}
                    onClick={buttonClick}>앨범 상세보기</button>
            </div>

            <ul>
                {items.map((item: ItemType, index: number) => {
                    return (
                        <li
                            style={{ "backgroundColor": selectItem.id === item.id ? "lightgray" : "white" }}
                            key={index}
                            onClick={() => { itemClick(item) }}
                        >
                            {`${index + 1}. ${item.title}`}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AlbumList;
