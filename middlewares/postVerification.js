
const query = async (data) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/url-checker', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                url: data
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        
        const jsonResponse = await response.json();
        // console.log(['isUndefined', jsonResponse]);
        
        return jsonResponse; // returning the parsed JSON response
    } catch (error) {
        console.error('Error occurred:', error);
        return null; // or handle the error accordingly
    }
};
const getResult = async (data) => {
    const results = await Promise.all(await data.map(async (elem)=> {
        return await query(elem);
    }))
    const f= results.map( elem => elem.prediction_value)
    return f;
    
};
const extractLinksFromParagraph = (paragraph) =>{
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
     // Extract links from the paragraph using the regular expression
    const links = paragraph.match(urlRegex) || [];
    return links;
  }
  
const postVerification = async (req, res, next) => {
    try {
        let data = req.body;
        const titleContainsLink = extractLinksFromParagraph(data.title);
        const descriptionContainsLink = extractLinksFromParagraph(data.description);

        if (titleContainsLink.length !== 0 || descriptionContainsLink.length !== 0) {
            const concatenatedArray = titleContainsLink.concat(descriptionContainsLink);
            const result = await getResult(concatenatedArray);
            console.log(result)
            let isMal = 1;
            for(let cond in result){
                if(cond!=0){
                    isMal = 0;
                    break;
                }
            }
            console.log(isMal);
            if (!isMal) {
                return res.status(401).json({ 'error': 'Malicious!!' });
            }
        }

        next();
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ 'error': 'Internal Server Error' });
    }
};

module.exports = postVerification