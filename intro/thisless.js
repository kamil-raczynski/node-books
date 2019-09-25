function Programmer1() {
    this.languages = [];
}

Programmer1.prototype.learnNewLanguage = function(language) {
    this.languages.push(language);
};

Programmer1.prototype.isPragmatic = function() {
    return this.languages.length > 2;
};

const programmer1 = new Programmer1();
programmer1.learnNewLanguage('Java');
programmer1.learnNewLanguage('Ruby');
console.log(programmer1.isPragmatic()); // false
programmer1.learnNewLanguage('Python');
console.log(programmer1.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(function(l) {
    programmer1.learnNewLanguage(l);
});

// fn()
// new fn()
// o.fn()
// fn.call()