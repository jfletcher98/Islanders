import React, {useState} from 'react';
import {Container, Control, Input, Button} from "bloomer";
import styled from '@emotion/styled-base'
import { Panel } from 'bloomer/lib/components/Panel/Panel';
import { PanelBlock } from 'bloomer/lib/components/Panel/PanelBlock';
import { PanelHeading } from 'bloomer/lib/components/Panel/PanelHeading';
import { getAllStudentData} from '../queries.js';
import { useQuery} from '@apollo/react-hooks';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Link} from "react-router-dom";

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

export const Home = () => {
    
    const [searchText, setSearchText] = useState('');

    const {loading, error, data} = useQuery(getAllStudentData, {variables: {id: 7}});
    
    if(loading) { return <>Loading...</> }
    if (error) return <p>Error! ${error.message}</p>

    const classes = data.students_class_view.filter((classData) => {

        return (
            (classData.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    }).map((class_specific) => {
        console.log(data.students[0].id);
        return(
        <Link key={class_specific.id} to={'/'+class_specific.id+'/'+data.students[0].id}>
            <PanelBlock>{class_specific.name}</PanelBlock>
        </Link>
        )})


    return (    
    <>
    <body className={"background"}>
        {data.students.map(person => (
        <HeaderContainer key = {person.id}>
            <Columns>
                <HeaderColumn isSize='3/5'><strong>Welcome, {person.firstname} {person.lastname} </strong></HeaderColumn>
                <GPAColumn>GPA: {person.gpa}
                    <Link to={"/gparank"}> 
                    <Button style={{float: 'right'}}>View your class rank</Button>
                    </Link>
                </GPAColumn>
            </Columns>
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
    </body>
    </>
    )
}

