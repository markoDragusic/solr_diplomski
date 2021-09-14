import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { 
  PageWrapper, 
  Header, 
  ContentWrapper,
  MenuItem
} from './components/basic_search/components'
import PageBasic from  './components/basic_search/index'
import PageFaceted from './components/faceted_search/index'


function App() {
  const [page, setPage] = useState('basic')
  const [hasContent, setHasContent] = useState(false)

  return (
    <PageWrapper className="App" hasContent={hasContent}>
      <Header>
        <MenuItem id="basic" onClick={() => setPage('basic')}>Basic Search</MenuItem>
        <MenuItem id="faceted" onClick={() => setPage('faceted')}>Advanced Search</MenuItem>
        <MenuItem id="language" onClick={() => setPage('language')}>Full-Text Search</MenuItem>     
      </Header>
      <ContentWrapper>
        <PageBasic show={page == 'basic'} setHasContent={setHasContent}/>
        <PageFaceted show={page == 'faceted'} setHasContent={setHasContent}/>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
