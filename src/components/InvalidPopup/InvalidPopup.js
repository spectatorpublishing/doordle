import React from 'react'
import styled from 'styled-components/macro';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareNodes, faX } from '@fortawesome/free-solid-svg-icons';
import Countdown from '../Countdown';
import { useState, useEffect } from 'react';
import Logo from '../Logo';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  //backgroundColor: 'rgba(0, 0, 0, .2)',
  zIndex: 1000
}


const Background = styled.div`
    background-color: ${theme.colors.black};
    margin:auto;
    padding:.9rem .7rem;
    margin-top:12rem; 
    width:10rem;
    border-radius: 10px;
    transition: all .5s ease-in-out;

    @media (max-width: ${theme.sizes.tablet}) {
        width: 5rem;
        padding:.75rem 1rem .75rem 1rem;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        width: 35vw;
        padding:.75rem 1rem 1.25rem 1rem;
    }
`

const Instructions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    font-size: 0.85rem;
    color: white;
    text-align:center;
    padding:0;
    @media (max-width: ${theme.sizes.mobile}) {
        text-align:center;
        font-size:0.8rem;
        padding-top:0.5rem;
        padding-bottom:0.5rem;
    }
`

const InvalidPopup = () => {

  return(
    <div style={OVERLAY_STYLES}>
        <Background>
            <Instructions>invalid word</Instructions>
        </Background>
    </div>
  )
}

export default InvalidPopup;
