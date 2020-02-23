import gql from 'graphql-tag';

export const getAllStudentData = gql ` 
query getAllStudentData($id:Int) {
  students(where:{id: {_eq: $id}}) {
    firstname
    lastname
    id
    gpa
  }
  students_class_view(where:{students_id: {_eq: $id}}) {
    name
  }
}`;