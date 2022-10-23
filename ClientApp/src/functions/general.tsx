export const MakeCamel = (name:string):string => {
    return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return word.toUpperCase();
      }).replace(/\s+/g, '');
}

export const RemoveSpecialCharacters = (str:string):string =>{
  return str.replace(/[^a-zA-Z ]/g, "");
}
