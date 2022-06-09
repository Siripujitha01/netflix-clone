import React, { useEffect, useState } from 'react';
import netflix from './net.png';
import avatar from './Netflix-avatar.png';
import './nav.css';

const Nav = () => {
    const [show,handleShow]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else handleShow(false);
        });
        // return()=>{
        //     window.removeEventListener("scroll")
        // };
    },[]);
    
    
    return (
        <div className={`Nav ${show && "nav_black"}`}>
           <img 
           className='nav_logo'
           src={netflix}
           alt='Netflix Logo'></img> 
           <img 
           className='nav_avatar'
           src={avatar}
           alt='Netflix Avatar'></img> 
        </div>
    );
};

export default Nav;