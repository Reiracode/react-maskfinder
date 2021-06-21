import React, { useState, useEffect } from 'react';
import { Openoverlay} from '../../Context.js'
import Overlay from './Overlay.jsx'

const MenuBar = () => {
    // const [open, setOpen] = useState(false)
    //overlay
    const [odpen, setOdpen] = useState(false)
    const openover = { odpen, setOdpen };
    const [overlayid, currentoverlayid] = useState("");
    const [sindex,setSindex] =useState()
    useEffect(() => {
        console.log(odpen)
        if (!odpen) setSindex()
    }, [odpen])

    // function setOpenFun(index){
    //     console.log(index)
    //     setSindex(index)
    //     setOdpen(!odpen)
    //     const selitem = document.querySelectorAll('.list_menu')[index].dataset.id
    //     console.log(selitem)
    //     currentoverlayid(selitem)
    // }
//index寫法 x=>click 

    function setOpenFun(e) {
        // render 3 times
        console.log(e.target.getAttribute("data-index")); 
        //取得點的是index 控制li active
        //setSindex(e.target.getAttribute("data-index"))
        // console.log(e.target.dataset.id);
        //  console.log(e.target.classList)
        const liclass = e.target.classList.value
        console.log(liclass)
         !(liclass.indexOf('active')> - 1)
             ? e.target.classList.add('active')
             : e.target.classList.remove('active')

        
        //overlay open or not
        setOdpen(!odpen)

        //attribute id
        currentoverlayid(e.target.dataset.id)
        // e.target.classList.toggle('active');

        //==>index and id 
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
        <Openoverlay.Provider value={openover} >
            <Overlay itemlist={overlayid}
            //open={open} setOpen={setOpen}
            //  itemlist={overlayid} 
            />

            <ul className="mobile_menu" id="menu_bar" data-id="menu_bar">
                {listItems}
            </ul>
        </Openoverlay.Provider>
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