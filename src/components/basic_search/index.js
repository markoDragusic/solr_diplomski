import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
  SearchElements, 
  SearchInputGroup, 
  SearchLabel, 
  SearchInput, 
  SearchButton,
  Results 
  } from './components'
import Pagination from './pagination'

export const Wrapper = styled.div`
display: ${ props => props.show ? 'block' : 'none'};
background: gray;
height: 100%;
`
   const searchByTerm = (setSearchResults, searchValue, start, setTotal) => {
    let queryValue = searchValue ?  searchValue : '*:*'
    let query = "http://localhost:8983/solr/bestFilms/select?q=default_search_field:" + queryValue;
    query = start ? query + '&start=' + start : query;

    fetch(query)
      .then(res => res.json())
      .then((result) =>{
        console.log("Stiglo", result)
        setSearchResults(result.response.docs)
        setTotal(result.response.numFound)
      })
  console.log('search by term', searchValue)
	}


function PageBasic(props){
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [initial, setInitial] = useState(true)
  const [fromBar, setFromBar] = useState(false)


  useEffect(() => {
    if(!fromBar){
       let start = (currentPage - 1) * 10;

    if (!initial){
          searchByTerm(setSearchResults, searchValue, start, setTotal)
        }
    setInitial(false)
  } 
  setFromBar(false)  
  }, [currentPage])



  return(
	<Wrapper show={props.show}>
		<SearchElements>
        <SearchInputGroup>
          <SearchLabel>Please enter the search term:</SearchLabel>
          <SearchInput value={searchValue} onChange = {e => setSearchValue(e.target.value)}></SearchInput>
            <SearchButton onClick={() => {
              searchByTerm(setSearchResults, searchValue, 0, setTotal);
              setFromBar(true);
              setCurrentPage(1)
            }}><button>Search</button></SearchButton>  
        </SearchInputGroup>
    </SearchElements>		
    <Results>
      {searchResults.map((item) => <li key={item.id}>{item.title}</li>)}
    </Results>
   <Pagination currentPage={currentPage} goToPage={setCurrentPage} total={total}/>
	</Wrapper>		
       ) 
}

export default PageBasic;