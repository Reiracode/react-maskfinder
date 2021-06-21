import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext} from '../../Context.js'
import Storelist from './Storelist.jsx';

const Overlay = (props) => {
    const { data, position } = useContext(MaskContext)
    const { itemlist, openid, open, setOpen } = props;
    console.log(props)
    function callback(count){
        console.log(count)
    }
    
    // console.log(props.itemlist)

    // switch (props.itemlist){
    //     case 'list':
    //         console.log('list');
    //         break;
    //     default:
    //         console.log(`Sorry, we are out of ${props.itemlist}.`);
    // }

    //將Select需要的搜索項目先提出來
    function optionsfilter(arr) {
        const result = arr.map(({ properties }) => {
            return {
                county: properties.county,
                town: properties.town
            }
        })
        return result
    }

    return( 
        <Storelist county={optionsfilter(data)} 
        open={open} 
        onClick={() => setOpen(!open)}
        parentCallback={callback}
        />  
    )
}

export default Overlay