import React, { useState, useEffect } from 'react';
import { MaskContext } from '../../Context.js'
import Select from "react-select";
import PharmacyList from '../FilterPhamcy/PharmacyList.jsx'
const Storelist = ({ county, open, onClick, setOpen, open_list}) => {
  const maskSize = document.querySelector('#mask_sel');
  const [size, setSize] = useState("");

  function maskSelector(e){
    if (e.target.nodeName == 'BUTTON') {
      const showTitle = document.querySelectorAll(".store_detail");
      var a_item = e.target.dataset['item'];
      showTitle.forEach(item => hideUser(item, a_item));
      //button sibling
      e.target.classList.add('active');
      setSize(e.target.dataset.item)
      for (let sibling of e.target.parentNode.children) {
        if (sibling !== e.target) sibling.classList.remove('active');
      }
    }
  }
  // })

  function hideUser(user, userclass) {
    userclass == 'all'
      ? user.classList.remove('d-none')
      : (user.firstElementChild.dataset[userclass] > 0) ? user.classList.remove('d-none')
        : user.classList.add('d-none');
  }

  console.log(maskSize)

  const [status, setStatus] = useState(open_list)
  // const { data, position } = useContext(MaskContext)
  console.log(open_list)
  console.log(open)
  useEffect(()=>{
    setStatus(open_list)
    console.log(status)
  }, [open_list])

  const [selcity, setSelcity] = useState("");
  const [town, setTown] = useState("");

  function getCountyOptions(arr) {
    //獲取縣市列表(不重複)
    // console.log(arr);
    const set = new Set();
    return arr.filter(({ county }) => (!set.has(county) ? set.add(county) : false))
      .map(item => item.county.replace(/臺/g, '台'))
      .sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hant-TW-u-co-stroke')
      }).map((el) => {
        return { value: el, label: el }
      })
    //map & reduce
    // .reduce((result, county) => {
    //   if (county) {
    //     result.push({
    //       value: county,
    //       label: county
    //     });
    //   }
    //   return result;
    // }, []);
  }

  function getTownOptions(arr, location) {
    //獲取地區列表(不重複)
    const set = new Set();
    // console.log(arr)
    console.log(location)
    return arr.filter(({ county }) => {
      return county.replace(/臺/g, '台') === location;
    }).filter(({ town }) => (!set.has(town) ? set.add(town) : false))
      .map(({ town }) => { return town }).sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hant-TW-u-co-stroke')
      }).map((el) => {
        return { value: el, label: el }
      })
  }

  const countyOptions = getCountyOptions(county);
  // console.log(countyOptions)
  const townOptions = county ? getTownOptions(county, selcity) : []

  function locationChangeHandler(selectedOptions) {
    console.log(selectedOptions.value)
    setSelcity(selectedOptions.value)
    setTown("")
  }

  function townChangeHandler(selectedOptions) {
    console.log(selectedOptions.value)
    setTown(selectedOptions.value)
  }

  // const closeBtn = [...document.querySelectorAll('.close_overlay')];
  function closeOverlay(e) {
    console.log("Overlay")
    let closeid = e.target.parentNode;
    console.log(closeid)
    // setOopen(!oopen)
    console.log(!open)
    // setOpen(false)
    // closeid.classList.remove('active');
  }
  // const Modal1 = ({ open_list }) => (
  //   <div isOpen onRequestClose={onRequestClose} {...otherProps}>
  //     <button onClick={onRequestClose}>close</button>
  //     <div>I am a modal{open_list} </div>
  //   </div>
  // );
  const open_arrow = [...document.querySelectorAll('.open_arrow')];
  open_arrow.forEach(dom => dom.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentNode.classList.toggle('ctrl_size');
  }))
  const template_div = (
    // console.log(open_list)
    !!(open_list=="list")? (
      <div className={`overlay ${!open ? "" : "active"}`}
        data-id="list" id="list" value={open}>
        <button className="open_arrow"><i className="fas fa-angle-up"></i></button>
        <div className="close_overlay" onClick={() => onClick("close")}>
          <i className="fas fa-times"></i></div>

        {/* <h2>{!open ? "false" : "true"}</h2> */}
        <div className="select-box">
          <span>縣市</span>
          <Select className="select" options={countyOptions} onChange={locationChangeHandler} />
          <span>地區</span>
          <Select className="select" options={townOptions} onChange={townChangeHandler} />
          <div className="my-selector-c">
            <div id="mask_sel" onClick={maskSelector}>
              <button className="mask_all active" data-item="all">ALL</button>
              <button className="mask_all" data-item="adult">Adult</button>
              <button className="mask_all" data-item="child">Child</button>
            </div>
          </div>
        </div>
        <PharmacyList county={selcity} town={town}  size={size}/>
      </div>
    )
      : //<div style={{display:"flex"}}
      <div className={`overlay ${!open ? "" : "active"}`}
        data-id={open_list} id={open_list}    value={open}>
        <button className="open_arrow"><i className="fas fa-angle-up"></i></button>
        <div className="close_overlay" onClick={() => onClick("close")}>
          <i className="fas fa-times"></i></div>
        {open_list}
      </div>   
      // <div style={{ display: `${!open ? "none" : "flex"}` }}>
      //    {open_list}
      //  </div> 
  )
  // }
//menubar >overlay 
//close_overlay> click >
  return (
    <div>
      {template_div}
    </div>
    
    // <div className={`overlay ${!open ? "" :"active"}`} 
    // data-id="list" id="list" value={open}>
    //   <button className="open_arrow"><i className="fas fa-angle-up"></i></button>
    //   <div className="close_overlay" onClick={()=>onClick("close")}>
    //   <i className="fas fa-times"></i></div>
    //   <h2>{!open ?"false" :"true"}</h2>

    //   <div className="select-box">
    //     <span>縣市</span>
    //     <Select className="select" options={countyOptions} onChange={locationChangeHandler} />

    //     <span>地區</span>
    //     <Select className="select" options={townOptions} onChange={townChangeHandler} />

    //     <div className="my-selector-c">
    //       <div id="mask_sel">
    //         <button className="mask_all active" data-item="all">ALL</button>
    //         <button className="mask_all" data-item="adult">Adult</button>
    //         <button className="mask_all" data-item="child">Child</button>
    //       </div>
    //     </div>
    //   </div>

    //   <PharmacyList county={selcity} town={town}  />
    // </div>
  );

}
export default Storelist