import React from 'react';
import styled from 'styled-components/macro';
import theme from '../theme';

const CenterText = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    margin: 0rem auto 0rem auto;
    
    img {
        height: 3rem;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        img {
            height: 3rem;
        }
        margin: auto auto;
    }
`;

const Name = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
    font-family: 'Rubik', sans-serif;
    color: ${props => props.color};
    font-weight:800;
    font-size:1.4rem;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:1.3rem;
    }
`

const Tile = styled.span`
    background-color:white;
    padding:0.2rem 0.7rem;
    margin:0.1rem;
    border:black solid 0.1rem;
    color:black;
    font-size:1.25rem;
    font-weight: 800;
    @media (max-width: ${theme.sizes.mobile}) {
        font-size:1.2rem;
    }
`


const Logo = ({fontColor}) => {    

    return (
        <div>
            <CenterText><Name color={fontColor}>DOOR <Tile>D</Tile><Tile>L</Tile><Tile>E</Tile> DASH</Name></CenterText>
        </div>
    );
};

export default Logo;