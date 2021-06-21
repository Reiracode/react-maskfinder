import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext, Openoverlay } from '../../Context.js'
import Select from "react-select";
import PharmacyList from '../FilterPhamcy/PharmacyList.jsx'

const Storelist = ({ county, open, setOpen,parentCallback}) => {
  // const { data, position } = useContext(MaskContext)
  const openoverlay = useContext(Openoverlay)
  // console.log()
  const openyn = openoverlay.odpen
  console.log(openyn)

  const [selcity, setSelcity] = useState("");
  const [town, setTown] = useState("");
//overlay open=>props true
//
  // const [count, setCount] = useState(0);
  // const [open, setCosetOpenunt] = useState(false);
  const [copen, setCopen] = useState(false);
  console.log(open)//true
  // console.log(copen)//false
  //console.log(setOpen)

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
//menubar >overlay 
//close_overlay> click >
  return (
    <div className={`overlay ${!!(openyn) ? "active" :""}`} 
    // <div className={`overlay ${!!a ? "active" : ""}`} 
   
    data-id="list" id="list" value={open}>
      <button className="open_arrow"><i className="fas fa-angle-up"></i></button>
      <div className="close_overlay" 
        onClick={() => {
          console.log(open)
          openoverlay.setOdpen(false)
          // setCopen(!open)
          // parentCallback(!open);
        }}
      >
      <i className="fas fa-times"></i></div>
      <h2>{!copen?"true" :"false"}</h2>
      
      {/* <div className="close_overlay" onClick={()=>onOverlayClick()}><i className="fas fa-times"></i></div>  */}
      {/* <div className="close_overlay" onClick={closeOverlay}><i className="fas fa-times"></i></div> */}
      <div className="select-box">
        <span>縣市</span>
        <Select className="select" options={countyOptions} onChange={locationChangeHandler} />

        <span>地區</span>
        <Select className="select" options={townOptions} onChange={townChangeHandler} />

        <div className="my-selector-c">
          <div id="mask_sel">
            <button className="mask_all active" data-item="all">ALL</button>
            <button className="mask_all" data-item="adult">Adult</button>
            <button className="mask_all" data-item="child">Child</button>
          </div>
        </div>
      </div>

      <PharmacyList county={selcity} town={town}  />
    </div>
  );

}
export default Storelist