import React, {useState} from 'react';
import {Container, Control, Input} from "bloomer";
import styled from '@emotion/styled-base'
import { Panel } from 'bloomer/lib/components/Panel/Panel';
import { PanelBlock } from 'bloomer/lib/components/Panel/PanelBlock';
import { PanelHeading } from 'bloomer/lib/components/Panel/PanelHeading';
import { getAllStudentData, getClassesFromStudent } from '../queries.js';
import { useQuery} from '@apollo/react-hooks';
import { render } from '@testing-library/react';
import { Column } from 'bloomer/lib/grid/Column';
//import classes from '*.module.css';

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

const GPAColumn = styled(Column)`

    background-color: #D3D3D3;
    margin-right: 75%;
    text-align: center;
    font-size: 15pt;
`;

export const Home = () => {
    
    
    const [selectedPanel, setSelectedPanel] = useState('all');
    const [searchText, setSearchText] = useState('');

    const {loading, error, data} = useQuery(getAllStudentData, {variables: {id: 1}});
    
    if(loading) { return <>Loading...</> }
    if (error) return <p>Error! ${error.message}</p>



    const classes = data.students_class_view.filter((classData) => {

        return (
            (classData.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    }).map((class_specific) => {
        return(
        <PanelBlock>{class_specific.name}</PanelBlock>
        )})

    return (    
    <>
    <Container>
    {data.students.map(person => (
    <HeaderContainer key = {person.id}>
        <strong>Welcome, {person.firstname} </strong>
        <GPAColumn isOffset = "8">
        GPA: {person.gpa}
        </GPAColumn>
    
    </HeaderContainer>
    ))}
        <BodyContainer>

            <Panel>
                <PanelHeading>Classes</PanelHeading>
                <PanelBlock>
                    <Control hasIcons = "left">
                        <Input
                        value = {searchText}
                        onChange={(event) => setSearchText(event.target.value)} 
                        isSize="small" 
                        placeholder="Search"
                        />
                    </Control>
                </PanelBlock>
                {classes}
            </Panel>
        </BodyContainer>
    </Container>
    </>
    )
}

