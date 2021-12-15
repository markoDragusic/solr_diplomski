import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
  SearchElements, 
  SearchInputGroup, 
  SearchLabel, 
  SearchInput, 
  SearchButton,
  SearchMain,
  SearchAll,
  Results,
  ResultsHeader,
  FilmItem,
  Section,
  Content
  } from './components'
import Pagination from './pagination'
import Sidebar, {SidebarAdvanced} from './sidebar'

export const Wrapper = styled.div`
display: ${ props => props.show ? 'block' : 'none'};
background: gray;
height: 100%;
`
const searchByTerm = (
    setSearchResults, 
    searchValue, 
    start, 
    setTotal, 
    yearFrom, 
    yearTo, 
    setHasContent, 
    isFuzzy=false,
    isStemmed=false,
    synonyms=false) => {
    let queryValue = searchValue ?  searchValue : '*:*'
    let queryValueTerms = queryValue.split(" ")


    if(isFuzzy){
      queryValueTerms = queryValueTerms.map((item) => {
        let returnString = "(" + item
console.log('ajtem length', typeof item.length, 0 < item.length < 3)

        if(item.length < 3) {
          console.log(1111)
          returnString += ")"
        }
        else if(3 <= item.length < 6) {
                    console.log(2222)

          returnString += "~1)"
        }
        else {
                    console.log(3333)

          returnString += "~2)"
        }
        console.log('return string', item, item.length, returnString)
      return returnString
      })
    }
  
  
    queryValue = "(" + queryValueTerms.join(" OR ") + ")"

    let query = "http://localhost:8983/solr/bestFilms/select?q="
    let queryElements = []

    
    if(searchValue){
      queryElements.push("default_search_field:" + queryValue)
    }
    

    if(yearFrom && !yearTo){
      queryElements.push("year_released:[" + yearFrom + " TO 2021]" )
    }
    else if(!yearFrom && yearTo){
      queryElements.push("year_released:[1900 TO " + yearTo + "]")
    }
    else if(yearFrom && yearTo){
      queryElements.push("year_released:[" + yearFrom + " TO " + yearTo + "]")      
    }


    query = query + queryElements.join(" AND ")
    query = start ? query + '&start=' + start : query
    query = query + "&fl=title,director,year_released,leading_actors,description"


    if(!searchValue && (yearFrom || yearTo)){
     query = query + "&sort=year_released asc"
    }


    fetch(query)
      .then(res => res.json())
      .then((result) =>{
        setSearchResults(result.response.docs)
        setTotal(result.response.numFound)
        setHasContent(result.response.numFound > 0)
      })
	}


function PageFaceted(props){
  const [searchValue, setSearchValue] = useState('')
  const [yearFrom, setYearFrom] = useState()
  const [yearTo, setYearTo] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [initial, setInitial] = useState(true)
  const [fromBar, setFromBar] = useState(false)
  const [isFuzzy, setIsFuzzy] = useState(false)
  const [isStemmed, setIsStemmed] = useState(false)
  const [synonyms, setSynonyms] = useState(false)

  let setHasContent = props.setHasContent

  useEffect(() => {
    if(!fromBar){
       let start = (currentPage - 1) * 10;

    if (!initial){
          searchByTerm(
            setSearchResults, 
            searchValue,
            start, 
            setTotal, 
            yearFrom, 
            yearTo, 
            setHasContent, 
            isFuzzy,
            isStemmed,
            synonyms)
        }
    setInitial(false)
  } 
  setFromBar(false)  
  }, [currentPage])


  return(
	<Wrapper show={props.show}>
    <SearchAll>
      <SearchMain>
        <SearchElements>
          <SearchInputGroup>
            <SearchLabel>Појам за претрагу:</SearchLabel>
            <SearchInput value={searchValue} onChange = {e => setSearchValue(e.target.value)}></SearchInput>
              <SearchButton 
                disabled={!searchValue && !(yearFrom || yearTo)}
                onClick={() => {
                searchByTerm(
                  setSearchResults,
                  searchValue,
                  0, 
                  setTotal, 
                  yearFrom, 
                  yearTo, 
                  setHasContent, 
                  isFuzzy,
                  isStemmed,
                  synonyms);
                setFromBar(searchValue);
                setCurrentPage(1)
              }}>Претрага</SearchButton>  
          </SearchInputGroup>
        </SearchElements>   
      </SearchMain>    
      <Sidebar yearFrom={yearFrom} setYearFrom={setYearFrom} yearTo={yearTo} setYearTo={setYearTo}/>
    </SearchAll> 
    <Content>
      <SidebarAdvanced isFuzzy={isFuzzy} setIsFuzzy={setIsFuzzy} isStemmed={isStemmed} setIsStemmed={setIsStemmed}/>
      <Results>
      <ResultsHeader/>
      {searchResults.map((item, index) => 
        <FilmItem key={item.id}>
          <Section width={'1%'}>{(currentPage - 1) * 10 + index + 1}.</Section> 
          <Section>{item.title}</Section>
          <Section>{item.description}</Section>
          <Section>{item.year_released}.</Section> 
          <Section> {item.director}</Section>
          <Section>{item.leading_actors}</Section>
        </FilmItem>)}
    </Results>  
    </Content>
    
   <Pagination currentPage={currentPage} goToPage={setCurrentPage} total={total}/>
	</Wrapper>		
       ) 
}

export default PageFaceted;