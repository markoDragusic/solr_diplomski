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

const FullCheckboxWrapper = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 10px;
width: 90%;
display: flex;
justify-content: space-between;
`

const CheckboxLabel = styled.label``

const Checkbox = styled.div``

const setNewBool = (newVal, setVal) => {
	console.log('test funkccc nesto', newVal)
	setVal(newVal)
}

const FullCheckbox = ({label, val, setVal}) => {
	return(
	<FullCheckboxWrapper>
			<CheckboxLabel>{label}</CheckboxLabel>
			<Checkbox> 
				<input type="checkbox" 
							key={label} 
							id={label} 
							name={label} 
							value={val}
							onChange={() => setNewBool(!val, setVal)
								} />
			</Checkbox>
		
	</FullCheckboxWrapper>
		)

}


const SidebarAdvancedWrapper = styled.div`
padding-top: 70px;
display: flex;
flex-direction: column;
align-items: flex-start;
width: 20%;
margin-left: 25px;
`

const AdvancedTitle = styled.div`
text-align: center;
font-size: 20px;
margin-bottom: 25px;
`

export const SidebarAdvanced = (props) => {
	const isFuzzy = props.isFuzzy
	const setIsFuzzy = props.setIsFuzzy
	const isStemmed = props.isStemmed
	const setIsStemmed = props.setIsStemmed

return (
	<SidebarAdvancedWrapper>
		<AdvancedTitle>Напредна претрага</AdvancedTitle>
		<FullCheckbox label="Fuzzy претрага" val={isFuzzy} setVal={setIsFuzzy}/>
		<FullCheckbox label="Корјеновање ријечи" val={isStemmed} setVal={setIsStemmed}/>
		
	</SidebarAdvancedWrapper>)
}
	

export default Sidebar