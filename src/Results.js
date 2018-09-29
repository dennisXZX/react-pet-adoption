import React, { Component } from 'react'
import pf from 'petfinder-client'
import Pet from './Pet'

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Results extends Component {
    constructor (props) {
        super(props)

        this.state = {
            loading: true,
            pets: []
        }
    }

    componentDidMount () {
        petfinder.pet.find({ output: 'full', location: 'Seattle, WA' })
            .then(data => {
                let pets

                // check if any pet exists
                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    // check whether pet is an array (more than 1 pet) or an object (just 1 pet)
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet
                    } else {
                        pets = [data.petfinder.pets.pet]
                    }
                } else {
                    pets = []
                }

                this.setState({
                    pets: pets,
                    loading: false
                })
            })
    }

    render () {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }

        return (
            <div className='search'>
                {this.state.pets.map(pet => {
                    let breed

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(', ')
                    } else {
                        breed = pet.breeds.breed
                    }

                    return (
                        <Pet
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${pet.contact.state}`}
                            id={pet.id}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Results
