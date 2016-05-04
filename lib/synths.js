
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
    
    return synths.find(function(item) {
       return item.brand == synthName;
    });

};

//Adds item to index
exports.add = function(newSynth) {
    var found = false;
    synths.forEach(function(item,index){
        if (item.brand == newSynth.brand) {
            synths[index]  = newSynth;
            found = true;
        }        
    });
    if (!found) {
        synths.push(newSynth);
    }
    return {"added": !found, "total": synths.length };
};


exports.delete = function(name) {
    var deleted = false;
    console.log(name);
    synths.forEach(function(item,index){
        if (item.name == name) {
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


    

var byPrice = function(synths0, synths5) {

 // sorts synths by price in ascending order

 return synths0.price - synths5.price;

};

console.log(synths.sort(byPrice));
