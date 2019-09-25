function createProgrammer() {
    // in lexical scope/in variable object not in dynamic object
    const languages = [];

    return {
        learnNewLanguage(language) {
            languages.push(language);
        },
        isPragmatic() {
            return languages.length > 2;
        }
    };
}

const programmer3 = createProgrammer();
programmer3.learnNewLanguage('Elm');
programmer3.learnNewLanguage('Clojure');
console.log(programmer3.isPragmatic()); // false
programmer3.learnNewLanguage('Haskell');
console.log(programmer3.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(programmer3.learnNewLanguage);