import React from "react";

class Carousel extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            photos: [],
            active: 0
        };

        this.handleIndexClick = this.handleIndexClick.bind(this)
    }

    static getDerivedStateFromProps({ media }) {
        let photos = []

        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
        }

        return { photos };
    }

    handleIndexClick (event) {
        this.setState({
            active: parseInt(event.target.dataset.index)
        });
    };

    render() {
        const { photos, active } = this.state;

        let hero = "http://placecorgi.com/300/300";

        if (photos[active] && photos[active].value) {
            hero = photos[active].value;
        }

        return (
            <div className="carousel">
                <img src={hero} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img
                            onClick={this.handleIndexClick}
                            data-index={index}
                            key={photo.value}
                            src={photo.value}
                            className={index === active ? "active" : ""}
                            alt="animal thumnbail"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;
