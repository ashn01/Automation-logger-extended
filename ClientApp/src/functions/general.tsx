export const MakeCamel = (name:string):string => {
    return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return word.toUpperCase();
      }).replace(/\s+/g, '');
}