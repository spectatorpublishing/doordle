import React from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareNodes, faX } from '@fortawesome/free-solid-svg-icons';
import Countdown from '../Countdown';
import { useState, useEffect } from 'react';
import Logo from '../Logo';
import { ThemeConsumer } from 'styled-components';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .2)',
  zIndex: 1000
}

const Instructions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    font-size: 0.85rem;
    color: black;
    text-align:left;
    padding:0.4rem 0.6rem;
    @media (max-height: 900px ) {
        font-size:1.1rem;
        padding:0.3rem 1.5rem 0.4rem 1.5rem;
    }
    @media (max-height: 800px) {
        font-size:0.95rem;
        padding:0.3rem 1.5rem 0.3rem 1.5rem;
    }
    @media (max-height: 700px) {
        font-size:0.82rem;
        padding:0.3rem 1.2rem 0.3rem 1.2rem;
    }
    @media (max-height: 600px) {
        font-size:0.75rem;
        padding:0.3rem 1rem 0.3rem 1rem;
    }
    
`
const ExampleText = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    display:block;
    margin:auto;
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    font-size: 0.8rem;
    color: black;
    text-align:left;
    padding:1rem;
    text-align:center;
    padding-bottom:1.5rem;
    @media (min-width: ${theme.sizes.tablet}) {
        font-size: 0.8rem;
        padding:1rem;
    }
    @media (max-height: 900px ) {
        font-size:1.05rem;
        padding-left:2rem;
        padding-right:2rem;
    }
    @media (max-height: 800px) {
        font-size:0.95rem;
        padding-left:1.5rem;
        padding-right:1.5rem;
    }
    @media (max-height: 700px ) {
        font-size:0.82rem;
        padding-left:1.5rem;
        padding-right:1.5rem;
    }
    @media (max-height: 600px) {
        font-size:0.75rem;
        padding-top:1rem;
        padding-bottom:1.2rem;
    }
    
`

const WordTile = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    background-color: ${props=> props.color ? props.color: "white"};
    padding:0.15rem 0.65rem;
    margin: 0.1rem;
    border:none;
    font-weight:600;
    color: ${props=> props.font=="black" ? "black" : "white"};
    font-size:1.2rem;
    @media (max-height: 900px ) {
        font-size:1rem;
        padding:0.55rem 0.75rem;
    }
    @media (max-height: 800px) {
        font-size:1rem;
        padding:0.5rem 0.6rem;
    }
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.9rem;
        padding:0.3rem 0.5rem;
    }
    
 `
const Background = styled.div`
    overflow-y:scroll;
    background-color:#E0F2F6;
    width:100%;
    height:100%;
    @media (min-width: ${theme.sizes.mobile}) {
        display:block;
        margin:auto;
        padding:1.8rem 2rem 1rem 2rem;
        margin-top:1.8rem; 
        width:27rem;
        height:fit-content;
        border-radius: 10px; 
    }
`

const X = styled.div`   
    display:block;
    text-align:right;
    padding-top:1rem;
    padding-right:1rem;
    color: ${theme.colors.white};
    
    &.close {
        color: ${theme.colors.black};
        @media (max-width: ${theme.sizes.mobile}) {
            opacity:0.7;
        }
        cursor:pointer;
        &:hover{
            opacity:0.5;
        }
    }
`;

const Bold = styled.span`
    font-weight:600;
`

const Color = styled.span`
    color: ${theme.colors.doordashRed};
    text-transform: uppercase;
    font-weight:600;
`
const Spacing = styled.div`
    padding:5px;
`
const Hr = styled.hr`
    margin:1rem;
`


const InstructionsPopup = (props) => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const companyURL = "https://www.doordash.com/"


  return(
    <div style={OVERLAY_STYLES}>
        <Background>
            <X className="close" onClick= {()=>props.setOpenInstructions(false)}><FontAwesomeIcon icon={faX}/></X>
            <Logo fontColor={theme.colors.doordashRed}/>
            <Spacing/>
            <Instructions>Guess the <Bold>DOORDLE</Bold> in 6 tries. </Instructions>
            <Instructions>The correct word contains <Bold>5 letters</Bold> and is related to <Bold>food.</Bold></Instructions>
            <Instructions>After each guess is submitted, the color of the tiles change to show how close your guess was.</Instructions>
            <Instructions><Bold>You can play a new Doordle every 12 hours!</Bold></Instructions>
            <Hr/>
            <Instructions><Bold>Examples:</Bold></Instructions>
            <WordTile color={theme.colors.doordashRed}>P</WordTile><WordTile color={theme.colors.white} font={"black"}> I </WordTile><WordTile color={theme.colors.white} font={"black"}>Z</WordTile><WordTile color={theme.colors.white} font={"black"}>Z</WordTile><WordTile color={theme.colors.white} font={"black"}>A</WordTile>
            <ExampleText>The letter P is in the word and in the correct spot.</ExampleText>
            <WordTile color={theme.colors.white} font={"black"}>A</WordTile><WordTile color={theme.colors.white} font={"black"}>N</WordTile><WordTile color={theme.colors.salmon} font={"black"}> I </WordTile><WordTile color={theme.colors.white} font={"black"}>S</WordTile><WordTile color={theme.colors.white} font={"black"}>E</WordTile>
            <ExampleText>The letter I is in the word but in the wrong spot.</ExampleText>
            <WordTile color={theme.colors.white} font={"black"}>C</WordTile><WordTile color={theme.colors.white} font={"black"}>A</WordTile><WordTile color={theme.colors.white} font={"black"}>T</WordTile><WordTile color={theme.colors.mediumGreen} font={"black"}>E</WordTile><WordTile color={theme.colors.white} font={"black"}>R</WordTile>
            <ExampleText>The letter E is not in the word in any spot.</ExampleText>

            <ExampleText><Bold><Color>Solve the doordle and receive a free meal on us!</Color></Bold></ExampleText>
        </Background>
    </div>
  )
}
export default InstructionsPopup;

