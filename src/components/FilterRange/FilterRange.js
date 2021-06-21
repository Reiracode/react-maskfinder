import React, { useContext, useMemo } from 'react';
// import './PharmacyList.scss'
import { MaskContext } from '../../Context.js'
import FilterList from  './FilterList.js'

// const result = infoData.filter(item => getDistance([yourPositon[0], yourPositon[1]], [item.geometry.coordinates[1], item.geometry.coordinates[0]]) < 1);
// console.log(result);
// return result;     
const filterRange = ({ item }) => {
    const { position, setPosition } = useContext(MaskContext)
    const { properties, geometry } = item

    //經緯度算距離
    // function getDistance(origin, destination) {
    //     lat1 = origin[0]
    //     lng1 = origin[1]
    //     lat2 = destination[0]
    //     lng2 = destination[1]
    //     return 2 * 6378.137 * Math.asin(Math.sqrt(Math.pow(Math.sin(Math.PI * (lat1 - lat2) / 360), 2) + Math.cos(Math.PI * lat1 / 180) * Math.cos(Math.PI * lat2 / 180) * Math.pow(Math.sin(Math.PI * (lng1 - lng2) / 360), 2)))
    // }
    function goLocation() {
        if (position[0] !== geometry.coordinates[1] && position[1] !== geometry.coordinates[0]) {
            setPosition({
                location: [geometry.coordinates[1], geometry.coordinates[0]],
                zoom: 18,
            })

        } else {
            return
        }
    }

    return (<li>
        <h2 onClick={() => goLocation()}>{properties.name}</h2>
        <h3>{properties.address}</h3>
        <h3>{properties.phone}</h3>
        <div>
            <h3 className={properties.mask_adult === 0 ? "no-mask" : ""}>
                <span>成人口罩</span>
                <span>{properties.mask_adult}</span>
            </h3>
            <h3 className={properties.mask_child === 0 ? "no-mask" : ""}>
                <span>兒童口罩</span>
                <span>{properties.mask_child}</span>
            </h3>
        </div>
    </li>)
}


export default filterRange;