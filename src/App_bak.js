import React, { useState, useEffect, createContext } from 'react';
import MaskMap from './components/Map/MaskMap.jsx'
import Loading from  './components/Loading/Loading'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import './App.css';
import { MaskContext } from './Context.js'
export const UserCount = React.createContext()
//promise.all確認二個程式都有回傳成功才進行下一段
//location & maskdata => loading false
//之前用fetch程式時  Mask-APP-Master發生
function App() {
  const [count, setCount] = useState(100)
  const [data, setData] = useState({ hits: [] });
  const [hasError, setErrors] = useState(false);
  const [isLoading,setIsLoading]= useState(true);
  const [location, setLocation] = useState([])
  const [position, setPosition] = useState([])
//useState error 會瘋掉 []=>map 預設格式不正確
  const [maskData, setMaskdata] = useState([]);
//單純return 後續return promiseall setData or  no return 直接setData


  const getMaskdata = () => {
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json())
      .then(json => {
        console.log(json.features)
        setMaskdata(json.features)
        // return (data.features)
      });
  };

  useEffect(() => {   //獲取資料
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json())
      .then(json => {
        console.log(json.features)
        setMaskdata(json.features)
        setIsLoading(false)
        // return (data.features)
      });
    
  }, []);

//return new promise------------
  useEffect(() => {       //獲取使用者位置
    if (!isLoading) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
          // setLocation({
          //   location: [p.coords.latitude, p.coords.longitude],
          //   zoom: 18
          // })
          setLocation(
             [p.coords.latitude, p.coords.longitude])
        })
      }
    }
  }, [isLoading])


//return new promise------------fetchWeather(),
  
  

  return (
    <React.Fragment>
      {isLoading ? <Loading /> : null}
      {/* <div className="main" value={location.latitude}> */}
        <div className="main" value={location}>

        {/* <MaskContext.Provider value={[maskData]}> */}
        <MaskContext.Provider 
          value={{
              data: maskData,
              position: location
              // position: position.location,
              // zoom: position.zoom,
              // setPosition: (obj) => { setPosition(obj) },
            }
          }>

          <MaskMap/>
          <MenuBar/>
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