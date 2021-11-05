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
  ResultItems,
  Section,
  Content
  } from './components'
import Pagination from './pagination'
import Sidebar from './sidebar'

export const Wrapper = styled.div`
display: ${ props => props.show ? 'block' : 'none'};
background: gray;
height: 100%;
`
  const prepareResults = (rawResults) => {
    rawResults.forEach( item => {
      if(item.fuel == "Petrol"){
        item.fuel = "Бензин"
      }
      if(item.fuel == "Diesel"){
        item.fuel = "Дизел"
      }
    })
    return rawResults
  }

   const searchByTerm = (setSearchResults, 
      setFacetCounts, 
      searchValue, 
      start, 
      setTotal, 
      yearFrom, 
      yearTo, 
      engine,
      setHasContent) => {
    let queryValue = searchValue ?  searchValue : '*:*'
    let queryValueTerms = queryValue.split(" ")
    queryValueTerms = queryValueTerms.map((item) => {
      return item + "~2"
    })
    queryValue = "(" + queryValueTerms.join(" OR ") + ")"

    let query = "http://localhost:8983/solr/automobili/select?q="
    let queryElements = []

    
    if(searchValue){
      queryElements.push("name_search:" + queryValue)
    }
    

    if(yearFrom && !yearTo){
      queryElements.push("year:[" + yearFrom + " TO 2021]" )
    }
    else if(!yearFrom && yearTo){
      queryElements.push("year:[1900 TO " + yearTo + "]")
    }
    else if(yearFrom && yearTo){
      queryElements.push("year:[" + yearFrom + " TO " + yearTo + "]")      
    } 


    query = query + queryElements.join(" AND ")
       let engineValue = engine.join(" OR ")

    if(engine.length > 0){
      let querySign = "?"
      if(queryElements.length > 0){
        querySign = "&"
      }
      query = query + querySign + "fq={!tag=en}engine:(" + engineValue + ")"
    }
    query = start ? query + '&start=' + start : query

    query = query + "&facet=true&facet.field={!ex=en}engine&facet.pivot=seats,fuel"
   

    if(!searchValue && (yearFrom || yearTo)){
     query = query + "&sort=year asc"
    }


    fetch(query)
      .then(res => res.json())
      .then((result) =>{
        setSearchResults(prepareResults(result.response.docs))
        setFacetCounts(result.facet_counts)
        setTotal(result.response.numFound)
        setHasContent(result.response.numFound > 0)
      })
	}


function PageBasic(props){
  const [searchValue, setSearchValue] = useState('')
  const [yearFrom, setYearFrom] = useState()
  const [yearTo, setYearTo] = useState()
  const [engine, setEngine] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [facetCounts, setFacetCounts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [initial, setInitial] = useState(true)
  const [fromBar, setFromBar] = useState(false)

  let setHasContent = props.setHasContent

  useEffect(() => {
    if(!fromBar){
       let start = (currentPage - 1) * 10;

    if (!initial){
          searchByTerm(setSearchResults, setFacetCounts, searchValue, start, setTotal, yearFrom, yearTo,engine, setHasContent)
        }
    setInitial(false)
  } 
  setFromBar(false)  
  }, [currentPage])


  return(
	<Wrapper show={props.show}>
    <SearchElements>
      <SearchInputGroup>
        <SearchLabel>Појам за претрагу:</SearchLabel>
        <SearchInput value={searchValue} onChange = {e => setSearchValue(e.target.value)}></SearchInput>
          <SearchButton 
            disabled={!searchValue && !(yearFrom || yearTo)}
            onClick={() => {
            searchByTerm(setSearchResults,setFacetCounts, searchValue, 0, setTotal, yearFrom, yearTo, engine, setHasContent);
            setFromBar(searchValue);
            setCurrentPage(1)
          }}>Претрага</SearchButton>  
      </SearchInputGroup>
    </SearchElements>   
    <Content> 
       <Sidebar yearFrom={yearFrom} 
        setYearFrom={setYearFrom} 
        setYearTo={setYearTo}
        setEngine={setEngine}
        engine={engine}
        facetCounts={facetCounts}
       />
       <SearchMain>
              
            <Results>
              <ResultsHeader/>
              <ResultItems> 
                   {searchResults.map((item, index) => 
                <FilmItem key={item.id}>
                  <Section>{(currentPage - 1) * 10 + index + 1}.</Section> 
                  <Section>{item.name}</Section>
                  <Section>({item.year})</Section> 
                  <Section>{item.km_driven}</Section>
                  <Section>{item.fuel}</Section>
                  <Section>{item.engine}</Section>
                  <Section>{item.seats}</Section>
                </FilmItem>)}
              </ResultItems>             
          </Results>  
        </SearchMain>    
    </Content>   
   <Pagination currentPage={currentPage} goToPage={setCurrentPage} total={total}/>
	</Wrapper>		
       ) 
}

export default PageBasic;