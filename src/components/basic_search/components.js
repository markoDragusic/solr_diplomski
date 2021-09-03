import styled from 'styled-components'


export const PageWrapper = styled.div`
display: block;
text-align: center;
height: 100%;

`
export const Header = styled.div`
// display: flex;
// position: fixed;
// top: 0;
// left: 0;
 background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: wrap;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
export const SearchElements = styled.div`
display: flex;
flex-direction: column;
align-items: center;
// justify-content: center;
padding-top: 100px;
// margin-left: 28%;
`

const SearchItem = styled.div`
margin-right: 10px`

export const SearchLabel = styled(SearchItem)`
background: gray;
color: black;
font-size: 14px;
`
export const SearchInputGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
// padding-top: 100px;
// margin-left: 28%;
`

export const SearchInputWrapper = styled(SearchItem)`
margin-top: 10px;
width: 200px;
height: 30px;
font-size: 18px;
`

export const SearchInput = styled.input`
font-size: 18px;
width: 100%;
`

export const SearchButton = styled(SearchItem)`
`
export const SearchResults = styled.div`
margin-top: 20px;
color: white;
`
export const ContentWrapper = styled.div`
background-color: red;
height: 100vh;
`

export const MenuItem = styled.div`
height: 50px;
width: 250px;
background-color: blue;
margin-right: 15px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const Results = styled.div`
    margin-top: 50px;
`