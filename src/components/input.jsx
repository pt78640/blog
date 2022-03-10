import { useState, useRef, useEffect } from "react";

import '../App.css';

export const Input = () => {
    const ref = useRef(null)
    const [search, setSearch] = useState("");
    const [input, setInput] = useState({ id: 0, title: "", image: "", blogger: "", time: "" });
    const [data, setData] = useState([]);
    //const [time,setTime]=useState(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    function dataUpdate() {
        if (JSON.parse(localStorage.getItem("blog"))) {
            setData(JSON.parse(localStorage.getItem("blog")));
        }

    }
    useEffect(dataUpdate, []);
    const changeHandler = (el) => {
        //setTime(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() )
        if (el.target.name === "image") {
            const files = ref.current.files;
            const img = new FileReader();
            img.readAsDataURL(files[0]);
            img.onload = (e) => {
                setInput({ ...input, "image": e.target.result });

            }
        } else {
            setInput({ ...input, [el.target.name]: el.target.value });

            // setInput({ ...input, ["time"]: time});

        }

    }
    //var ids=0;
    const deletion = (e) => {
        console.log(e)
        let k = JSON.parse(localStorage.getItem("blog"));
        k = k.filter(el => el.blogger !== e.blogger);
        localStorage.setItem("blog", JSON.stringify(k));
        dataUpdate()
    }
    const submition = () => {
        if (!localStorage.getItem("blog")) {
            localStorage.setItem("blog", JSON.stringify([]));
        }
        let a = JSON.parse(localStorage.getItem("blog"));

        // 

        // 
        a = [...a, input];
        localStorage.setItem("blog", JSON.stringify(a));
        dataUpdate()
    }
    const change = (e) => {
        setSearch(e.target.value)
    }
    const searching = () => {
        setData(data.filter(el => el.title.includes(search)))
    }

    return <div id="upper">
        <div class="main">
            <div class="left">
                <input type="text" id="inp" name="title" onChange={changeHandler} /><br /><br />

                <textarea type="text" name="blogger" onChange={changeHandler} rows="10" cols="35" /><br /><br />
                <input ref={ref} type="file" name="image" onChange={changeHandler} /><br /><br />
                <button onClick={submition} id="btn">Submit</button>
                <div id="search">
                    
                    <input type="text" name="" placeholder="Search" onChange={change} />
                    <button onClick={searching}>Search</button>
                </div>
            </div>
            <div class="vl"></div>

            <div class="right">
                {data.length > 0 ? data.map((el) => { return <div id="details"> <img src={el.image} /> <h4>{el.title}</h4> <p id="para">{el.blogger}</p><button id="btn" onClick={() => { deletion(el) }}>delete</button></div> }) : null}
            </div>
        </div>
    </div>
}
