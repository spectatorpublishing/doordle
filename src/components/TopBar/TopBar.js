import React from 'react';
import styled from 'styled-components/macro';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faQuestion, faX } from '@fortawesome/free-solid-svg-icons';
import CDSShareButton from './CDSShareButton';
import Logo from '../Logo';

const Wrapper = styled.div`
    width: 100vw;
    height: fit-content;
    background-color: ${theme.colors.doordashRed};
    display: flex;
    flex-direction: row;

    @media (max-width: ${theme.sizes.mobile}) {
        height: 3.6rem;
    }
`;

const Logos = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    margin: 0.5rem 1rem 0.5rem 0.5rem;

    a {
        height: fit-content;
        width: fit-content;
        margin-top: auto;
        margin-bottom: auto;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        display: none;
    }
`;

const CompanyLogo = styled.div`
    height: 2rem;
    width: fit-content;
    margin: auto 0.5rem auto 0.5rem;
    img {
        margin: auto 0rem auto 0rem;
        width: auto;
        height: 2rem;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        img {
            width: auto;
            height: 1rem;
        }
    }
`;

const CDSLogo = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto 0.5rem auto 0.5rem;
    img {
        width: auto;
        height: 2.5rem;
    }

    @media (max-width: ${theme.sizes.mobile}) {
        img {
            width: auto;
            height: 1.4rem;
        }
    }
`;

const X = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto 0.3rem auto 0rem;
    color: ${theme.colors.white};

    @media (max-width: ${theme.sizes.mobile}) {
        font-size: 0.8rem;
        margin: auto 0.2rem auto 0rem;
    }
`;

const LogoWrapper = styled.div`
    margin: auto;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -0%);
    width: fit-content;
    
    @media (max-width: ${theme.sizes.mobile}) {
        margin: auto auto auto auto;
        top: 0.5%;
    }

    @media (max-width: 410px) {
        top: 0%;
        left: 0%;
        transform: translate(-0%, -0%);
        margin: 0.5rem 1rem;
    }

    &.gameOver {
        @media (max-width: 415px) {
            top: 0%;
            left: 0%;
            transform: translate(-0%, -0%);
            margin: 0.5rem 1rem;
        }
    }
    
`;

const ShareButton = styled.div`
    margin: auto 1.5rem auto 1rem;
    width: fit-content;
    height: fit-content;

    @media (max-width: ${theme.sizes.mobile}) {
        display: none;
        margin: 0rem;
    }
`;

const MoreInfoIcon = styled.div`
    height: 1.5rem;
    width: 1.5rem;
    margin: auto 0.5rem auto auto;
    line-height: 1rem;
    cursor: pointer;
    border-radius: 30px;
    font-size: 0.8rem;
    border: 1.5px solid white;

    svg {
        margin-top: 0.3rem
    }
    
    @media (max-width: ${theme.sizes.mobile}) {
        margin: auto 1rem auto auto;
    }
`;

const ShowStatsIcon = styled.div`
    height: 1.5rem;
    width: 1.5rem;
    margin: auto 0.5rem auto 0.5rem;
    line-height: 1rem;
    cursor: pointer;
    border-radius: 30px;
    font-size: 0.8rem;
    border: 1.5px solid white;

    svg {
        margin-top: 0.3rem
    }

    @media (max-width: ${theme.sizes.mobile}) {
        margin: auto 1rem auto -0.5rem;
    }
`;


const TopBar = (props) => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const websiteURL = "https://doordash.columbiaspectator.com"
    const companyURL = "https://www.doordash.com/"
    const headline = "DoordleDash"
    
    return (
        <Wrapper>
                <Logos>
                    <a href="https://www.columbiaspectator.com/">
                        <CDSLogo><img src="https://doordle.s3.amazonaws.com/whitecrown.png" alt="Columbia Spectator Crown Logo"/></CDSLogo>
                    </a>
                    <X><FontAwesomeIcon icon={faX}/></X>
                    <a href={companyURL}>
                        <CompanyLogo><img src={companyLogo} alt="Doordash Logo"/></CompanyLogo>
                    </a>
                </Logos>
                <MoreInfoIcon onClick={() => props.setOpenInstructions(true)}><FontAwesomeIcon icon={faQuestion}/></MoreInfoIcon>
                {props.gameOver ? <ShowStatsIcon onClick={() => props.setOpenModal(true)}><FontAwesomeIcon icon={faChartSimple}/></ShowStatsIcon> : null}
                <LogoWrapper className={props.gameOver ? "gameOver" : ""}><Logo fontColor="white" gameOver={props.gameOver}/></LogoWrapper>
                <ShareButton>
                    <CDSShareButton canonical_url={websiteURL} headline={headline}/>
                </ShareButton>
        </Wrapper>
    );
    
};

export default TopBar;