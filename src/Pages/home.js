import React from 'react';
import {Container} from "bloomer";
import styled from '@emotion/styled-base'
import { Panel } from 'bloomer/lib/components/Panel/Panel';
import { PanelBlock } from 'bloomer/lib/components/Panel/PanelBlock';
import { PanelHeading } from 'bloomer/lib/components/Panel/PanelHeading';

const HeaderContainer = styled(Container)`
    background-color: #CFB87C;
    color: #565A5C;
    
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    
    margin-right: 10%;
    margin-left: 10%;
    margin-bottom: 0%;

    text-align: Left;
    font-size: 35px;
`;


const BodyContainer = styled(Container)`
    background-color: #D3D3D3;    

    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;

    margin-right: 10%;
    margin-left: 10%;
    
`;

export const Home = () => {
    return (    
    
    <>
    <Container>
        <HeaderContainer><strong>Welcome, Jacob Carlson</strong></HeaderContainer>
        <BodyContainer>

            <Panel>
                <PanelHeading>Classes</PanelHeading>
                <PanelBlock>MATH 2400</PanelBlock>
                <PanelBlock>CSCI 3278</PanelBlock>
                <PanelBlock>GEOG 1011</PanelBlock>
                <PanelBlock>PHYS 1000</PanelBlock>
                <PanelBlock>THTR 3011</PanelBlock>
            </Panel>
    
        </BodyContainer>
    </Container>
    </>
    )
};

