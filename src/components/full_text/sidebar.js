import styled from 'styled-components'

const SidebarWrapper = styled.div`
padding-top: 100px;
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100px;
margin-left: 200px;
`

const Year = styled.div`
margin-bottom: 24px;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`


const Sidebar = (props) => {
	const yearFrom = props.yearFrom
	const setYearFrom = props.setYearFrom
	const yearTo = props.yearTo
	const setYearTo = props.setYearTo

	let years = []
	for(let i = 1900; i < 2021; i++){
		years.push(i)
	}

	const selectFrom = (e) => {
		setYearFrom(e.target.value)
	}

	const selectTo = (e) => {
		setYearTo(e.target.value)
	}

	let selectedOptionId = 0

	return(

	<SidebarWrapper>
		<Year> 
			<label>From</label>
			<select name="select" onChange={e => selectFrom(e)}>
	  			{years.map(function(year, index) {
	  			  if(index == 0){
	  			  	return (<option key={0} value={0} disabled selected></option>)
	  			  } 
	    		  return (<option key={year} value={year}>{year}</option>);
	  			})}
			</select>
		</Year>
		<Year> 
			<label>To</label>
			<select name="select" onChange={e => selectTo(e)}>
	  			{years.map(function(year, index) { 
	  				if(index == 0){
	  			  		return (<option key={0} value={0} disabled selected></option>)
	  			  }
	    		  return (<option key={year} value={year}>{year}</option>);
	  			})}
			</select>
		</Year>

	</SidebarWrapper>
	)
}
	

export default Sidebar