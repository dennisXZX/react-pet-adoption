import React, { Component } from 'react'
import pf, { ANIMALS } from 'petfinder-client'

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class SearchParams extends Component {
    constructor (props) {
        super(props)

        this.state = {
            location: 'Seattle, WA',
            animal: '',
            breed: '',
            breeds: []
        }

        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleAnimalChange = this.handleAnimalChange.bind(this)
        this.getBreeds = this.getBreeds.bind(this)
        this.handleBreedChange = this.handleBreedChange.bind(this)
    }

    handleLocationChange (event) {
        this.setState({
            location: event.target.value
        });
    }

    handleAnimalChange (event) {
        this.setState({
            animal: event.target.value,
            breed: ''
        }, this.getBreeds);
    }

    handleBreedChange (event) {
        this.setState({
        	breed: event.target.value
        });
    }

    getBreeds () {
        if (this.state.animal) {
            petfinder.breed.list({ animal: this.state.animal })
                .then(data => {
                    if (data.petfinder &&
                        data.petfinder.breeds &&
                        Array.isArray(data.petfinder.breeds.breed)) {
                        this.setState({
                        	breeds: data.petfinder.breeds.breed
                        });
                    } else {
                        this.setState({ breeds: [] })
                    }
                })
        } else {
            this.setState({ breeds: [] })
        }
    }

    render () {
        return (
            <div className='search-params'>
                <label htmlFor='location'>
                    Location
                    <input
                        onChange={this.handleLocationChange}
                        id='location'
                        value={this.state.location}
                        placeholder='Location'
                    />
                </label>

                <label htmlFor='animal'>
                    Animal
                    <select
                        id='animal'
                        value={this.state.animal}
                        onChange={this.handleAnimalChange}
                        onBlur={this.handleAnimalChange}>
                        <option value=''>All</option>
                        {
                            ANIMALS.map(animal => (
                                <option key={animal} value={animal}>{animal}</option>
                            ))
                        }
                    </select>
                </label>

                <label htmlFor='breed'>
                    Breed
                    <select
                        id='breed'
                        value={this.state.breed}
                        onChange={this.handleBreedChange}
                        onBlur={this.handleBreedChange}
                        disabled={this.state.breeds.length <= 0}>
                        {this.state.breeds.map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                    <button>Submit</button>
                </label>
            </div>
        )
    }
}

export default SearchParams
