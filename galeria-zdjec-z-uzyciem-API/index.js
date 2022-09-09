class Dogg {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.imgEl = document.querySelector('.featured-dog img');

        this.init()
    }

    listBreeds() {
        return fetch(`${this.apiUrl}/breeds/list/all`)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                return data.message
            })
    }

    getRandomImage() {
        return fetch(`${this.apiUrl}/breeds/image/random`)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                return data.message
            })
    }

    getRandomImageByBreed(breed) {
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
            .then(resp => resp.json())
            .then(data => data.message)
    }

    init() {
        this.getRandomImage()
            .then(src => this.imgEl.setAttribute('src', src))

        this.listBreeds()
            .then(breeds => console.log(breeds))
    }
}

const doggo = new Dogg()

// const imgTag = document.querySelector('img');
// listBreeds()
//     .then(breeds => console.log(breeds))

// getRandomImage()
//     .then(imgSrc => imgTag.setAttribute('src', imgSrc))

// getRandomImageByBreed('boxer')
//     .then(imgSrc => imgTag.setAttribute('src', imgSrc))