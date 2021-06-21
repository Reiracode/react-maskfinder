import React, { useState, useEffect, createContext } from 'react';
import MaskMap from './components/Map/MaskMap.jsx'
import Loading from  './components/Loading/Loading'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import { MaskContext, LanguageContext } from "./Context.js";
import "./App.css";

//promise.all確認二個程式都有回傳成功才進行下一段
//location & maskdata => loading false
//之前用fetch程式時  Mask-APP-Master發生
const defaultState = [25.026277, 121.499962];
const App = ()=> {
  //dataProvider
  // curent click index
  const [selected, setSelected] = useState();
  const selvalue = { selected, setSelected };

  const [maskData, setMaskdata] = useState([]);
  //use context
  // const madedata = { maskData, setMaskdata };
  //filter maskdata
  const [selData, setSeldata] = useState([]);
  const filterdata = { selData, setSeldata };
  // const [filterdata, setFilterdata] = useState([]);

  const [hasError, setErrors] = useState(false);
  const [isLoading,setIsLoading]= useState(true);
  const [location, setLocation] = useState([0,0]);
 
//單純return 後續return promiseall setData or  no return 直接setData
  // const fetchMaskData = () => {
  //   return fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
  //     .then((response) => response.json())
  //     .then(data => {
  //       console.log(data.features)
  //       return (data.features)
  //     });
  // };

  

  // const getGeolocation = () => {
  //   setIsLoading(true)
  //   navigator.geolocation.getCurrentPosition(async (pos) => {
  //     console.log([pos.coords.latitude, pos.coords.longitude]);
  //     setLocation([pos.coords.latitude, pos.coords.longitude])
  //     // setIsLoading(t);
  //   });
  //   setIsLoading(false)
  // }


  // const getGeolocation =() =>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (p) => {
  //       // navigator.geolocation.getCurrentPosition((p) => {
  //       setLocation([p.coords.latitude, p.coords.longitude] )
  //       // return ([p.coords.latitude, p.coords.longitude])
  //     })
  //   }
  // }

  // const getGeolocation =() =>{
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => 
  //         {
  //         resolve([position.coords.latitude, position.coords.longitude])
  //         setIsLoading(false)
  //       })
  //     } else {
  //       reject(Error("It broke"));
  //     }
  //   })
  // }

  const getGeolocation =() =>{
    return new Promise(resolve => {
      !!(navigator.geolocation)
        ? navigator.geolocation.getCurrentPosition(position => {
          resolve([position.coords.latitude, position.coords.longitude])
        })
        : alert("Geolocation is not supported by your browser")
    }).then((result)=> {
      console.log(result); // 1
      setLocation(result)
      return result;
    });
  }

  // useEffect(() => {       //獲取使用者位置
  //   if (!isLoading) {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((p) => {
  //         setLocation(
  //           [p.coords.latitude, p.coords.longitude])
  //       })
  //     }
  //   }
  // }, [isLoading])

  const getMaskdata = () => {
    setIsLoading(true)
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    // fetch('./') 
    .then((res) => res.json())
      .then(json => {
        console.log(json.features)
        setMaskdata(json.features)
        setIsLoading(false)
        return (json.features)
        // return (data.features)
      });
  };

 
//return new promise------------fetchWeather(),
  // useEffect(() => {
  //   Promise.all([getGeolocation(), getMaskdata()]);
  // }, []);
  useEffect(() => {
    //location null loading
    // promise 沒有前後順序
    Promise.all([getGeolocation(), getMaskdata()])
      .then(result =>{
        if (!(location.length)) {
          setIsLoading(true)
        }


        console.log(result[0]);
        console.log(result[1]);
        console.log(location);
        // setLocation([position.coords.latitude, position.coords.longitude])
      }).catch((err) => {
        console.log(err.message)
      });

  }, []);


  return (
    <React.Fragment>
      {isLoading ? <Loading /> : null}
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
        <div className="main">
          <MaskContext.Provider
            value={{
              data: maskData,
              position: location,
              selindex: selvalue,
              filterdata
              // setLocation: (obj) => { setLocation(obj) },
            }}
          >
            <MaskMap />
            <MenuBar />
          </MaskContext.Provider>
        </div>
    </React.Fragment>
  );
}

export default App;


/*
1、promise.all([funcA(),funcB())
  funcA 是否限制
   1、一定要有return值，
   2、new promise
   3、或是只是確認有exec fun 就可以呢

   我的目的是確認promise.all()內的func有執行後，才把loading拿掉

2、err:dom
   //li addEventListener or onclick function
   useeffect selector問題

3、err:mount
   

4、useeffect(()=>{}[])

  position => Maskmap 一開始是空的，

 */