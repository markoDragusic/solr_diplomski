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
  Section
  } from './components'
import Pagination from './pagination'
import Sidebar from './sidebar'

export const Wrapper = styled.div`
display: ${ props => props.show ? 'block' : 'none'};
background: gray;
height: 100%;
`
   const searchByTerm = (setSearchResults, searchValue, start, setTotal, yearFrom, yearTo, setHasContent) => {
    let queryValue = searchValue ?  searchValue : '*:*'
    let query = "http://localhost:8983/solr/bestFilms/select?q="
    let queryElements = []
    
    if(searchValue){
      queryElements.push("default_search_field:\"" + queryValue+"\"")
    }

    

    if(yearFrom && !yearTo){
      queryElements.push("year_released:[" + yearFrom + " TO 2021]" )
      // query = query + "&fq=year_released:[" + yearFrom + " TO 2021]" 
    }
    else if(!yearFrom && yearTo){
      queryElements.push("year_released:[1900 TO " + yearTo + "]")
      // query = query + "&fq=year_released:[1900 TO " + yearTo + "]"
    }
    else if(yearFrom && yearTo){
      queryElements.push("year_released:[" + yearFrom + " TO " + yearTo + "]")
      // query = query + "fq=year_released:[" + yearFrom + " TO " + yearTo + "]"
    }

    query = query + queryElements.join(" AND ")
    query = start ? query + '&start=' + start : query;


    fetch(query)
      .then(res => res.json())
      .then((result) =>{
        console.log("Stiglo", result)
        setSearchResults(result.response.docs)
        setTotal(result.response.numFound)
        setHasContent(result.response.numFound > 0)
        console.log('has content', result.response.numFound > 0)
      })
  console.log('search by term', searchValue)
	}


function PageBasic(props){
  const [searchValue, setSearchValue] = useState('')
  const [yearFrom, setYearFrom] = useState()
  const [yearTo, setYearTo] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [initial, setInitial] = useState(true)
  const [fromBar, setFromBar] = useState(false)

  let setHasContent = props.setHasContent

  useEffect(() => {
    if(!fromBar){
       let start = (currentPage - 1) * 10;

    if (!initial){
          searchByTerm(setSearchResults, searchValue, start, setTotal, yearFrom, yearTo, setHasContent)
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
            <SearchLabel>Please enter the search term:</SearchLabel>
            <SearchInput value={searchValue} onChange = {e => setSearchValue(e.target.value)}></SearchInput>
              <SearchButton 
                disabled={!searchValue && !(yearFrom || yearTo)}
                onClick={() => {
                searchByTerm(setSearchResults, searchValue, 0, setTotal, yearFrom, yearTo, setHasContent);
                setFromBar(searchValue);
                setCurrentPage(1)
              }}><button>Search</button></SearchButton>  
          </SearchInputGroup>
        </SearchElements>   
      </SearchMain>    
      <Sidebar yearFrom={yearFrom} setYearFrom={setYearFrom} yearTo={yearTo} setYearTo={setYearTo}/>
    </SearchAll> 
    <Results>
      <ResultsHeader/>
      {searchResults.map((item, index) => 
        <FilmItem key={item.id}>
          <Section>{(currentPage - 1) * 10 + index + 1}.</Section> 
          <Section>{item.title}</Section>
          <Section>({item.year_released})</Section> 
          <Section> {item.director}</Section>
          <Section>{item.leading_actors}</Section>
        </FilmItem>)}
    </Results>  
   <Pagination currentPage={currentPage} goToPage={setCurrentPage} total={total}/>
	</Wrapper>		
       ) 
}

export default PageBasic;