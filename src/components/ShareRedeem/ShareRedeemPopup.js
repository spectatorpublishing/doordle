import React, {useState} from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Modal from "../EmailSignup/Modal.js"

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .2)',
  zIndex: 1000
}

const Name = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    color:#B71000;
    font-weight:600;
    font-size:1.2rem;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.8rem;
    }
`

const Tile = styled.span`
    background-color:white;
    padding:0.25rem 0.75rem;
    margin:0.1rem;
    border:black solid 0.1rem;
    color:black;
    font-size:1.2rem;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.8rem;
    }
    
`
const Background = styled.div`
    background-color:#E0F2F6;
    padding:1.8rem 2rem 3rem 2rem;
    margin:auto;
    margin-top:10rem;
    width:23rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:14rem;
        padding:1.8rem 2rem 2.5rem 2rem;
    }
`

const Instructions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    color: black;
    text-align:center;
    padding-top:3rem;
    padding-bottom:1rem;
    font-size:0.9rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:15rem;
        font-size:0.6rem;
        padding-top:2rem;
        padding-bottom:1.2rem;
    }
`
const Input = styled.input`
    display:block;
    margin:auto;
    width: 12rem;
    height: 1.5rem;
    padding:0.2rem;
    border:black solid 1.2px;
    border-radius:5px;
    @media (max-width: ${theme.sizes.mobile}) {
        width: 9rem;
        height: 1rem;
        padding:0.2rem;
    }
    
`

const Button = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    display:block;
    margin:auto;
    background-color:#B71000;
    border-radius:5px;
    border:none;
    color:white;
    padding:0.8rem 1rem;
    margin-top:2.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        margin-top:1.5rem;
        padding:0.5rem 0.7rem;
        font-size:0.6rem;
    }
    &:hover{
        cursor:pointer;
    }
`
const Footer = styled.div`
    background-color:#B71000;
    padding:0.5rem 2rem;
    margin:auto;
    width:23rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:14rem;
        padding:0.5rem 2rem;
    }
    
`

const Logos = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    margin:auto;

    a {
        height: fit-content;
        width: fit-content;
        margin-top: auto;
        margin-bottom: auto;
    }
`;

const Logo = styled.div`
    height: 2rem;
    width: fit-content;
    margin: auto 0.5rem auto 0.5rem;
    img {
        margin: auto 0rem auto 0rem;
        width: auto;
        height: 2rem;
        @media (max-width: ${theme.sizes.mobile}) {
            margin: 0.3rem 0rem auto 0rem;
            height: 1.4rem;
        }
    }
`;

const CDSLogo = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto 0.5rem auto 0.5rem;
    img {
        width: auto;
        height: 2rem;
        @media (max-width: ${theme.sizes.mobile}) {
            height: 1.7rem;
        }
    }
`;

const X = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto 0.3rem auto 0rem;
    color: ${theme.colors.white};
    @media (max-width: ${theme.sizes.mobile}) {
        margin: auto 0.05rem auto 0rem;
    }
`;


const ShareReedemPopup = (props) => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const companyURL = "https://www.doordash.com/"
  return (
    <div style={OVERLAY_STYLES}>

        <Background>
            <Name>DOOR <Tile>D</Tile><Tile>L</Tile><Tile>E</Tile> DASH</Name>
            <Button onClick= {props.setOpenModal(false)}>Submit</Button>
        </Background>
    </div>
  )
}

export default ShareReedemPopup