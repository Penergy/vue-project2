var image = {
    id: 0,
    name: "",
    hex: [],
    created: "",
    modified: ""
}

Object.defineProperty(image, "name", {
    get: function(){
        return this.name
    },
    set: function(newValue){
        this.name = newValue
    }
})

module.exports = image; 