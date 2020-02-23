import React, {useState} from 'react';
import {Container, Control, Input, Button} from "bloomer";
import styled from '@emotion/styled-base'
import { Panel } from 'bloomer/lib/components/Panel/Panel';
import { PanelBlock } from 'bloomer/lib/components/Panel/PanelBlock';
import { PanelHeading } from 'bloomer/lib/components/Panel/PanelHeading';
import { getAllStudentData, getClassesFromStudent } from '../queries.js';
import { useQuery} from '@apollo/react-hooks';
import { render } from '@testing-library/react';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';
import { getGPAHistogramData } from '../queries.js';
import { Link } from 'react-router-dom'
import { Chart } from 'react-google-charts';
//import classes from '*.module.css';

const HeaderContainer = styled(Container)` 
    background-color: #CFB87C;
    color: #565A5C;
    
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    
    margin-right: 5%;
    margin-left: 5%;
    margin-bottom: 0%;

    border-radius: 15px 15px 0px 0px;
`;

const BodyContainer = styled(Container)`
    background-color: #D3D3D3;    

    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;

    margin-right: 5%;
    margin-left: 5%;
    
    border-radius: 0px 0px 15px 15px;
`;

const HeaderColumn = styled(Column)`    
    text-align: Left;
    font-size: 25px;
`;

const GPAColumn = styled(Column)`
    background-color: #D3D3D3;
    text-align: Left;
    margin-right: 3%;
    font-size: 25px;
    border-radius: 5px 5px 5px 5px;
`;
export const GPARank = () => {

    const {loading, error, data} = useQuery(getGPAHistogramData);
    if(loading) { return <>Loading...</> }
    if (error) return <p>Error! ${error.message}</p>

    //console.log(data)
    
    const myArr = [
        ['Student', 'GPA']
    ];

    //myArr.push([['john'],[4.0]])

    console.log(myArr);

    //const arrItems = myArr.map((element)=>    
    //        console.log(element)
    //);

    
        //console.log(testArry[i]);
    //}

    const rows = data.students.map((eachPiece)=>{
        //console.log(eachPiece.firstname)
        myArr.push([eachPiece.firstname,eachPiece.gpa])
    })


    return (    
    <>
    <Container>
    <HeaderContainer>
        <Columns>
            <HeaderColumn isSize='3/5'><strong>GPA Rank: </strong>
            <Link to="/">
                <Button style={{float: 'right'}}> Back</Button>
            </Link>
            </HeaderColumn>
        </Columns>
    </HeaderContainer>
    <BodyContainer>
        <Panel>
        <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading...</div>}
                data={myArr}
                options={{
                    title: 'GPA Graph of all Students',
                    legend: {position: 'none'},
                }}
                rootProps={{'data-testid':'4'}}
            />
        </Panel> 
    </BodyContainer>
    </Container>
    </>
    )
}

