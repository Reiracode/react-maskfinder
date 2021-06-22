import React, { useState, useEffect ,useRef} from 'react';
import Overlay from './Overlay.jsx'

const MenuBar = () => {
    const [open, setOpen] = useState(false)
    //overlay
    // const [odpen, setOdpen] = useState(false)
    // const openover = { odpen, setOdpen };

    const [overlayid, currentoverlayid] = useState("");
    const [sindex,setSindex] =useState()
    // useEffect(() => {
    //     console.log(odpen)
    //     if (!odpen) setSindex()
    // }, [odpen])

    // function setOpenFun(index){
    //      console.log(index)
    //     // setSindex(index)
    //     setOpen(!open)
    //     // const selitem = document.querySelectorAll('.list_menu')[index].dataset.id
    //     // console.log(selitem)
    //     // currentoverlayid(selitem)
    // }
//index寫法 x=>click 
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    // the App where the hook is used 
    function Counter() {
        const [count, setCount] = useState(0);
        // 👇 look here
        const prevCount = usePrevious(count)
        console.log("Now:" + { count }, "before" + { prevCount })
        // return <h1>Now: {count}, before: {prevCount}</h1>;
    }

    const [count, setCount] = useState(0);

    // Get the previous value (was passed into hook on last render)
    const prevCount = usePrevious(count);


    function setOpenFun(e) {
        //self other close
        console.log(e)
        if (!(e == "close")){
            console.log("--overlayid--" + overlayid + "--etarget--" + e.target.dataset.id)
            const liclass = e.target.classList.value
            if (!!overlayid &&  (overlayid != e.target.dataset.id) ){
                console.log("切換other")//change to other
                for (var item of document.querySelectorAll('.list_menu')) {
                    item.classList.remove('active');
                }
                e.target.classList.add('active')
                setOpen(true)
            }else{//self
                console.log("自己" + liclass + "---" + e.target.classList.value)//change to other
                const idname = e.target.dataset.id
                console.log(idname)

                // const activeli = document.querySelectorAll(`li[data-id=${idname}]`)[0].classList.value
                // console.log(activeli + "true or flase-" + (!!(activeli.indexOf('active') > - 1)))
                // !!(activeli.indexOf('active') > - 1)
                //     ? document.querySelectorAll(`li[data-id=${idname}]`)[0].classList.remove('active')
                //     : document.querySelectorAll(`li[data-id=${idname}]`)[0].classList.add('active')

                const activeli = document.querySelectorAll(`li[data-id=${idname}]`)[0].classList
                !!((activeli.value).indexOf('active') > - 1)
                    ? activeli.remove('active')
                    : activeli.add('active')


                setOpen(!open)
            }   
            currentoverlayid(e.target.dataset.id)
        }else{
            console.log("close")
            for (var item of document.querySelectorAll('.list_menu')) {
                item.classList.remove('active');
            }
            setOpen(!open)
        }
    }

    let litems = [
        { id: "personal", icon: "fa-user", desc: "個人記錄" },
        { id: "mystore", icon: "fa-folder-open", desc: "我的最愛" },
        { id: "list", icon: "fa-calendar-plus", desc: "search" },
        { id: "relocate", icon: "fa-compass", desc: "重新定位" },
    ];

    const listItems = litems.map(function (item, index) {
        return (
            <li key={index}
                className={`list_menu`}
                // className={`list_menu ${sindex == index ? "active" : ""}`}
                onClick={setOpenFun}
                // onClick={() => setOpenFun(index)}
                data-id={item.id}
                data-index={index}
            >
                <i className={`fa ${item.icon}`}></i>
                <span className="dialog">{item.desc}</span>
            </li>
        )
    });

    return(
        <>
        <Overlay itemlist={overlayid}  open={open} onClick={setOpenFun} />
        {/* </Overlay> */}
        <ul className="mobile_menu" id="menu_bar" data-id="menu_bar">
            {listItems}
        </ul>
        </>
    )
}

export default MenuBar

/*
way1:Context:export const Openoverlay = createContext()
分開管理狀態 setState and provider
Menubar--Overlay -- Storelist -- PharmacyList
list                   X close overlay
click
open overlay

Way2: props parentcallback
cross 3 components
grandpa - parent - child
grandpa control open or not
child also  open or not

Question:
關掉overlay  render3次
setOpenFun


開關[open,setOpen]=useState(false)
setOpen
li menu 
function click   setOpen(!open)
li class={list_menu  !open? "":"active"

overlay
function click XX   setOpen(!open)
overlay class={overlay  !open? "":"active"


共享狀態

*/