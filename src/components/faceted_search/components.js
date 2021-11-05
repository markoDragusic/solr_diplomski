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

export const Content = styled.div`
display: flex;
flex-direction: row;
`

export const SearchAll = styled.div`
display: flex;
flex-direction: row;
`
export const SearchMain = styled.div`
display: flex;
flex-direction: column;
margin-left: 25px;
// max-width: 505px;
width: 100%;
`


export const SearchElements = styled.div`
display: flex;
flex-direction: column;
align-items: center;
// justify-content: center;
padding-top: 100px;
margin-left: 25%;
width: 550px;
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
background-color: blue;
margin-right: 15px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const Results = styled.div`
    margin-top: 50px;
    text-align: left;
    padding-right: 25px;
`
const ResultsHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
`

export const Section = styled.div`
    width: 15%;
    max-height: 75px;
    overflow: hidden;
    padding: 10px;
`

const HeaderSection = styled(Section)`
    font-size: 20px;
`

export const ResultsHeader = () => {
    return(
        <ResultsHeaderWrapper>
            <HeaderSection/>
            <HeaderSection>Име</HeaderSection>
            <HeaderSection>Година</HeaderSection>
            <HeaderSection>Километража</HeaderSection>
            <HeaderSection>Гориво</HeaderSection>
            <HeaderSection>Мотор</HeaderSection>
            <HeaderSection>Сједишта</HeaderSection>
        </ResultsHeaderWrapper>
        )
}

export const ResultItems = styled.div`
div{
    border-bottom: 1px solid black;
}
`

export const FilmItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`