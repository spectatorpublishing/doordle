import React, { useState } from 'react';
import styled from 'styled-components/macro';
import theme from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import CDSShareButton from './CDSShareButton';

const Wrapper = styled.div`
    width: 100vw;
    height: fit-content;
    background-color: ${theme.colors.doordashRed};
    display: flex;
    flex-direction: row;

    @media (max-width: ${theme.sizes.mobile}) {
        height: 4rem;
    }
`;

const Logos = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    margin: 0.5rem auto 0.5rem 0.5rem;

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

const Logo = styled.div`
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

const CenterText = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    margin: auto 4rem auto 1rem;

    @media (max-width: ${theme.sizes.mobile}) {
        img {
            height: 3rem;
        }
        margin: auto auto;
    }
`;

const ShareButton = styled.div`
    margin: auto 1.5rem auto auto;
    width: fit-content;
    height: fit-content;

    @media (max-width: ${theme.sizes.mobile}) {
        display: none;
        margin: 0rem;
    }
`;

const SBSTopBar = () => {
    const companyLogo = "https://doordle.s3.amazonaws.com/doordash.png"
    const websiteURL = "https://doordash.columbiaspectator.com"
    const companyURL = "https://www.doordash.com/"
    const headline = "DoordleDash"
    const gameLogo = "https://doordle.s3.amazonaws.com/logo.png"
    
    return (
        <Wrapper>
                <Logos>
                    <a href="https://www.columbiaspectator.com/">
                        <CDSLogo><img src="https://doordle.s3.amazonaws.com/whitecrown.png"/></CDSLogo>
                    </a>
                    <X><FontAwesomeIcon icon={faX}/></X>
                    <a href={companyURL}>
                        <Logo><img src={companyLogo}/></Logo>
                    </a>
                </Logos>
                <CenterText><img src={gameLogo}/></CenterText>
                <ShareButton>
                    <CDSShareButton canonical_url={websiteURL} headline={headline}/>
                </ShareButton>
            </Wrapper>
    );
    
};

export default SBSTopBar;