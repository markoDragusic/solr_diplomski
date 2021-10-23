import styled from 'styled-components'

const SidebarWrapper = styled.div`
padding-top: 100px;
display: flex;
align-items: center;

// width: 100px;
margin-left: 200px;
`

const Year = styled.div`
// margin-bottom: 24px;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`

const YearsSection = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100px;
div:first-child {
	margin-bottom: 24px;
}
`

const ClearYears = styled.button`
margin-left: 15px;
font-size: 15px;
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

	const resetYears = () => {
		setYearFrom(null)
		setYearTo(null)
	}

	let selectedOptionId = 0

	return(

	<SidebarWrapper>
		<YearsSection>
			<Year> 
					<label>Од</label>
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
					<label>До</label>
					<select name="select" onChange={e => selectTo(e)}>
			  			{years.map(function(year, index) { 
			  				if(index == 0){
			  			  		return (<option key={0} value={0} disabled selected></option>)
			  			  }
			    		  return (<option key={year} value={year}>{year}</option>);
			  			})}
					</select>
				</Year>
		</YearsSection>
		<ClearYears onClick={resetYears}>
			Ресетуј године
		</ClearYears>
			

	</SidebarWrapper>
	)
}
	

export default Sidebar