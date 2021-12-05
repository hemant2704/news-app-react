import React,{ useState } from 'react';

const Search = ({searchText}) => {
	const [text,setText] = useState('')
	const handleSubmit = (e) => { 
		e.preventDefault()
		searchText(text)
	}
	return(
		<div className="container-fluid mt-5" style={{width:"50%"}}>
	        <form className="d-flex" onSubmit={handleSubmit}>
	          <input className="form-control me-2" type="search" onChange={(e)=>setText(e.target.value)} placeholder="eg: Politics" aria-label="Search" />
	          <button className="btn btn-outline-success" type="submit">Search</button>
	        </form>
	    </div>
	)
}

export default Search;