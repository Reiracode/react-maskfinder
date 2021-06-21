import React, { useState, useEffect, Component, useContext } from 'react';
import { MaskContext} from '../../Context.js'
import Storelist from './Storelist.jsx';

const Overlay = (props) => {
    const { data, position } = useContext(MaskContext)
    const { itemlist, openid, open, onClick,setOpen } = props;

    // console.log(props.open)
    console.log(props.itemlist)
    function callback(count){
        console.log(count)
    }
    
    
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
        <Storelist 
            open_list={props.itemlist}
            county={optionsfilter(data)} 
            open={open} 
            onClick={onClick} 
            // parentCallback={callback}
        />  
    )
}

export default Overlay