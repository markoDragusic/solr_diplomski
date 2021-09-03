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


function App() {
  const [page, setPage] = useState('basic')

  return (
    <PageWrapper className="App">
      <Header>
        <MenuItem id="basic" onClick={() => setPage('basic')}>Classic Search</MenuItem>
        <MenuItem id="faceted" onClick={() => setPage('faceted')}>Faceted Search</MenuItem>
        <MenuItem id="language" onClick={() => setPage('language')}>Language Analysis</MenuItem>     
      </Header>
      <ContentWrapper>
        <PageBasic show={page == 'basic'}/>
    
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
