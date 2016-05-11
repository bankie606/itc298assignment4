
// JavaScript Array
var synths = [
    {id: 0, brand: 'korg',model:'Poly-800', price: 250.00},
    {id: 1, brand: 'nord',model:'Micro-Modular', price: 400.00},
    {id: 2, brand: 'elektron',model:'Monomachine', price: 500.00},
    {id: 3, brand: 'ensoniq',model:'Fizmo', price: 1500.00},
    {id: 4, brand: 'moog',model:'Memory Moog', price: 2500.00},
    {id: 5, brand: 'buchla',model:'Who In Their Right Mind Would Buy This?', price: 6500.00},
    ];
    
//Sends out Search Results back to Index    
exports.getSynth = function(synthName) {
    console.log(synthName);
    return synths.find(function(item) {
       return item.brand == synthName;
    });

};

//Adds item to index
exports.add = function(newSynth) {
    var found = false;
    synths.forEach(function(item,index){
        if (item.brand == newSynth.brand) {
            newSynth.id = item.id;
            synths[index]  = newSynth;
            found = true;
        }        
    });
    if (!found) {
        newSynth.id = synths.length;
        synths.push(newSynth);
    }
        var action = (found) ? "updated" : "added";
    return {"action": action, "total": synths.length };
};


exports.delete = function(name) {
    var deleted = false;
    console.log(name);
    synths.forEach(function(item,index){
        if (item.brand == name) {
            console.log(item);
            synths.splice(index, 1);
            deleted = true;
        }        
    });
    return { "deleted": deleted, total: synths.length };
};

exports.getAll = function() {
        return synths;
};

exports.find = function(brand) {
    return synths.filter(function(item) {
       return item.brand === brand;
    });
}

    

var byPrice = function(synths0, synths5) {

 // sorts synths by price in ascending order

 return synths0.price - synths5.price;

};

console.log(synths.sort(byPrice));
