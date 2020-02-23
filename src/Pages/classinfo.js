import React from 'react';
import {Container, Button} from "bloomer";
import styled from '@emotion/styled-base'
import { Panel } from 'bloomer/lib/components/Panel/Panel';
import { PanelBlock } from 'bloomer/lib/components/Panel/PanelBlock';
import { PanelHeading } from 'bloomer/lib/components/Panel/PanelHeading';
import {  getClassTests } from '../queries.js';
import { useQuery} from '@apollo/react-hooks';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Link } from "react-router-dom";


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

export const ClassInfo = (props) => {

    const classVar = props.match.params.classId;
    const studentVar = props.match.params.studentId;
    //console.log(props);

    const {loading, error, data} = useQuery(getClassTests, {variables:  {studentid: studentVar, classid: classVar}});
    
    if(loading) { return <>Loading...</> }
    if (error) return <p>Error! ${error.message}</p>

    console.log(data.students[0].tests)

    const tests = data.students[0].tests;
    const test_specific = tests.map((test) => 
    <PanelBlock>{test.name} {test.grade}</PanelBlock>
    );
    return (    
    <>
    <Container>
    
    <HeaderContainer>
        <Columns>
            <HeaderColumn isSize='3/5'><strong>{data.class[0].name}: </strong>
            <Link to="/">
            <Button style={{float: 'right'}}>Back</Button>
            </Link>
            </HeaderColumn>
        </Columns>
    </HeaderContainer>
    <BodyContainer>
        <Panel>
            <PanelHeading>Your tests</PanelHeading>
           {test_specific}
        </Panel>
    </BodyContainer>
    </Container>
    </>
    )
}

