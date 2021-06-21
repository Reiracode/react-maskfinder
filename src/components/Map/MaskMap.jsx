import React, { useContext, useMemo, useRef, useEffect, useState, useCallback } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { MaskContext } from "../../Context.js";
// import MarkerClusterGroup from "./MarkerClusterGroup.jsx";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MaskPopup from "./MaskPopup.jsx";
import L from "leaflet";
import iconBlue from "../../assets/icon-1.png";
import iconPink from "../../assets/icon-2.png";


// https://codesandbox.io/s/react-leaflet-markercluster-getting-started-9binx?file=/src/App.js

//Customising the Clustered Markers
// let DefaultIcon = L.icon({
//   iconUrl: icon
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// Customising the Markers
// const myIcon = L.icon({
//   iconUrl: window.location.origin + "/assets/icon-1.png", //assets/icon-1.png",
//   iconSize: [30, 30],
//   iconAnchor: [16, 36],
//   popupAnchor: [1, -34]
// });

const otherIcon = L.icon({
  iconUrl: iconBlue,
  iconSize: [30, 30],
  iconAnchor: [16, 36]
});

const myIcon = L.icon({
  iconUrl: iconPink,
  iconSize: [30, 30],
  iconAnchor: [16, 36]
});

// console.log(myIcon)

const MaskMap = () => {
  const { data, position, selindex, filterdata} = useContext(MaskContext);
  const [mapView, setMapview] = useState([0,0]);
  console.log(filterdata.selData) 


  //default :positon map viewport center
  //when filterdata 有資料 要改成mapview 

//dropdown menu chnage
  useEffect(() => { 
    console.log("dropdown menu chnage")
    console.log(filterdata.selData)
    if (filterdata.selData.length){
      console.log("value")
      //取一筆資料來顯示mapview
      filterdata.selData.slice(0,1).map(({ geometry})=>{
        console.log(geometry.coordinates)
        setMapview([geometry.coordinates[1],geometry.coordinates[0]]);
      });
    }
  }, [filterdata.selData]);


  //pass val to datafilter  
  const MarkerClusterGroups = (props) => {
    // const selectedIndex ="11"
    // const markerRef = (props) => {
    //   console.log(props)
    // }

    const { selectedIndex } = props;
    console.log(props)//{selectedIndex:4}
    return (
      <>
        <MarkerClusterGroup>  
        {/* {data.filter(({ properties }) => properties.county == "宜蘭縣" && properties.town == "三星鄉") */}
          {/*  .map(({geometry, properties},index)=> { */}
          
          {(filterdata.selData)
              .map(({geometry, properties},index)=> {
            return (
            // <Marker key={index} 
            //         position={[geometry.coordinates[1], geometry.coordinates[0]]}
            //         ref={markerRef}
            //         // openPopup={selectedIndex === index} 
            // >
            //   <MaskPopup {...properties} />
            // </Marker>
              // <PointsLayer selectedIndex={selindex.selected} />

              <PointMarker
                key={index}
                position={[geometry.coordinates[1], geometry.coordinates[0]]}
                content={properties.name}
                properties={{ ...properties }}
                // center={{ lat: item.lat, lng: item.lng }}
                openPopup={selectedIndex === index} 
                clickindex={index}
              > 
              <MaskPopup {...properties} />
              </PointMarker>
          );
        })}
          </MarkerClusterGroup>  
      </>
    );
  };



  function getMarker(e){
    console.log(e)
    // console.log(e.target._leaflet_id)
    // event.layer._leaflet_id;
    console.log("getMarker")
  }


  //自定義child marker
  const  PointsLayer=(props)=> {
    //pharmacyList CLICK選擇的第幾個
    const { selectedIndex } = props;
    console.log(props)
    return (
    //  <MarkerClusterGroup>
    //   {
      //data.filter(({ properties }) => properties.county == "臺北市" && properties.town == "萬華區")
      filterdata.selData.map(({ geometry, properties }, index) => {
        return (
          <PointMarker
            key={index}
            position={[geometry.coordinates[1], geometry.coordinates[0]]}
            content={properties.name}
            properties={{ ...properties }}
            // center={{ lat: item.lat, lng: item.lng }}
            openPopup={selectedIndex === index}
            clickindex={index}
          />
        );
      })
    //    }
    // </MarkerClusterGroup>
    );
  }
  
  const PointMarker = (props)=>{
    const markerRef = useRef(null)
    const { position, openPopup, properties, clickindex } = props;
    // console.log(clickindex)//順序的index
    // console.log(openPopup)

    //call back to parent
    function scrollTo(e) {
      console.log(e)
      // var all = document.querySelectorAll('#storelist>.store_detail');
      // console.log(all)
      calTopmargin(e)
      // document.getElementById('storelist').scrollTo(0, 190)
    }

    function calTopmargin(markIndex){
      console.log(markIndex)
    
      var all = document.querySelectorAll('#storelist>.store_detail');
      var marginBtom = getComputedStyle(all[0]).marginBottom;
      var margbtm = marginBtom.substr(0, marginBtom.length - 2);
      var sum = 0;
      for (var i = 0; i < markIndex; i++) {
        sum += parseInt(all[i].scrollHeight) + parseInt(margbtm);
      };
      // document.getElementById('storelist').scrollTo(0, sum)
      document.getElementById('storelist').scrollTo({
        top: sum,
        behavior: 'smooth'  
      });

    }

    useEffect(()=>{
      // if (openPopup) markerRef.current.leafletElement.openPopup();
      if (openPopup) {
        markerRef.current.leafletElement.openPopup();
      }
    }, [openPopup])

    return (
      <Marker
        icon={otherIcon} ref={markerRef} position={position}
        // test={clickindex}
        // onClick={getMarker(clickindex)}
        onClick={()=>scrollTo(clickindex)}
        >
        {/* <Popup>{content}</Popup> */}
        <MaskPopup {...properties} />
      </Marker>
    );

  }

  //default ref openPopup我的位置訊息
  const MyMarker = props => {
    console.log(props)
    const deaMarker = useRef(null) 
    const [openMymark, setOpenMymark] = useState(true)
    const depenOn = !(filterdata.selData.length)
    console.log(depenOn)
    // const depenOn = useCallback(() => {
    //   return !(filterdata.selData.length)
    // },[props])

    // console.log(depenOn)
    // console.log(filterdata.selData.length)
    //看起來好像是對的 !filterdata.selData.length) 
    //但判斷點在選的資料，每次變更條件就會RE_RENDER
    useEffect(()=>{
      console.log(openMymark)
      console.log(!(filterdata.selData))
      // if (!filterdata.selData.length) {
      if (depenOn) {
        deaMarker.current.leafletElement.openPopup();
      }
    }, [depenOn])


    return(
      <Marker ref={deaMarker} {...props} openPopup={openMymark}>
        <Popup> You're Here <br /> Reira </Popup> 
      </Marker> 
    ) 
  };

  return (
    <Map  
      center={mapView} zoom={13}
      viewport={{
          center: !(filterdata.selData.length) ? position : mapView
      ,zoom: 15}}
    >
      {/* <Map center={{ position }.position} */}
      {/* //   zoom={6} maxZoom={18} duration={3}
    //   viewport={{
    //     center: position.position,
    //     zoom: 15
    //   }}  */}
      {/* // >   */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MyMarker icon={myIcon} position={position}/>

      <MarkerClusterGroups selectedIndex={selindex.selected} />

{/*自行設定的 child Marker click=> scroll to div*/} 
      {/* <PointsLayer selectedIndex={selindex.selected} /> */}


      {/* <PointsLayer selectedIndex={1}  /> */}
    </Map>
  );
};

export default MaskMap;
