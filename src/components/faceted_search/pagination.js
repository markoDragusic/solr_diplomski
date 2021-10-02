import React from 'react'
import styled from 'styled-components'


const PaginationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 24px;
	margin-bottom: 24px;
`

const PaginationLinkWrapper = styled.div`
	margin-left: 16px;
	margin-right: 16px;
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}

`

const PaginationLink = styled.div`
	border: solid blue 1px;
	background-color: azure;
	border-radius: 5px;
	pointer-events: ${props => props.disabled ? 'none' : 'auto'};
	padding: 5px;
`

const PageNumber = styled.div`
	color: cyan;
	font-size: 20px;
`


const Pagination = (props) => {

	let currentPage = props.currentPage
	let goToPage = props.goToPage
	let total = props.total


	return (
		<PaginationWrapper>
			<PaginationLinkWrapper>
				<PaginationLink onClick={() => goToPage(currentPage-1)} 
					disabled={currentPage == 1}>Previous</PaginationLink>
			</PaginationLinkWrapper>			
				<PageNumber>{currentPage}</PageNumber>
			<PaginationLinkWrapper>
				<PaginationLink onClick={() => goToPage(currentPage+1)}
				disabled={(total - 10*currentPage) < 10}>Next</PaginationLink>	
			</PaginationLinkWrapper>
			
		</PaginationWrapper>
		)
}

export default Pagination