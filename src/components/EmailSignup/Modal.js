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
  backgroundColor: 'rgba(0, 0, 0, .2)',
  zIndex: 1000
}

const WordTile = styled.span`
    background-color:#B71000;
    padding:0.25rem 0.75rem;
    margin: 0.1rem;
    border:none;
    font-weight:600;
    color:white;
    font-size:1.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.9rem;
        padding:0.3rem 0.5rem;
    }
`
const Background = styled.div`
    background-color:#E0F2F6;
    margin:auto;
    padding:1.8rem 2rem 3.5rem 2rem;
    margin-top:3rem; 
    width:27rem;
    border-radius: 10px;

    @media (max-width: ${theme.sizes.tablet}) {
        width: 16rem;
        padding:1.5rem 2rem 1.5rem 2rem;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        width: 75vw;
        padding:1.5rem 2rem 2.5rem 2rem;
    }
`

const Result = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    font-size: 1rem;
    color: black;
    text-align:center;
    padding:0;
    padding-top:2.5rem;
    padding-bottom:0rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:fit-content;
        margin: 0rem auto;
        font-size:0.7rem;
        padding-top:1.5rem;
    }
`
const TodaysWord = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    font-size: 1rem;
    color: black;
    text-align:center;
    padding:0;
    padding-top:0rem;
    padding-bottom:1rem;

    @media (max-width: ${theme.sizes.mobile}) {
        width:fit-content;
        margin: 0.5rem auto;
        font-size:0.7rem;
    }
`

const Instructions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    font-size: 1rem;
    color: ${theme.colors.doordashRed};
    text-align:center;
    padding-top:3rem;
    padding-bottom:1rem;
    @media (max-width: ${theme.sizes.mobile}) {
        width:fit-content;
        margin: 0.5rem auto;
        font-size:0.7rem;
        padding-top:1rem;
        padding-bottom:1rem;
    }
`

const Input = styled.input`
    display:block;
    margin:auto auto 1.5rem auto;
    width: 12rem;
    height: 1.5rem;
    padding:0.2rem;
    border:black solid 1.2px;
    border-radius:5px;
    @media (max-width: ${theme.sizes.mobile}) {
        width: 70%;
        height: 1rem;
        padding:0.2rem;
    }
    
`

const Button = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    font-size: 1rem;
    display:block;
    margin:auto;
    background-color:#74A2A5;
    border-radius:5px;
    border:none;
    color:white;
    padding:0.8rem 1rem;
    //margin-top:1.5rem;
    @media (max-width: ${theme.sizes.mobile}) {
        margin-top:1.5rem;
        padding:0.6rem 0.7rem;
        font-size:0.8rem;
    }
    &:hover{
        cursor:pointer;
        opacity:0.85;
    }

    svg {
        margin: auto 0rem auto 0.5rem;
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
            margin-bottom:1.5rem;
            opacity:0.7;
        }
        cursor:pointer;
        &:hover{
            opacity:0.5;
        }

    }
`;

const TodaysWordTiles = styled.div`
    margin-bottom: 3rem;
    @media (max-width: ${theme.sizes.mobile}) {
        margin-bottom: 0rem;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: ${theme.sizes.mobile}) {
        flex-direction: column;
    }
`;

const Time = styled.div`
`;

const TimerWrap = styled.div`
    padding: 0rem 2rem;
    margin:auto 1rem;    
`;

const TimerText = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    font-weight:600;
    font-size: 1rem;
    color: black;
    text-align:center;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:0.7rem;
        margin: 0rem auto;
        width: fit-content;
    }
`;

const VerticalLine = styled.div`
    border-right: 2px solid black;
`;

const HorizontalLine = styled.div`
    border-bottom: 2px solid black;
    margin: 1rem;
`;

const CopiedText = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
font-family: 'Rubik', sans-serif;
font-weight:600;
font-size: 1rem;
color: ${theme.colors.doordashRed};
text-align:center;
margin-top: 1rem;
@media (max-width: ${theme.sizes.mobile}) {
    margin: 1rem auto 0rem auto;
    width: fit-content;
    font-size: 0.7rem;
}

`;

const Mobile = styled.div`
    display: none;
    @media (max-width: ${theme.sizes.mobile}) {
        display: block;
    }
`;

const Desktop = styled.div`
@media (max-width: ${theme.sizes.mobile}) {
    display: none;
}

`



const Modal = (props) => {
    const [showCopied, setShowCopied] = useState(false)
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const gameLogo = "https://doordle.s3.amazonaws.com/logo.png"
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const companyURL = "https://www.doordash.com/"

    const copyToClipboard = () => {
        var guesses = props.guessedWord ? props.emojiBoard.split("\n").length - 1 : "X"
        var emoji = props.guessedWord ? "😎" : "😭"
        navigator.clipboard.writeText("Doordle (" + guesses.toString() + "/6) " + emoji + "\n" + props.emojiBoard)
        .then(() => {
            console.log("Copied the text: \n" + props.emojiBoard);
            setShowCopied(true)
        })
        .catch(() => {
            console.log("")
        });
    }

    const handleSubmit = (email) => {
        // validate columbia email
        if (isValidEmail(email)){
            email = email.split("@")
            console.log(email[1])
            if (email[1] === "columbia.edu" || email[1] === "barnard.edu"){
                // all good allow submit

                props.setOpenModal(false)
                setErrorMsg("")
                return;
            } 

            setErrorMsg("Please enter a valid Columbia or Barnard email address.")
        }
    }

    const isValidEmail = (email) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)){
            console.log("Valid email address!");
            setErrorMsg("")
            return true;
        } else {
            setErrorMsg("Please enter a valid Columbia or Barnard email address.")
            return false;
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowCopied(false);
        }, 500);
      });

  return(
    <div style={OVERLAY_STYLES}>
        <Background>
            <X className="close" onClick= {()=>props.setOpenModal(false)}><FontAwesomeIcon icon={faX}/></X>
            <Logo fontColor={theme.colors.doordashRed}/>
            <Result>{props.guessedWord ?  `YOU GUESSED TODAY'S DOORDLE! ` : `YOU RAN OUT OF GUESSES... ` }
            {props.guessedWord ?  <span>&#127881;</span> :  <span>&#128532;</span> }
            </Result>
            <br/>
            <br/>
            {props.guessedWord ?  <TodaysWordTiles>
                {
                    props.correctWord.split("").map((letter) => 
                    (
                        <WordTile>{letter.toUpperCase()}</WordTile>))}
                    </TodaysWordTiles>
            : null}
                <Desktop>
                <Row>
                    <TimerWrap>
                        <TimerText>NEXT DOORDLE</TimerText>
                        <Time><Countdown/></Time>
                    </TimerWrap>
                    <VerticalLine/>
                    <Button onClick= {() => copyToClipboard()}>Share<FontAwesomeIcon icon={faShareNodes}/></Button>
                </Row>
                {showCopied ? <CopiedText>Copied to clipboard</CopiedText> : null}
                </Desktop>
                <Mobile>
                    <Button className='mobile' onClick= {() => copyToClipboard()}>Share<FontAwesomeIcon icon={faShareNodes}/></Button>
                    {showCopied ? <CopiedText>Copied to clipboard</CopiedText> : null}
                    <HorizontalLine/>
                    <TimerWrap className="mobile">
                        <TimerText>NEXT DOORDLE</TimerText>
                        <Time><Countdown/></Time>
                    </TimerWrap>
                </Mobile>
            {props.guessedWord && <Instructions>ENTER YOUR EMAIL, GET A FREE MEAL ON US!</Instructions>}
            {props.guessedWord &&  <Input name='email' alt="email" type="email" value={email} onChange={e => setEmail(e.target.value)} onSubmit={() => handleSubmit(email)}/>}
            {props.guessedWord &&  <Button onClick= {() => handleSubmit(email)}>Submit</Button> }
            {errorMsg === "" ? null : <Instructions>{errorMsg}</Instructions>}
        </Background>
    </div>
  )
}
export default Modal;

