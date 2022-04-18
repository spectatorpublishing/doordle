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
    padding:0.6rem;
    @media (max-width: ${theme.sizes.mobile}) {
        text-align:center;
        font-size:0.8rem;
        padding-top:0.5rem;
        padding-bottom:0.5rem;
    }
`
const ExampleText = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:500;
    font-size: 0.85rem;
    color: black;
    text-align:left;
    padding:1rem;
    text-align:center;
    padding-bottom:1.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:15rem;
        text-align:center;
        font-size:0.8rem;
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
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.9rem;
        padding:0.3rem 0.5rem;
    }
 `
const Background = styled.div`
    background-color:#E0F2F6;
    margin:auto;
    padding:1.8rem 2rem 1rem 2rem;
    margin-top:1.8rem; 
    width:27rem;
    border-radius: 10px;
    @media (max-width: ${theme.sizes.mobile}) {
        width: 70vw;
        padding:1.5rem 2rem 1.5rem 2rem;
        height: fit-content;

        hr {
            margin: 0.2rem;
        }
    }
`

const X = styled.div`   
    display:block;
    text-align:right;
    margin: auto 0rem;
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

const Center = styled.span`
    display:block;
    text-align: center;
    color: ${theme.colors.doordashRed};
    text-transform: uppercase;
`



const InstructionsPopup = (props) => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const companyURL = "https://www.doordash.com/"


  return(
    <div style={OVERLAY_STYLES}>
        <Background>
            <X className="close" onClick= {()=>props.setOpenInstructions(false)}><FontAwesomeIcon icon={faX}/></X>
            <Logo fontColor={theme.colors.doordashRed}/>
            <Instructions>Guess the <Bold>DOORDLE</Bold> in 6 tries.</Instructions>
            <Instructions>Each guess must be a valid <Bold>5-letter word</Bold> related to <Bold>food</Bold>. Hit the enter button to submit.</Instructions>
            <Instructions>After each guess, the color of the tiles will change to show how close your guess was to the word.</Instructions>
            <Instructions><Bold>You can play a new Doordle every 12 hours!</Bold></Instructions>
            <hr/>
            <Instructions><Bold>Examples</Bold></Instructions>
            <WordTile color={theme.colors.doordashRed}>P</WordTile><WordTile color={theme.colors.white} font={"black"}> I </WordTile><WordTile color={theme.colors.white} font={"black"}>Z</WordTile><WordTile color={theme.colors.white} font={"black"}>Z</WordTile><WordTile color={theme.colors.white} font={"black"}>A</WordTile>
            <ExampleText>The letter P is in the word and in the correct spot.</ExampleText>
            <WordTile color={theme.colors.white} font={"black"}>A</WordTile><WordTile color={theme.colors.white} font={"black"}>N</WordTile><WordTile color={theme.colors.salmon} font={"black"}> I </WordTile><WordTile color={theme.colors.white} font={"black"}>S</WordTile><WordTile color={theme.colors.white} font={"black"}>E</WordTile>
            <ExampleText>The letter I is in the word but in the wrong spot.</ExampleText>
            <WordTile color={theme.colors.white} font={"black"}>C</WordTile><WordTile color={theme.colors.white} font={"black"}>A</WordTile><WordTile color={theme.colors.white} font={"black"}>T</WordTile><WordTile color={theme.colors.mediumGreen} font={"black"}>E</WordTile><WordTile color={theme.colors.white} font={"black"}>R</WordTile>
            <ExampleText>The letter E is not in the word in any spot.</ExampleText>
            <hr/>
            <Instructions><Bold><Center>Solve the doordle and receive a free meal on us!</Center></Bold></Instructions>
        </Background>
    </div>
  )
}
export default InstructionsPopup;

