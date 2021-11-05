import styled from 'styled-components'


export const PageWrapper = styled.div`
display: block;
text-align: center;
height: ${props => props.hasContent ? "100%" : "100vh"};

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

export const SearchAll = styled.div`
display: flex;
flex-direction: row;
`
export const SearchMain = styled.div`
display: flex;
flex-direction: column;
margin-left: 30%;
max-width: 505px;
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
width: 100%;
text-align: right;
`
export const SearchInputGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 550px;
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
margin-right: 10px;
`

export const SearchButton = styled.button`
height: 25px;
font-size: 15px;
pointer-events: ${props => props.disabled ? 'none' : 'pointer'}
`
export const SearchResults = styled.div`
margin-top: 20px;
color: white;
`
export const ContentWrapper = styled.div`
background-color: red;
height: 100%;
`

export const MenuItem = styled.div`
height: 50px;
width: 250px;
background-color: ${props => props.active ? 'blue' : 'darkslategray'};
margin-right: 15px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const Results = styled.div`
margin-top: 50px;
`
const ResultsHeaderWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 24px;
`

export const Section = styled.div`
max-height: 75px;
overflow: hidden;
padding: 10px;
`

export const SectionNo = styled(Section)`
width: 15%;
padding-right: 0;
`


export const SectionTitle = styled(Section)`
padding-left: 0px;
`

const HeaderSection = styled(Section)`
font-size: 20px;
`

export const ResultsHeader = () => {
    return(
        <ResultsHeaderWrapper>
            <HeaderSection/>
            <HeaderSection>Title</HeaderSection>
            <HeaderSection>Year Released</HeaderSection>
            <HeaderSection>Director</HeaderSection>
            <HeaderSection>Leading Actors</HeaderSection>
        </ResultsHeaderWrapper>
        )
}

export const BookHeader = styled.div`
display: flex;
flex-direction: row;
color: maroon;
font-size: 18px;
font-weight: 700;
`

export const BookHighlights = styled.div`
margin-left: 15%;
margin-bottom: 24px;
`

export const Snippet = styled.div`
  border-bottom: 1px solid black;
  padding-top: 15px;
  padding-bottom: 15px;
`