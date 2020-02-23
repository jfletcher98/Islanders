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
    id
  }
}`;

export const getClassTests = gql `
query getClassTests($studentid:Int, $classid: Int) {
  students(where:{id: {_eq: $studentid}}) {
    firstname
    lastname
        tests(where:{class_id: {_eq:$classid}}) {
      name
      grade
    }
  }
  class(where:{id: {_eq: $classid}}){
    name
    }
}`;

export const getGPAHistogramData = gql `
query getGPAHistogramData{
  students{
    firstname
    lastname
    gpa
  }
}
`;

export const getClass = gql `
query getClass($classid: Int) {
  class(where:{id: {_eq: $classid}}){
  name
  }
}`;

export const getUser = gql `
query getUser($username_password: String) {
  users(where: {username_password: {_eq: $username_password}}) {
  id
}
}`;