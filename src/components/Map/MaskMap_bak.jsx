import React, { useContext, useMemo, useRef,useEffect } from "react";
import { Map, TileLayer, Marker,Popup } from "react-leaflet";
// import MarkerClusterGroup from "./MarkerClusterGroup.jsx";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MaskPopup from "./MaskPopup.jsx";
import { MaskContext } from "../../Context.js";
import L from "leaflet";
// import "./MarkerCluster.css";
const createClusterCustomIcon = {
  chunkedLoading: false,
  // removeOutsideVisibleBounds: true,
  iconCreateFunction: function (cluster) {
    const count = cluster.getChildCount();
    var group = " marker-cluster-";
    if (count < 5) {
      group += "small";
    } else if (count < 30) {
      group += "medium";
    } else {
      group += "large";
    }
    return new L.DivIcon({
      // html: "<div><span>" + count + "</span></div>",
      html: "<div></div>",
      className: "marker-cluster" + group,
      iconSize: new L.Point(40, 40)
    });

    // let clusterSize = {
    //   name: "small",
    //   size: 30
    // };
    // if (count > 10) {
    //   clusterSize.name = "medium";
    //   clusterSize.size = 60;
    // }
    // if (count > 50) {
    //   clusterSize.name = "large";
    //   clusterSize.size = 90;
    // }
    // return new L.DivIcon({
    //   html: count,
    //   className: "marker-cluster marker-cluster-" + clusterSize.name,
    //   iconSize: null
    // });
  }
};

const MaskMap = () => {
  const { data, position } = useContext(MaskContext);
  console.log({position}.position);
  const selectedIndex = 70; //要第一個marker openpopup
  const markerRefs = [];
  const markerClusterGroup = useMemo(() => {

    // const Marker = props => {
    //   console.log(props)//
    //   // const initMarker = ref => {
    //   //   if (ref) {
    //   //     ref.leafletElement.openPopup();
    //   //   }
    //   // };
    //   return <Marker {...props} />;
    // };


    const markerRef = (props) => {
      console.log(props)
      console.log(props.leafletElement._leaflet_id)

      // markerRef.current.leafletElement.openPopup();
      if (props.leafletElement._leaflet_id == selectedIndex){
        props.leafletElement.openPopup()
      }

      // const initMarker = ref => {
      //   if (ref) {
      //     ref.leafletElement.openPopup();
      //   }
      // };
      // return <Marker ref={initMarker} {...props} />;
    }

    // useEffect(() => {
    //   console.log(markerRef)
    //   if (openPopup) markerRef.current.leafletElement.openPopup();
    // }, [openPopup]);
   
    return (
      // <MarkerClusterGroup setMarkerClusterObject={createClusterCustomIcon}>
      // <MarkerClusterGroup>  
      <>
        {data.filter(({ properties }) => properties.county == "臺北市" && properties.town == "萬華區")
              .map(({geometry, properties},index)=> {
          return (
            <Marker 
              key={index} 
              position={[geometry.coordinates[1], geometry.coordinates[0]]}
              ref={markerRef}
              // ref={ref => markerRefs[index] = ref}
                    // openPopup={selectedIndex === index} 
            >
              <MaskPopup {...properties} />
            </Marker>
          );
        })}
      </>
      // </MarkerClusterGroup>
    );
}, [data]);



  //default ref openPopup我的位置訊息
  const MyMarker = props => {
    console.log(props)//
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup();
      }
    };
    return <Marker ref={initMarker} {...props} />;
  };

  return (
    <Map id="maskmap" center={{ position }.position}
      zoom={6} maxZoom={18} duration={3}
      viewport={{
        center: position.position,
        zoom: 13
      }} 
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

      <MyMarker position={{ position }.position}>
        <Popup >
          You're Here <br /> Reira
        </Popup>
      </MyMarker>

      {markerClusterGroup}
    </Map>
  );
};

export default MaskMap;
