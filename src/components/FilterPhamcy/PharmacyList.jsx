import React, { useContext, useMemo , useState ,useEffect} from 'react';
import { MaskContext } from '../../Context.js'
// click openPopup
const PharamcyItem = ({ item, orderid, onItemClick, newsss}) => {
    const {properties} = item
    return (
        <div className="store_detail"  onClick={() =>  onItemClick(orderid) }>
            <h2 className="store_title" data-child={properties.mask_child}
                data-adult={properties.mask_adult}>{properties.name}
                <span><i className="fas fa-map-marker-alt"></i>
                   {/* {getDistance(cor) } */}
                    {newsss >= 1 ? newsss.toFixed(1) + 'km' : (newsss * 1000 >> 0) + 'm'}
                </span>
            </h2>
            <p className="addtolist" ><i className="far fa-check-square"></i></p>
            <p><i className="fas fa-briefcase"></i>{properties.address}</p>
            <p><i className="fas fa-phone fa-flip-horizontal"></i>
                <a href="tel:{properties.phone}">{properties.phone}</a>
            </p>
            {properties.note.length <= 1 ? " " : <p><i className="fas fa-tag"></i>{properties.note}</p>}
            <div className="mask_size">
                <span data-size='adult'>成人{properties.mask_adult}</span>
                <span data-size='child'>兒童{properties.mask_child}</span>
            </div>
            <span>最後更新:{properties.updated}</span>
        </div>
    )
}

const PharmacyList = ({ county, town, size }) => {
    const { data, position, selindex, filterdata } = useContext(MaskContext);
    console.log(county)//drowdwn//city
    console.log(town)//Manga//mask_adult: 3141mask_child: 1290
    console.log(filterdata)
    console.log(data)
    console.log(position)

    const list = useMemo(() =>      
            county && town ? data.filter(({ properties }) => {
                return properties.county.replace(/臺/g, '台') === county
                    && properties.town.replace(/臺/g, '台') === town
                    && size_query(size, properties)}) 
            : data.filter(item => {
                    return getDistance([position[0], position[1]], [item.geometry.coordinates[1], item.geometry.coordinates[0]]) < 1
            }), [county, town])
        //[county, town, data, size])

    //markers根據list變動來更新data 
    useEffect(() => {
        console.log(list)
        console.log(!list.length)
        const nearby = data.filter(item => {
            return getDistance([position[0], position[1]], [item.geometry.coordinates[1], item.geometry.coordinates[0]]) < 1
        })
        console.log(nearby)
        !list.length 
            ? filterdata.setSeldata(nearby)
            : filterdata.setSeldata(list)

    }, [list])
   

    function getDistance(position, destination) {
        let lat1 = position[0]
        let lng1 = position[1]
        let lat2 = destination[0]
        let lng2 = destination[1]
        return 2 * 6378.137 * Math.asin(Math.sqrt(Math.pow(Math.sin(Math.PI * (lat1 - lat2) / 360), 2) + Math.cos(Math.PI * lat1 / 180) * Math.cos(Math.PI * lat2 / 180) * Math.pow(Math.sin(Math.PI * (lng1 - lng2) / 360), 2)))
    }


    function size_query(x, properties) {
        if (x == "child") {
            return properties.mask_child > 0
        } else if (x == "adult") {
            return properties.mask_adult > 0
        } else {
            return (properties.mask_adult >= 0 || properties.mask_child >= 0)
        }
    }

    function handleItemClick(index) {
        selindex.setSelected(index);
    }



    return (
        <div className="datalist" id="storelist">
            {/* {list.map((item,index) => 
                    (<PharamcyItem 
                        key={index} 
                        item={item} 
                        orderid ={index}
                        onItemClick={handleItemClick} 
                    />))
            } */}

            {list.sort(({ geometry: { coordinates: a } }, { geometry: { coordinates: b } }) => {
                return getDistance([position[0], position[1]], [a[1], a[0]]) - getDistance([position[0], position[1]], [b[1], b[0]])
            }).map((item, index) => {
                return (<PharamcyItem
                        key={index}
                        item={item}
                        orderid={index}
                        onItemClick={handleItemClick}
                        newsss={getDistance([position[0], position[1]], [item.geometry.coordinates[1], item.geometry.coordinates[0]])}
                    />)} 
            )}      
        </div>
    );
}

export default PharmacyList;
