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
  BookHeader,
  BookHighlights,
  SectionTitle,
  SectionNo,
  Snippet
  } from './components'
import Pagination from './pagination'
import Sidebar from './sidebar'
import {stringToHTML, getTitle} from './helpers'

export const Wrapper = styled.div`
display: ${ props => props.show ? 'block' : 'none'};
background: gray;
height: 100%;
`


    const prepareResults = (rawResults, highlighting) => {
      let prepared = []
      let entries = Object.entries(highlighting)

      entries.forEach( item => {
        let object = {
          title: getTitle(item[0]),
          first:  item[1].text ? item[1].text[0] : '',
          second:  item[1].text ?  item[1].text[1] : '',
          third:  item[1].text ? item[1].text[2] : ''
        }

        prepared.push(object)

      })

      return prepared;
    }

   const searchByTerm = (setSearchResults, searchValue, start, setTotal, setHasContent) => {
    let queryValue = searchValue ?  searchValue : '*:*'
    let queryValueTerms = queryValue.split(" ")
    // queryValueTerms = queryValueTerms.map((item) => {
    //   return item + "~2"
    // })
    queryValue = "(" + queryValueTerms.join(" OR ") + ")"

    let query = "http://localhost:8983/solr/richText/select?q="
    let queryElements = []

    
    if(searchValue){
      queryElements.push("text:" + queryValue)
    }
    

    query = query + queryElements.join(" AND ")
    query = start ? query + '&start=' + start : query
    query = query + "&fl=id&hl=on&hl.fl=text&hl.snippets=3&hl.fragsize=300&hl.simple.pre=<b>&hl.simple.post=</b>"


    fetch(query)
      .then(res => res.json())
      .then((result) =>{
        setSearchResults(prepareResults(result.response.docs, result.highlighting))
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

  let setHasContent = props.setHasContent

  useEffect(() => {
    if(!fromBar){
       let start = (currentPage - 1) * 10;

    if (!initial){
          searchByTerm(setSearchResults, searchValue, start, setTotal, setHasContent)
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
                searchByTerm(setSearchResults, searchValue, 0, setTotal, setHasContent);
                setFromBar(searchValue);
                setCurrentPage(1)
              }}>Претрага</SearchButton>  
          </SearchInputGroup>
        </SearchElements>   
      </SearchMain>    
    </SearchAll> 
    <Results>
      {searchResults.map((item, index) => 
      <>
        <BookHeader key={index}>
          <SectionNo>{(currentPage - 1) * 10 + index + 1}.</SectionNo> 
          <SectionTitle>{item.title}</SectionTitle>       
        </BookHeader>
        <BookHighlights>
         <Snippet>
           <div dangerouslySetInnerHTML={{__html: item.first}} />
         </Snippet>
         <Snippet>
           <div dangerouslySetInnerHTML={{__html: item.second}} />
        </Snippet>
         <Snippet>
           <div dangerouslySetInnerHTML={{__html: item.third}} />
         </Snippet>
        </BookHighlights>
      </>
      ) }
    </Results>  
   <Pagination currentPage={currentPage} goToPage={setCurrentPage} total={total}/>
	</Wrapper>		
       ) 
}

export default PageFaceted;