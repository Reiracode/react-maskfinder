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
const defaultState = [23.001984, 121.60532479999999]

const App = ()=> {
  const [hasError, setErrors] = useState(false);
  const [isLoading,setIsLoading]= useState(true);
  const [location, setLocation] = useState(defaultState)
  const [maskData, setMaskdata] = useState([]);
//單純return 後續return promiseall setData or  no return 直接setData
  // const fetchMaskData = () => {
  //   return fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
  //     .then((response) => response.json())
  //     .then(data => {
  //       console.log(data.features)
  //       return (data.features)
  //     });
  // };

  // const myFunction = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
  //       .then(res => res.json())
  //       .then(json => {
  //         //resolve(json.features),
  //         resolve(setMaskData(json.features))
  //       }).catch(err => reject(err))
  //   })
  // };

  const getMaskdata = () => {
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json())
      .then(json => {
        console.log(json.features)
        setMaskdata(json.features)
        // return (data.features)
      });
  };

  // const getGeolocation = () => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //   setLocation({
  //     latitude: pos.coords.latitude,
  //     longitude: pos.coords.longitude,
  //     init: true,
  //     zoom: 16,
  //   });
   
  //   });
  // }

//return new promise------------
  const getGeolocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          resolve([pos.coords.latitude, pos.coords.longitude])
          setLocation([pos.coords.latitude, pos.coords.longitude])
        })
      } else {
        reject(Error("It broke"));
      }
    })
  }
  // const getGeolocation = () =>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((p) => {
  //       setLocation([p.coords.latitude, p.coords.longitude])
  //     })
  //   }
  // }


//return new promise------------fetchWeather(),
  useEffect(() => {
    // if (!isLoading) {
    Promise.all([getMaskdata(), getGeolocation()]).then(res => {
      //只是確認都執行完 loading=> setIsLoading(false);
        // console.log(res[0])
        // setLocation(res[1])
        setIsLoading(false);
      }).catch((err) => {
        console.log(err.message)
      });
    // }

  }, [isLoading]);

  return (
    <React.Fragment>
      {isLoading ? <Loading /> : null}
      <div className="main" value={location.latitude}>

      {/* <MaskContext.Provider value={[maskData]}> */}
      <MaskContext.Provider 
        value={{
            data: maskData,
            position: location,
            // position: position.location,
            // zoom: position.zoom,
            setLocation: (obj) => { setLocation(obj) },
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