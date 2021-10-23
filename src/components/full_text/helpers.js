  export const stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body.innerHTML;
  }

  export const getTitle = (rawTitle) => {
    let titleStart = rawTitle.lastIndexOf('/') + 1

    return rawTitle.substring(titleStart)
  }
