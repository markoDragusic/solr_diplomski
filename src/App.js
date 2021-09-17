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
import PageFullText from './components/full_text/index'


function App() {
  const [page, setPage] = useState('basic')
  const [hasContent, setHasContent] = useState(false)

  return (
    <PageWrapper className="App" hasContent={hasContent}>
      <Header>
        <MenuItem id="basic" active={page == 'basic'} onClick={() => setPage('basic')}>Класична претрага</MenuItem>
        <MenuItem id="faceted" active={page == 'faceted'} onClick={() => setPage('faceted')}>Фасетирана претрага</MenuItem>
        <MenuItem id="full-text" active={page == 'full-text'} onClick={() => setPage('full-text')}>Претрага текста</MenuItem>     
      </Header>
      <ContentWrapper>
        <PageBasic show={page == 'basic'} setHasContent={setHasContent}/>
        <PageFaceted show={page == 'faceted'} setHasContent={setHasContent}/>
        <PageFullText show={page == 'full-text'} setHasContent={setHasContent}/>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
