import styled from 'styled-components'

const SidebarWrapper = styled.div`
padding-top: 200px;
display: flex;
flex-direction: column;
align-items: flex-start;
width: 15%;
margin-left: 50px;
`

const Years = styled.div`
width: 60%;
`
const Year = styled.div`
margin-bottom: 24px;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const Facets = styled.div`
margin-top: 25px`

const FacetByEngine = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`

const FacetField = styled.div`
margin-bottom: 15px;
display: flex;
align-items: center;
`

const engineString = (engine) => {
	let parts = engine.split(" ")

	return parts[0] + " ccm " + parts[1]
}

const Sidebar = (props) => {
	console.log('sajdbar')
	const setYearFrom = props.setYearFrom
	const setYearTo = props.setYearTo
	const setEngine = props.setEngine
	const engines = props.engine
	const facetCounts = props.facetCounts

	let facetsByEngine = props.facetCounts.facet_fields ?  
		props.facetCounts.facet_fields.engine : []

	let facetsByEngineFiltered = []

	for(let i = 0; i < facetsByEngine.length; i++){
		if(i%2 == 0){
			facetsByEngineFiltered.push(facetsByEngine[i] + " (" + facetsByEngine[i+1] + ")")
		}
	}

	facetsByEngineFiltered.sort(function(a,b){
		return a-b
	})

	let years = []
	for(let i = 1950; i < 2021; i++){
		years.push(i)
	}

	const selectFrom = (e) => {
		setYearFrom(e.target.value)
	}

	const selectTo = (e) => {
		setYearTo(e.target.value)
	}

	const selectEngine = (e) => {
		let value = e.target.value
		value = value.split(" ")[0]
		let enginesLocal = engines;
		if(!engines.includes(value)){
			enginesLocal.push(value)
		}
		else{
			var index = engines.indexOf(value);
			if (index !== -1) {
			  enginesLocal.splice(index, 1);
			}
		}
		console.log('enginessss local', enginesLocal)
		setEngine(enginesLocal)
	}

	let selectedOptionId = 0

	return(

	<SidebarWrapper>
		<Years>
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
		</Years>
		<Facets>
			<FacetByEngine>
				{facetsByEngineFiltered.map(function(engine, index){
					return(
					<FacetField>
						<input type="checkbox" 
							key={index} 
							id={index} 
							name={engine} 
							value={engine}
							onChange={ e => selectEngine(e)}/>
						<div> {engineString(engine)}</div>
					</FacetField>
					)
					
			})}
			</FacetByEngine>			
		</Facets>

	</SidebarWrapper>
	)
}
	

export default Sidebar