import React from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

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

const WordTile = styled.span`
    background-color:#B71000;
    padding:0.25rem 0.75rem;
    margin:0.1rem;
    border:none;
    font-weight:600;
    color:white;
    font-size:1.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.9rem;
    }
 `
const Background = styled.div`
    background-color:#E0F2F6;
    padding:1.8rem 2rem 3.5rem 2rem;
    margin:auto;
    margin-top:8rem; 
    width:23rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:14rem;
        padding:1.5rem 2rem 3.5rem 2rem;
    }
`
const Result = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    color: black;
    text-align:center;
    padding:0;
    font-size:0.9rem;
    padding-top:2.5rem;
    padding-bottom:0rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:15rem;
        font-size:0.7rem;
    }
`
const TodaysWord = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    color: black;
    text-align:center;
    padding:0;
    font-size:0.9rem;
    padding-top:0rem;
    padding-bottom:1rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:15rem;
        font-size:0.6rem;
    }
`

const Instructions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    color: black;
    text-align:center;
    padding-top:3rem;
    padding-bottom:1rem;
    font-size:0.9rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:15rem;
        text-align:center;
        font-size:0.65rem;
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
    font-weight:600;
    display:block;
    margin:auto;
    background-color:#74A2A5;
    border-radius:5px;
    border:none;
    color:white;
    padding:0.8rem 1rem;
    margin-top:1.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        margin-top:1.5rem;
        padding:0.8rem 0.7rem;
        font-size:0.7rem;
    }
    &:hover{
        cursor:pointer;
        opacity:0.85;
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
    display:block;
    text-align:right;
    color: ${theme.colors.black};
    @media (max-width: ${theme.sizes.mobile}) {
        margin-bottom:1.5rem;
        opacity:0.7;
    }
    cursor:pointer;
    &:hover{
        opacity:0.5;
    }
`;


const Modal = (props) => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const companyURL = "https://www.doordash.com/"
  return(
    <div style={OVERLAY_STYLES}>
        <Background>
            <X onClick= {()=>props.setOpenModal(false)}><FontAwesomeIcon icon={faX}/></X>
            <Name>DOOR <Tile>D</Tile><Tile>L</Tile><Tile>E</Tile> DASH</Name>
            <Result>{props.guessedWord ?  `YOU GUESSED TODAY'S DOORDLE! ` : `YOU RAN OUT OF GUESSES... ` }
            {props.guessedWord ?  <span>&#127881;</span> :  <span>&#128532;</span> }
            </Result>
            <TodaysWord>{props.guessedWord ?  null :  `TODAY'S DOORDLE:` }</TodaysWord>
            {console.log(props.correctWord.split(""))}
            {props.correctWord.split("").map((letter) => (
                <WordTile>{letter.toUpperCase()}</WordTile>
            ))}
            <Instructions>ENTER YOUR EMAIL, GET A FREE MEAL ON US!</Instructions>
            <Input alt="email"/>
            <Button onClick= {()=>props.setOpenModal(false)}>Submit</Button>
        </Background>
        {/* <Footer>
            <Logos>
                    <a href="https://www.columbiaspectator.com/">
                        <CDSLogo><img src="https://doordle.s3.amazonaws.com/whitecrown.png"/></CDSLogo>
                    </a>
                    <X><FontAwesomeIcon icon={faX}/></X>
                    <a href={companyURL}>
                        <Logo><img src={companyLogo}/></Logo>
                    </a>
                </Logos>
        </Footer> */}
        
    </div>
  )
}
export default Modal;

